/* ============================================================
   UNIO core — shared components (concatenated before page JSX)
   ============================================================ */
const { useState, useEffect, useRef, useCallback } = React;

const LOGO_BLACK = "__LOGO_BLACK_URI__";
const LOGO_WHITE = "__LOGO_WHITE_URI__";
const ICON_URI = "__LOGO_ICON_URI__";

const IconMark = ({size=32, className}) => (
  <img src={ICON_URI} alt="" aria-hidden="true" className={className} style={{width:size,height:size,display:'block',objectFit:'contain',flex:'none'}}/>
);

const Logo = ({className="logo", white=false}) => (
  <a href="index.html" className={className} aria-label="UNIO Startseite">
    <img src={white?LOGO_WHITE:LOGO_BLACK} alt="UNIO" />
  </a>
);

/* split-ring brand mark — matches the real UNIO icon (opening to the LEFT, thin slit at right) */
const Ring = ({size=100, w=12, color="var(--orange)", track=null}) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden="true">
    {track && <circle cx="50" cy="50" r="34" stroke={track} strokeWidth={w}/>}
    <path d="M 83.98 48.81 A 34 34 0 0 0 18.05 38.37" stroke={color} strokeWidth={w} strokeLinecap="butt"/>
    <path d="M 83.98 51.19 A 34 34 0 0 1 18.05 61.63" stroke={color} strokeWidth={w} strokeLinecap="butt"/>
  </svg>
);

/* Loader: data points appear → connect into a network → become the UNIO logo (vector) */
function UnioLoader(){
  const S=264, C=132, R=92, PTS=64;
  const model = useRef(null);
  if(!model.current){
    const pts=[]; const ranges=[[200,358],[2,160]];
    for(let i=0;i<PTS;i++){
      const sx=-380+Math.random()*(S+760), sy=-300+Math.random()*(S+560);  // spread wide across the screen
      const seg=ranges[i%2]; const f=Math.random();
      const ang=(seg[0]+(seg[1]-seg[0])*f)*Math.PI/180;
      const hx=C+R*Math.cos(ang), hy=C+R*Math.sin(ang);
      pts.push({sx,sy,hx,hy,delay:Math.round(Math.random()*550)});
    }
    const edges=[];
    for(let i=0;i<PTS;i++){let cnt=0;for(let j=i+1;j<PTS&&cnt<3;j++){const d=Math.hypot(pts[i].sx-pts[j].sx,pts[i].sy-pts[j].sy);if(d<60){edges.push([i,j,Math.round(Math.random()*500)]);cnt++;}}}
    model.current={pts,edges};
  }
  const {pts,edges}=model.current;
  const [vis,setVis]=useState(false);
  const [conn,setConn]=useState(false);
  const [form,setForm]=useState(false);
  const [icon,setIcon]=useState(false);
  const [cap,setCap]=useState(false);
  const [prog,setProg]=useState(false);
  const [hide,setHide]=useState(false);
  const [gone,setGone]=useState(false);
  useEffect(()=>{
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduce){ setGone(true); return; }
    document.body.style.overflow='hidden';
    const t=[];
    t.push(setTimeout(()=>{setVis(true);setProg(true);},150));   // points appear (spread across screen)
    t.push(setTimeout(()=>setConn(true),1500));                  // network connects
    t.push(setTimeout(()=>setForm(true),3100));                 // points migrate inward to the mark
    t.push(setTimeout(()=>setIcon(true),4100));                 // the REAL icon fades in (no vector, no jump)
    t.push(setTimeout(()=>setCap(true),4450));
    t.push(setTimeout(()=>setHide(true),5900));                 // zoom-fade reveal
    t.push(setTimeout(()=>{setGone(true);document.body.style.overflow='';},6900));
    return ()=>{t.forEach(clearTimeout);document.body.style.overflow='';};
  },[]);
  if(gone) return null;
  return (
    <div className={"uloader"+(hide?" hide":"")} aria-hidden="true">
      <div className="uloader-stage">
        <svg className="uload-net" width={S} height={S} viewBox={"0 0 "+S+" "+S} fill="none">
          {edges.map(([i,j,d],k)=>(
            <line key={k} x1={pts[i].sx.toFixed(1)} y1={pts[i].sy.toFixed(1)} x2={pts[j].sx.toFixed(1)} y2={pts[j].sy.toFixed(1)}
              className={"uload-line"+(conn&&!form?" on":"")+(form?" off":"")} style={{transitionDelay:(conn&&!form?d:0)+'ms'}}/>
          ))}
          {pts.map((p,i)=>(
            <g key={i} className={"uload-pt"+(vis?" vis":"")+(icon?" dim":"")}
               style={{transform:"translate("+(form?p.hx:p.sx).toFixed(1)+"px,"+(form?p.hy:p.sy).toFixed(1)+"px)",transitionDelay:(vis&&!form?p.delay:0)+'ms'}}>
              <circle r="3"/>
            </g>
          ))}
        </svg>
        <img className={"uloader-icon"+(icon?" in":"")} src={ICON_URI} alt="UNIO"/>
      </div>
      <div className={"uloader-cap"+(cap?" in":"")}>
        <Logo className="logo" />
        <div className="t">Data-Powered Real Estate</div>
        <div className={"uloader-prog"+(prog?" go":"")}><i/></div>
      </div>
    </div>
  );
}

/* thin minimal icon set (lucide-style, 1.8px stroke) */
const I = ({d, size=20, sw=1.8, fill=false, vb="0 0 24 24", children}) => (
  <svg width={size} height={size} viewBox={vb} fill={fill?"currentColor":"none"} stroke={fill?"none":"currentColor"}
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {children || <path d={d}/>}
  </svg>
);
const Icon = {
  arrow:    (p)=><I {...p}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></I>,
  arrowUR:  (p)=><I {...p}><path d="M7 17 17 7"/><path d="M7 7h10v10"/></I>,
  building: (p)=><I {...p}><rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 9h.01M15 9h.01M9 13h.01M15 13h.01M9 17h.01M15 17h.01"/></I>,
  users:    (p)=><I {...p}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></I>,
  search:   (p)=><I {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></I>,
  gauge:    (p)=><I {...p}><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></I>,
  pin:      (p)=><I {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></I>,
  check:    (p)=><I {...p}><path d="M20 6 9 17l-5-5"/></I>,
  spark:    (p)=><I {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/></I>,
  trending: (p)=><I {...p}><path d="M16 7h6v6"/><path d="m22 7-8.5 8.5-5-5L2 17"/></I>,
  layers:   (p)=><I {...p}><path d="m12 2 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></I>,
  target:   (p)=><I {...p}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1" fill="currentColor"/></I>,
  shield:   (p)=><I {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></I>,
  bolt:     (p)=><I {...p}><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8Z"/></I>,
  ruler:    (p)=><I {...p}><path d="M21.3 8.7 8.7 21.3a1 1 0 0 1-1.4 0l-4.6-4.6a1 1 0 0 1 0-1.4L15.3 2.7a1 1 0 0 1 1.4 0l4.6 4.6a1 1 0 0 1 0 1.4Z"/><path d="m7.5 10.5 2 2M11 7l2 2M14.5 3.5l2 2M4 14l2 2"/></I>,
  clock:    (p)=><I {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></I>,
  euro:     (p)=><I {...p}><path d="M18 7a6 6 0 1 0 0 10M5 10h7M5 14h7"/></I>,
  menu:     (p)=><I {...p}><path d="M3 6h18M3 12h18M3 18h18"/></I>,
  close:    (p)=><I {...p}><path d="M18 6 6 18M6 6l12 12"/></I>,
  home:     (p)=><I {...p}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/></I>,
  chart:    (p)=><I {...p}><path d="M3 3v18h18"/><path d="M7 14l3-3 3 3 4-5"/></I>,
};

/* count-up on view */
function useCountUp(target, dur=900){
  const [val,setVal]=useState(0); const ref=useRef(); const done=useRef(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{
      if(e.isIntersecting && !done.current){
        done.current=true; const t0=performance.now();
        const tick=(t)=>{const p=Math.min(1,(t-t0)/dur);setVal(target*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(tick);};
        requestAnimationFrame(tick);
      }
    },{threshold:.4});
    if(ref.current)o.observe(ref.current); return ()=>o.disconnect();
  },[target,dur]);
  return [val,ref];
}

function Reveal({children, style, as:Tag="div", className=""}){
  const ref=useRef(); const [s,setS]=useState(false);
  useEffect(()=>{
    const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setS(true);o.disconnect();}},{threshold:.14});
    if(ref.current)o.observe(ref.current); return ()=>o.disconnect();
  },[]);
  return <Tag ref={ref} className={"reveal"+(s?" in":"")+(className?" "+className:"")} style={style}>{children}</Tag>;
}

/* thin bar chart */
const Bars = ({data, accent=[], h=52}) => {
  const W=300,n=data.length,bw=4,gap=(W-n*bw)/(n-1),max=Math.max(...data);
  return <svg className="fade-a" width="100%" height={h} viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="none">
    {data.map((v,i)=>{const bh=v/max*h,x=i*(bw+gap);return <rect key={i} x={x} y={h-bh} width={bw} height={bh} rx="2" fill={accent.includes(i)?'var(--orange)':'var(--line)'}/>;})}
  </svg>;
};

/* dashed line + area */
const LineArea = ({data, h=120, w=320}) => {
  const max=Math.max(...data),min=Math.min(...data),pad=6;
  const pts=data.map((v,i)=>[pad+i*((w-pad*2)/(data.length-1)), h-pad-((v-min)/(max-min||1))*(h-pad*2)]);
  const path=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
  const area=path+` L ${pts[pts.length-1][0].toFixed(1)} ${h} L ${pts[0][0].toFixed(1)} ${h} Z`;
  return <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="fade-a">
    <defs><linearGradient id="la" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--orange)" stopOpacity=".18"/><stop offset="1" stopColor="var(--orange)" stopOpacity="0"/></linearGradient></defs>
    <path d={area} fill="url(#la)"/>
    <path d={path} fill="none" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="3.5" fill="var(--orange)"/>
  </svg>;
};

/* building silhouette for property placeholders */
const CitySilhouette = ({color="rgba(20,20,18,.14)"}) => (
  <svg viewBox="0 0 300 120" width="100%" height="100%" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
    <g fill={color}>
      <rect x="14" y="58" width="34" height="62"/><rect x="20" y="64" width="6" height="6" fill="#fff" opacity=".4"/><rect x="32" y="64" width="6" height="6" fill="#fff" opacity=".4"/>
      <rect x="56" y="40" width="40" height="80"/><rect x="62" y="48" width="7" height="7" fill="#fff" opacity=".4"/><rect x="76" y="48" width="7" height="7" fill="#fff" opacity=".4"/><rect x="62" y="62" width="7" height="7" fill="#fff" opacity=".4"/>
      <path d="M104 52 L124 36 L144 52 L144 120 L104 120 Z"/>
      <rect x="150" y="28" width="46" height="92"/><rect x="158" y="38" width="8" height="8" fill="#fff" opacity=".4"/><rect x="174" y="38" width="8" height="8" fill="#fff" opacity=".4"/><rect x="158" y="54" width="8" height="8" fill="#fff" opacity=".4"/>
      <rect x="204" y="64" width="36" height="56"/>
      <path d="M248 48 L268 36 L288 48 L288 120 L248 120 Z"/>
    </g>
  </svg>
);

/* ---- Photo: cover image with optional overlay + parallax ---- */
const Photo = ({src, alt="", style={}, overlay=false, pos="center"}) => (
  <div style={{position:'absolute',inset:0,overflow:'hidden',...style}}>
    <img src={src} alt={alt} loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover',objectPosition:pos,display:'block'}}/>
    {overlay && <div style={{position:'absolute',inset:0,background:typeof overlay==='string'?overlay:'linear-gradient(180deg,rgba(14,15,17,0) 38%,rgba(14,15,17,.55) 100%)'}}/>}
  </div>
);

/* ---- PropMedia: photo or silhouette + tag pills ---- */
const PropMedia = ({img, tags=[], pos="center", ratio, badge}) => (
  <div className="prop-media" style={ratio?{aspectRatio:ratio}:undefined}>
    {img ? <Photo src={img} pos={pos}/> : <div className="city"><CitySilhouette/></div>}
    {img && <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(14,15,17,.10),rgba(14,15,17,0) 34%)'}}/>}
    {tags.length>0 && <div className="prop-tags">{tags.map(t=><span key={t} className="pill pill-w">{t}</span>)}</div>}
    {badge && <div style={{position:'absolute',bottom:13,right:13}}>{badge}</div>}
  </div>
);

/* ---- count-up number component (in-view) ---- */
function Num({end, dur=1100, dec=0, prefix="", suffix="", sep=true}){
  const [v,ref]=useCountUp(end,dur);
  let s=v.toFixed(dec);
  if(sep){ const [a,b]=s.split('.'); s=a.replace(/\B(?=(\d{3})+(?!\d))/g,'.')+(b?(','+b):''); }
  else if(dec>0){ s=s.replace('.',','); }
  return <span ref={ref} className="tnum">{prefix}{s}{suffix}</span>;
}

/* ---- Parallax: subtle translate on scroll ---- */
function Parallax({children, amount=40, className="", style={}}){
  const ref=useRef();
  useEffect(()=>{
    let raf=0;
    const onScroll=()=>{
      if(raf)return;
      raf=requestAnimationFrame(()=>{
        raf=0; const el=ref.current; if(!el)return;
        const r=el.getBoundingClientRect(); const vh=window.innerHeight;
        const p=(r.top+r.height/2-vh/2)/vh; // -0.5..0.5 range-ish
        el.style.setProperty('--py',(p*amount).toFixed(1)+'px');
      });
    };
    onScroll(); window.addEventListener('scroll',onScroll,{passive:true}); window.addEventListener('resize',onScroll);
    return ()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);};
  },[amount]);
  return <div ref={ref} className={className} style={{...style,transform:'translate3d(0,var(--py,0),0)',willChange:'transform'}}>{children}</div>;
}

/* ---- scroll progress (0..1) for an element crossing viewport ---- */
function useScrollProgress(ref, {start=0.85, end=0.25}={}){
  const [p,setP]=useState(0);
  useEffect(()=>{
    let raf=0;
    const calc=()=>{ raf=0; const el=ref.current; if(!el)return;
      const r=el.getBoundingClientRect(); const vh=window.innerHeight;
      const total=(start-end)*vh;
      const done=start*vh-r.top;
      setP(Math.max(0,Math.min(1,done/total)));
    };
    const on=()=>{ if(!raf)raf=requestAnimationFrame(calc); };
    on(); window.addEventListener('scroll',on,{passive:true}); window.addEventListener('resize',on);
    return ()=>{window.removeEventListener('scroll',on);window.removeEventListener('resize',on);};
  },[ref,start,end]);
  return p;
}

/* ---- CaseCard: case study with image + metrics ---- */
function CaseCard({img, pos, badge, tag, title, loc, metrics=[], measures=[], site, dur, big=false}){
  return (
    <div className={"case"+(big?" big":"")}>
      <div className="case-media">
        <Photo src={img} pos={pos} overlay="linear-gradient(180deg,rgba(14,15,17,0) 40%,rgba(14,15,17,.72) 100%)"/>
        {tag && <span className="pill pill-w case-tag">{tag}</span>}
        <div className="case-cap">
          <div className="case-loc"><Icon.pin size={13}/> {loc}</div>
          <h3>{title}</h3>
          {site && <a className="case-site" href={(site.startsWith('http')?site:'https://'+site)} target="_blank" rel="noopener">{site} <Icon.arrowUR size={12}/></a>}
        </div>
      </div>
      <div className="case-body">
        {dur && <div className="case-dur"><Icon.clock size={13}/> {dur}</div>}
        <div className="case-metrics">{metrics.map((m,i)=>(
          <div className="cm" key={i}><div className="cmv">{m.v}</div><div className="cmk">{m.k}</div></div>
        ))}</div>
        {measures.length>0 && <div className="case-measures">
          {measures.map((m)=><span key={m} className="cmeas"><Icon.check size={13} sw={2.6}/> {m}</span>)}
        </div>}
      </div>
    </div>
  );
}

/* ---- in-view trigger ---- */
function useInView(thr=0.3){
  const ref=useRef(); const [seen,setSeen]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(([e])=>{if(e.isIntersecting){setSeen(true);o.disconnect();}},{threshold:thr});if(ref.current)o.observe(ref.current);return ()=>o.disconnect();},[thr]);
  return [ref,seen];
}

/* ---- segmented bar (grey -> orange, left to right; reversible via progress) ---- */
function SegBar({value=100, progress=null, segN=28, height=12, muted=false}){
  const [ref,seen]=useInView(0.4);
  const frac = progress!=null ? Math.max(0,Math.min(1,progress)) : (seen? value/100 : 0);
  const on = frac*segN;
  return <div ref={ref} className={"segbar"+(muted?' muted':'')} style={{height}}>
    {Array.from({length:segN}).map((_,i)=><span key={i} className={i<on?'on':''} style={{transitionDelay:progress!=null?'0ms':(i*16)+'ms'}}/>)}
  </div>;
}

/* ---- animated draw-on sparkline ---- */
const Sparkline = ({data, h=44, w=160, accent="var(--orange)", dot=true, fill=true}) => {
  const [ref,seen]=useInView(0.5);
  const max=Math.max(...data),min=Math.min(...data),pad=4;
  const pts=data.map((v,i)=>[pad+i*((w-pad*2)/(data.length-1)), h-pad-((v-min)/(max-min||1))*(h-pad*2)]);
  const path=pts.map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+' '+p[1].toFixed(1)).join(' ');
  const area=path+` L ${pts[pts.length-1][0].toFixed(1)} ${h} L ${pts[0][0].toFixed(1)} ${h} Z`;
  const len=420;
  return <svg ref={ref} width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{overflow:'visible'}}>
    <defs><linearGradient id="spk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={accent} stopOpacity=".16"/><stop offset="1" stopColor={accent} stopOpacity="0"/></linearGradient></defs>
    {fill && <path d={area} fill="url(#spk)" style={{opacity:seen?1:0,transition:'opacity .8s .3s'}}/>}
    <path d={path} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{strokeDasharray:len,strokeDashoffset:seen?0:len,transition:'stroke-dashoffset 1.1s var(--ease)'}}/>
    {dot && <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="3.2" fill={accent} style={{opacity:seen?1:0,transition:'opacity .3s .9s'}}/>}
  </svg>;
};

/* ---- semicircle gauge (animated) ---- */
const Gauge = ({value=72, size=120, label, sub, color="var(--orange)"}) => {
  const [ref,seen]=useInView(0.5);
  const r=42, cx=50, cy=50, circ=Math.PI*r;
  const off=seen?circ*(1-value/100):circ;
  return <div ref={ref} style={{textAlign:'center'}}>
    <svg width={size} height={size*0.62} viewBox="0 0 100 60">
      <path d="M8 50 A42 42 0 0 1 92 50" fill="none" stroke="var(--track)" strokeWidth="8" strokeLinecap="round"/>
      <path d="M8 50 A42 42 0 0 1 92 50" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={circ} strokeDashoffset={off} style={{transition:'stroke-dashoffset 1.2s var(--ease)'}}/>
    </svg>
    <div style={{marginTop:-size*0.18,fontWeight:600,fontSize:size*0.26,letterSpacing:'-.03em',fontVariantNumeric:'tabular-nums'}}>{seen?<Num end={value}/>:0}</div>
    {label && <div style={{fontSize:11.5,color:'var(--fg3)',fontWeight:600,marginTop:4}}>{label}</div>}
    {sub && <div style={{fontSize:11,color:'var(--fg4)',marginTop:2}}>{sub}</div>}
  </div>;
};

/* ---- forecast mini-bars with delta pill (Hikari/Garmin style) ---- */
const ForecastBars = ({data, accentIdx, delta, h=70}) => {
  const [ref,seen]=useInView(0.5);
  const max=Math.max(...data);
  return <div ref={ref} style={{display:'flex',alignItems:'flex-end',gap:'6%',height:h,position:'relative'}}>
    {data.map((v,i)=>(
      <div key={i} style={{flex:1,display:'flex',flexDirection:'column',justifyContent:'flex-end',height:'100%'}}>
        <div style={{height:(seen?v/max*100:0)+'%',background:i===accentIdx?'var(--orange)':'var(--track)',borderRadius:3,transition:'height .9s var(--ease)',transitionDelay:(i*60)+'ms',minHeight:3}}/>
      </div>
    ))}
    {delta!=null && <span style={{position:'absolute',right:0,top:0,fontSize:11,fontWeight:700,color:'#3E8E41',background:'#E9F6E8',borderRadius:999,padding:'3px 8px',opacity:seen?1:0,transform:seen?'none':'translateY(-4px)',transition:'all .4s .8s'}}>+{delta}%</span>}
  </div>;
};

/* ---- DataStory: ported DS canvas animation (Sammeln→Lernen→Optimieren→Verkaufen) ---- */
function DataStory(){
  const rootRef=useRef();
  useEffect(()=>{
    const root=rootRef.current; if(!root) return;
    const PHASES=[
      {key:'Sammeln', sub:'Echtzeit-Daten aus Markt, Kampagnen und Käuferverhalten strömen ein.', dur:3800},
      {key:'Lernen', sub:'Predictive Models erkennen Muster in tausenden Datenpunkten.', dur:3800},
      {key:'Optimieren', sub:'Jede Iteration macht die Vorhersage messbar schärfer.', dur:4200},
      {key:'Verkaufen', sub:'Validierte Story wird zum steuerbaren, planbaren Abverkauf.', dur:3800},
    ];
    const ACC=[79,87,92,96], NOISEK=[1,0.74,0.52,0.36], N=120;
    const C_ORANGE='#FFAA09', C_TEAL='#C8920A', C_BLUE='#9BA0AA';
    const cv=root.querySelector('canvas'), ctx=cv.getContext('2d');
    let W=0,H=0,dpr=1;
    function resize(){const r=cv.getBoundingClientRect();dpr=Math.min(window.devicePixelRatio||1,2);W=r.width;H=r.height;cv.width=W*dpr;cv.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);}
    const ro=new ResizeObserver(resize); ro.observe(cv); resize();
    const pts=[]; for(let i=0;i<N;i++){pts.push({x:Math.random(),noise:(Math.random()*2-1),col:Math.random(),sp:0.4+Math.random()*0.8,ph:Math.random()*Math.PI*2,chaosY:0.08+Math.random()*0.84});}
    const trueY=(x)=>0.80 - 0.56*x - 0.10*Math.sin(x*Math.PI);
    const PADL=58,PADR=58,PADT=120,PADB=86;
    const px=(x)=>PADL + x*(W-PADL-PADR), py=(yn)=>PADT + yn*(H-PADT-PADB);
    const ease=(t)=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2, lerp=(a,b,t)=>a+(b-a)*t;
    let phase=0, iter=0, t0=performance.now(), raf=0, alive=true;
    const stepEls=[...root.querySelectorAll('.ds-step')];
    stepEls.forEach((el,i)=>{el.onclick=()=>{phase=i;t0=performance.now();};});
    const rData=root.querySelector('.ds-data'), rIter=root.querySelector('.ds-iter'), rAcc=root.querySelector('.ds-acc'), gauge=root.querySelector('.ds-gauge');
    const capt=root.querySelector('.ds-t'), caps=root.querySelector('.ds-s');
    const GC=2*Math.PI*17, fmt=(n)=>Math.round(n).toLocaleString('de-DE');
    function draw(now){
      if(!alive) return;
      const ph=PHASES[phase]; let prog=Math.min((now-t0)/ph.dur,1);
      if(prog>=1){ if(phase<3){phase++;} else {phase=0; iter=Math.min(iter+1,ACC.length-1);} t0=now; }
      stepEls.forEach((el,i)=>{el.classList.toggle('on',i===phase);el.querySelector('i').style.width=(i<phase?100:i===phase?prog*100:0)+'%';});
      capt.textContent=ph.key; caps.textContent=ph.sub; rIter.textContent='0'+(iter+1);
      const dataTarget=6200+iter*1100, accFinal=ACC[iter], accStart=44+iter*3;
      let dataShown=phase===0?ease(prog)*dataTarget:dataTarget, acc=accStart;
      if(phase===1){ acc=lerp(accStart, accFinal-12, ease(prog)); }
      else if(phase===2){ acc=lerp(accFinal-12, accFinal, ease(prog)); }
      else if(phase===3){ acc=accFinal; }
      rData.textContent=fmt(dataShown); rAcc.textContent=Math.round(acc)+'%';
      gauge.setAttribute('stroke-dasharray',(acc/100*GC).toFixed(1)+' '+GC.toFixed(1));
      // "order": 0 = ungeordnete Punktwolke (keine Richtung), 1 = klare Richtung auf der Modelllinie.
      // Steigt innerhalb von "Optimieren" und mit jeder Iteration weiter (fortlaufend besser).
      const FULL=[0.50,0.68,0.82,0.93], START=[0.00,0.46,0.64,0.78];
      const ord = phase<=1 ? START[iter] : phase===2 ? lerp(START[iter],FULL[iter],ease(prog)) : FULL[iter];
      ctx.clearRect(0,0,W,H);
      ctx.strokeStyle='rgba(20,20,18,0.05)'; ctx.lineWidth=1;
      for(let g=0;g<4;g++){const yy=PADT+g*(H-PADT-PADB)/3;ctx.beginPath();ctx.moveTo(PADL,yy);ctx.lineTo(W-PADR,yy);ctx.stroke();}
      const tt=now*0.001, revealN=phase===0?Math.floor(ease(prog)*N):N;
      if(phase>=1){
        let lineProg=phase===1?ease(prog):1;
        const wav=phase===1?(1-ease(prog))*0.05:(phase===2?(1-ease(prog))*0.03:0);
        ctx.lineWidth=2.6; ctx.strokeStyle=C_ORANGE; ctx.beginPath();
        const steps=60;
        for(let s=0;s<=steps*lineProg;s++){const xn=s/steps; const yn=trueY(xn)+Math.sin(xn*9+tt*2)*wav; const X=px(xn),Y=py(yn); if(s===0)ctx.moveTo(X,Y); else ctx.lineTo(X,Y);}
        ctx.stroke();
        if(phase===3){
          const pr=ease(prog);
          ctx.save(); ctx.setLineDash([6,5]); ctx.strokeStyle='rgba(255,170,9,0.55)'; ctx.lineWidth=2.4; ctx.beginPath();
          const x1=1,x2=1+0.18*pr,y1=trueY(1); ctx.moveTo(px(x1),py(y1));
          const yEnd=trueY(1)-0.10*pr; ctx.lineTo(px(x2),py(yEnd)); ctx.stroke(); ctx.restore();
          const gx=px(x2),gy=py(yEnd), pulse=2+Math.sin(tt*4)*1.5;
          const grd=ctx.createRadialGradient(gx,gy,0,gx,gy,16); grd.addColorStop(0,'rgba(255,170,9,.5)'); grd.addColorStop(1,'rgba(255,170,9,0)');
          ctx.fillStyle=grd; ctx.beginPath(); ctx.arc(gx,gy,16,0,7); ctx.fill();
          ctx.fillStyle=C_ORANGE; ctx.beginPath(); ctx.arc(gx,gy,4+pulse*0.4,0,7); ctx.fill();
        }
      }
      for(let i=0;i<revealN;i++){
        const p=pts[i], xn=p.x, lineYn=trueY(xn);
        const baseYn=lerp(p.chaosY, lineYn, ord);            // Wolke -> Linie
        const residual=(1-ord)*0.05;                         // Reststreuung schrumpft mit ord
        const drift=Math.sin(tt*p.sp+p.ph)*0.012*(1-ord*0.7);
        const scatterYn=baseYn + p.noise*residual + drift;
        const scatterXn=xn + Math.cos(tt*p.sp*0.7+p.ph)*0.004*(1-ord*0.5);
        const X=px(scatterXn), Y=py(scatterYn);
        let a=1, rad=2.6;
        if(phase===0){ const localT=(ease(prog)*N - i); a=Math.max(0,Math.min(1,localT)); rad=2.6*a; }
        let col=p.col>0.84?C_BLUE:p.col>0.68?C_TEAL:C_ORANGE;
        ctx.globalAlpha=0.78*a;
        if(ord>0.25){                                        // Residual-Verbindung zur Linie, wenn Richtung entsteht
          ctx.globalAlpha=0.10*a*ord; ctx.strokeStyle=col; ctx.lineWidth=1;
          ctx.beginPath(); ctx.moveTo(X,Y); ctx.lineTo(px(xn),py(lineYn)); ctx.stroke();
          ctx.globalAlpha=0.85*a;
        }
        ctx.fillStyle=col; ctx.beginPath(); ctx.arc(X,Y,rad,0,7); ctx.fill();
      }
      ctx.globalAlpha=1;
      raf=requestAnimationFrame(draw);
    }
    raf=requestAnimationFrame(draw);
    return ()=>{ alive=false; cancelAnimationFrame(raf); ro.disconnect(); };
  },[]);
  return (
    <div className="ds-card" ref={rootRef}>
      <div className="ds-stage">
        <canvas/>
        <div className="ds-steps">
          {['Sammeln','Lernen','Optimieren','Verkaufen'].map((s,i)=>(
            <div className="ds-step" key={s}><div className="num">0{i+1}</div><div className="nm">{s}</div><div className="pr"><i/></div></div>
          ))}
        </div>
        <div className="ds-live"><span className="pulse"/>LIVE</div>
        <div className="ds-cap"><div className="k">Der UNIO-Datenkreislauf</div><div className="t ds-t">Sammeln</div><div className="s ds-s"></div></div>
        <div className="ds-reads">
          <div className="ds-read"><div className="rk">Datenpunkte</div><div className="rv ds-data">0</div></div>
          <div className="ds-read"><div className="rk">Iteration</div><div className="rv ds-iter">01</div></div>
          <div className="ds-read"><div className="rk">Genauigkeit</div>
            <div className="ds-gaugewrap"><svg width="42" height="42" viewBox="0 0 42 42"><circle cx="21" cy="21" r="17" fill="none" stroke="#ECECE8" strokeWidth="5"/><circle className="ds-gauge" cx="21" cy="21" r="17" fill="none" stroke="#FFAA09" strokeWidth="5" strokeLinecap="round" transform="rotate(-90 21 21)" strokeDasharray="0 200"/></svg><div className="rv ds-acc">40%</div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* deterministic avatar palette */
const AV_COLORS=["#C77F00","#5C5E62","#B7791F","#3E8E41","#8A6D3B","#6E727A","#D9760A","#4A4C50"];
const Avatar = ({name, size=46}) => {
  const initials=name.split(" ").map(w=>w[0]).slice(0,2).join("").toUpperCase();
  let h=0; for(let i=0;i<name.length;i++)h=(h*31+name.charCodeAt(i))%AV_COLORS.length;
  return <span className="av" style={{background:AV_COLORS[h],width:size,height:size,fontSize:size*0.3}}>{initials}</span>;
};

const APP_URL="https://app.unio.at";
const BEWERTUNG_URL="https://bewertung.unio.at";
const SEARCH_URL="https://app.unio.at/listing?listingType=SALE";

/* shared hero FX: scroll progress (--heroP) + smooth mouse-parallax gradient (--mx/--my) */
function useHeroFx(ref){
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    let sraf=0;
    const calcScroll=()=>{sraf=0;const vh=window.innerHeight;const p=Math.max(0,Math.min(1,window.scrollY/(vh*0.85)));el.style.setProperty('--heroP',p.toFixed(3));};
    const onScroll=()=>{if(!sraf)sraf=requestAnimationFrame(calcScroll);};
    calcScroll();
    window.addEventListener('scroll',onScroll,{passive:true});
    window.addEventListener('resize',onScroll);
    let mraf=0,tx=0,ty=0,cx=0,cy=0;
    const tick=()=>{cx+=(tx-cx)*0.10;cy+=(ty-cy)*0.10;el.style.setProperty('--mx',cx.toFixed(4));el.style.setProperty('--my',cy.toFixed(4));if(Math.abs(tx-cx)>0.002||Math.abs(ty-cy)>0.002){mraf=requestAnimationFrame(tick);}else{mraf=0;}};
    const onMove=(e)=>{const r=el.getBoundingClientRect();tx=((e.clientX-r.left)/r.width-0.5)*2;ty=((e.clientY-r.top)/r.height-0.5)*2;if(!mraf)mraf=requestAnimationFrame(tick);};
    const onLeave=()=>{tx=0;ty=0;if(!mraf)mraf=requestAnimationFrame(tick);};
    el.addEventListener('pointermove',onMove);
    el.addEventListener('pointerleave',onLeave);
    return ()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);el.removeEventListener('pointermove',onMove);el.removeEventListener('pointerleave',onLeave);cancelAnimationFrame(mraf);cancelAnimationFrame(sraf);};
  },[]);
}

function HeroBg({blend=true, grid=true}){
  return (
    <React.Fragment>
      {grid && <div className="hero-grid"/>}
    </React.Fragment>
  );
}

/* hero search → opens the live listing search, passing the typed term so it runs there too */
function HeroSearch(){
  const go=(e)=>{
    e.preventDefault();
    const q=(e.currentTarget.querySelector('.si').value||'').trim();
    const url=SEARCH_URL+(q?('&search='+encodeURIComponent(q)):'');
    window.open(url,'_blank','noopener');
  };
  return (
    <form className="search-bar" onSubmit={go}>
      <Icon.search size={19} />
      <input className="si" placeholder="Immobilie suchen — Ort, Typ, Preis…" aria-label="Immobiliensuche"/>
      <button className="btn btn-p" type="submit">Suchen</button>
    </form>
  );
}

const NAV_LINKS=[
  {href:"bautraeger.html", label:"Bauträger", key:"bautraeger"},
  {href:"makler.html", label:"CIRCLE", key:"makler"},
  {href:"story.html", label:"Story", key:"story"},
];

function Nav({active, cta}){
  const [open,setOpen]=useState(false);
  const [solid,setSolid]=useState(false);
  useEffect(()=>{
    const on=()=>setSolid(window.scrollY>40);
    on();window.addEventListener('scroll',on,{passive:true});
    return ()=>window.removeEventListener('scroll',on);
  },[]);
  const primary = cta || {label:"Immobilie bewerten", href:BEWERTUNG_URL};
  return (
    <div className={"nav"+(solid?" solid":"")}><div className="nav-in">
      <Logo className="logo" />
      <nav className="nav-links">
        {NAV_LINKS.map(l=><a key={l.key} href={l.href} className={active===l.key?"active":""}>{l.label}</a>)}
      </nav>
      <div className="nav-cta">
        <a className="nav-login" href={APP_URL} target="_blank" rel="noopener">Login</a>
        {primary.onClick
          ? <button className="nav-outline" onClick={primary.onClick}>{primary.label} <Icon.arrow size={15}/></button>
          : <a className="nav-outline" href={primary.href} target={primary.href.startsWith("http")?"_blank":undefined} rel="noopener">{primary.label} <Icon.arrow size={15}/></a>}
        <button className="menu-btn" onClick={()=>setOpen(o=>!o)} aria-label="Menü">{open?<Icon.close/>:<Icon.menu/>}</button>
      </div>
      {open && <div style={{position:"absolute",top:72,left:0,right:0,background:"var(--bg)",borderBottom:"1px solid var(--bd)",padding:"16px 22px",display:"flex",flexDirection:"column",gap:4,boxShadow:"var(--shadow-2)"}}>
        {NAV_LINKS.map(l=><a key={l.key} href={l.href} style={{padding:"12px 0",fontSize:16,fontWeight:500,borderBottom:"1px solid var(--bdf)"}}>{l.label}</a>)}
        <a href={APP_URL} target="_blank" rel="noopener" style={{padding:"12px 0",fontSize:16,fontWeight:600,color:"var(--orange-deep)"}}>Dashboard Login →</a>
      </div>}
    </div></div>
  );
}

function Ticker({ink=false, items}){
  const data=items||[
    ['300+ Mio €','Volumen vermittelt'],['1 Mrd','Reichweite über Kampagnen'],['25+','Top-Performer im CIRCLE'],
    ['50 Mio+','Zeilen Code'],['3 Mio €','Umsatz 2025'],['100%','erfolgsbasiert für Bauträger']
  ];
  const set=(k)=>data.map(([a,b],i)=><span className="tick" key={k+i}><b className="o">{a}</b><span>{b}</span><span className="sep">/</span></span>);
  return <div className={"ticker"+(ink?" ink":"")}><div className="ticker-track">{set('a')}{set('b')}</div></div>;
}

/* Scroll-driven word reveal for headlines (grey → color, word by word) */
function RevealText({children, className, style, tag}){
  const Tag=tag||'h2';
  const ref=useRef();
  const tokens=[];
  (function walk(node, accent){
    if(node==null||node===false) return;
    if(typeof node==='string'||typeof node==='number'){
      String(node).split(/(\s+)/).forEach(part=>{ if(part==='') return; if(/^\s+$/.test(part)) tokens.push({space:true}); else tokens.push({word:part, accent}); });
      return;
    }
    if(Array.isArray(node)){ node.forEach(n=>walk(n,accent)); return; }
    if(React.isValidElement(node)){
      if(node.type==='br'){ tokens.push({br:true}); return; }
      const cls=node.props&&node.props.className?String(node.props.className):'';
      walk(node.props.children, accent||cls.includes('accent'));
    }
  })(children,false);
  const accWords=tokens.filter(t=>t.word&&t.accent).length;
  const [p,setP]=useState(0);
  useEffect(()=>{
    if(!accWords) return;
    let raf=0;
    const calc=()=>{raf=0;const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const vh=window.innerHeight;const v=( (vh*0.9) - r.top )/((0.9-0.42)*vh);setP(Math.max(0,Math.min(1,v)));};
    const on=()=>{if(!raf)raf=requestAnimationFrame(calc);};calc();on();
    window.addEventListener('scroll',on,{passive:true});window.addEventListener('resize',on);
    return ()=>{window.removeEventListener('scroll',on);window.removeEventListener('resize',on);};
  },[accWords]);
  // no orange word → render statically (black/plain headlines do not animate)
  if(!accWords) return <Tag className={className} style={style}>{children}</Tag>;
  let ai=0;
  return (
    <Tag ref={ref} className={"rvtext"+(className?" "+className:"")} style={{...(style||{}),"--n":accWords,"--p":p.toFixed(3)}}>
      {tokens.map((t,k)=>{
        if(t.br) return <br key={k}/>;
        if(t.space) return <span key={k} className="rv-sp"> </span>;
        if(t.accent){ const i=ai++; return <span key={k} className="rv-w acc" style={{"--i":i}}>{t.word}</span>; }
        return <span key={k} className="rv-w">{t.word}</span>;
      })}
    </Tag>
  );
}

/* scroll-driven rounded→sharp top corners for full-bleed bands */
function useEdgeRadius(ref, maxR){
  useEffect(()=>{
    let raf=0;const max=maxR||40;
    const calc=()=>{raf=0;const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const vh=window.innerHeight;const t=Math.max(0,Math.min(1, r.top/(vh*0.62)));el.style.setProperty('--edgeR',(t*max).toFixed(1)+'px');};
    const on=()=>{if(!raf)raf=requestAnimationFrame(calc);};on();
    window.addEventListener('scroll',on,{passive:true});window.addEventListener('resize',on);
    return ()=>{window.removeEventListener('scroll',on);window.removeEventListener('resize',on);};
  },[]);
}

function Footer(){
  const ref=useRef();
  const [fp,setFp]=useState(0);
  useEffect(()=>{
    let raf=0;
    const calc=()=>{raf=0;const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();const vh=window.innerHeight;const start=vh*1.0,end=vh*0.32;const p=(start-r.top)/(start-end);setFp(Math.max(0,Math.min(1,p)));};
    const on=()=>{if(!raf)raf=requestAnimationFrame(calc);};on();
    window.addEventListener('scroll',on,{passive:true});window.addEventListener('resize',on);
    return ()=>{window.removeEventListener('scroll',on);window.removeEventListener('resize',on);};
  },[]);
  return (
    <footer ref={ref} style={{"--footP":fp.toFixed(3)}}>
      <div className="foot-aura"/>
      <div className="wrap-wide" style={{position:"relative",zIndex:1}}>
        <div className="foot-top">
          <div className="foot-brand">
            <p>Data-Powered Real Estate. Testen. Lernen. Optimieren. Verkaufen. — Fünf Unternehmen, eine Mission.</p>
            <div style={{display:"flex",gap:10,marginTop:20}}>
              <a className="btn btn-g" href={APP_URL} target="_blank" rel="noopener" style={{fontSize:13}}>Dashboard <Icon.arrowUR size={15}/></a>
              <a className="btn btn-g" href={BEWERTUNG_URL} target="_blank" rel="noopener" style={{fontSize:13}}>Bewertung <Icon.arrowUR size={15}/></a>
            </div>
          </div>
          <div className="foot-col"><h4>Plattform</h4>
            <a href="bautraeger.html">NOVA</a><a href="index.html#plattform">Lead Engine</a><a href="makler.html">CIRCLE</a><a href={APP_URL} target="_blank" rel="noopener">LENS</a></div>
          <div className="foot-col"><h4>Für wen</h4>
            <a href="bautraeger.html">Bauträger</a><a href="makler.html">Makler</a><a href="immobilien.html">Käufer & Suchende</a><a href={BEWERTUNG_URL} target="_blank" rel="noopener">Immobilie bewerten</a></div>
          <div className="foot-col"><h4>Unternehmen</h4>
            <a href="story.html">Story</a><a href="story.html#team">Über uns</a><a href="makler.html#bewerben">Karriere</a><a href="kontakt.html">Kontakt</a></div>
        </div>
        <div className="foot-bot">
          <span>© 2026 Real Unio GmbH · Kärntner Straße 12, 1010 Wien</span>
          <a className="foot-top-link" href="#top" onClick={(e)=>{e.preventDefault();window.scrollTo({top:0,behavior:'smooth'});}}>Zurück zum Anfang <span className="up"><Icon.arrow size={13}/></span></a>
          <span>Impressum · Datenschutz · AGB</span>
        </div>
      </div>
      <div className="foot-mark" aria-hidden="true">
        <img src={LOGO_BLACK} alt="UNIO"/>
      </div>
    </footer>
  );
}

/* ---- Funnel framework ---- */
function FunnelShell({title, step, total, onClose, progress, children, footer}){
  useEffect(()=>{document.body.style.overflow="hidden";return ()=>{document.body.style.overflow="";};},[]);
  return (
    <div className="funnel-overlay" onMouseDown={(e)=>{if(e.target===e.currentTarget)onClose();}}>
      <div className="funnel" role="dialog" aria-modal="true">
        <div className="funnel-top">
          <Logo className="logo sm"/>
          <div>
            <div className="ft-title">{title}</div>
            <div className="ft-step">Schritt {step} von {total}</div>
          </div>
          <button className="funnel-close" onClick={onClose} aria-label="Schließen"><Icon.close size={18}/></button>
        </div>
        <div className="funnel-progress"><i style={{width:progress+"%"}}/></div>
        {children}
        {footer}
      </div>
    </div>
  );
}

function OptionList({options, value, onChange, multi=false}){
  const toggle=(v)=>{
    if(multi){ const arr=value||[]; onChange(arr.includes(v)?arr.filter(x=>x!==v):[...arr,v]); }
    else onChange(v);
  };
  const isSel=(v)=>multi?(value||[]).includes(v):value===v;
  return <div className={"opts"+(options.length===4&&options.every(o=>!o.d)?" two":"")}>
    {options.map(o=>(
      <button type="button" key={o.v} className={"opt"+(isSel(o.v)?" sel":"")} onClick={()=>toggle(o.v)}>
        <span className="ob">{isSel(o.v)&&<Icon.check size={14} sw={3} />}</span>
        <span><span className="ol">{o.l}</span>{o.d&&<span className="od">{o.d}</span>}</span>
      </button>
    ))}
  </div>;
}
