/* ===================== MAKLER PLATFORM — Bento overview + Screenshot tour ===================== */

/* ---- typing search (KI-Suche) ---- */
function KITyper(){
  const Q=["Wohnungen im 1. Bezirk unter 800k","Penthouse mit Terrasse, Hernals","3 Zimmer, Nähe U1, ab 110 m²","Anlegerwohnung mit Rendite > 3 %"];
  const [qi,setQi]=useState(0),[n,setN]=useState(0),[del,setDel]=useState(false);
  useEffect(()=>{
    const full=Q[qi];
    let t;
    if(!del && n<full.length){ t=setTimeout(()=>setN(n+1),45); }
    else if(!del && n===full.length){ t=setTimeout(()=>setDel(true),1400); }
    else if(del && n>0){ t=setTimeout(()=>setN(n-1),22); }
    else { t=setTimeout(()=>{setDel(false);setQi((qi+1)%Q.length);},250); }
    return ()=>clearTimeout(t);
  },[n,del,qi]);
  return (
    <div style={{display:'flex',flexDirection:'column',gap:10,width:'100%'}}>
      <div className="mp-searchbar">
        <Icon.search size={16}/>
        <span className="tw">{Q[qi].slice(0,n)||'\u00a0'}<span className="mp-caret"/></span>
      </div>
      <div style={{display:'flex',gap:7,flexWrap:'wrap'}}>
        <span className="mp-chip on"><Icon.spark size={12}/> KI-Suche</span>
        <span className="mp-chip">14 Treffer</span>
        <span className="mp-chip">Nur meine</span>
      </div>
    </div>
  );
}

function ShieldAnim(){
  const [ref,seen]=useInView(0.4);
  const [p,setP]=useState(0);
  useEffect(()=>{ if(!seen) return; let v=0; const id=setInterval(()=>{v=(v+4)%128; setP(Math.min(100,v));},45); return ()=>clearInterval(id); },[seen]);
  return (
    <div ref={ref} className="mp-shield">
      <svg width="118" height="138" viewBox="0 0 118 138" fill="none">
        <path d="M59 6 L106 24 V70 C106 102 84 122 59 132 C34 122 12 102 12 70 V24 Z" fill="var(--inset)" stroke="var(--bdf)" strokeWidth="2"/>
        <clipPath id="shc"><path d="M59 6 L106 24 V70 C106 102 84 122 59 132 C34 122 12 102 12 70 V24 Z"/></clipPath>
        <rect x="0" y={138-138*p/100} width="118" height="138" fill="var(--orange-wash)" clipPath="url(#shc)" style={{transition:'y .15s linear'}}/>
        <path d="M42 70 L54 82 L78 54" stroke={p>=100?'var(--pos)':'var(--orange)'} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" style={{transition:'stroke .3s'}}/>
      </svg>
    </div>
  );
}

function ActionsAnim(){
  const [ref,seen]=useInView(0.4);
  const [k,setK]=useState(0);
  useEffect(()=>{ if(!seen) return; const id=setInterval(()=>setK(x=>x+1),2600); return ()=>clearInterval(id); },[seen]);
  const rows=[["Lead telefonisch kontaktieren","Jetzt"],["Besichtigung vorschlagen","Heute"],["Kaufanbot-Link senden","+1 Tag"]];
  return (
    <div ref={ref} className="mp-actionstack" key={k}>
      {rows.map((r,i)=><div className="mp-arow" key={i} style={{animationDelay:(i*0.22)+'s'}}><span className="dot"/><span className="t">{r[0]}</span><span className="go">{r[1]}</span></div>)}
    </div>
  );
}

function PortalAnim(){
  const [ref,seen]=useInView(0.4);
  const [on,setOn]=useState(false);
  useEffect(()=>{ if(!seen) return; const id=setInterval(()=>setOn(o=>!o),1900); return ()=>clearInterval(id); },[seen]);
  return (
    <div ref={ref} className="mp-portals">
      <div className="mp-portal" style={{background:'#F75C03'}}>IS<span className={"tick"+(on?" on":"")}><Icon.check size={12}/></span></div>
      <div className="mp-syncline"/>
      <div className="mp-portal" style={{background:'#EA6E2D'}}>W<span className={"tick"+(on?" on":"")} style={{animationDelay:'.12s'}}><Icon.check size={12}/></span></div>
    </div>
  );
}

function CalAnim(){
  const [ref,seen]=useInView(0.4);
  const [d,setD]=useState(10);
  useEffect(()=>{ if(!seen) return; const days=[3,10,17,24,12]; let i=0; const id=setInterval(()=>{i=(i+1)%days.length;setD(days[i]);},1500); return ()=>clearInterval(id); },[seen]);
  return (
    <div ref={ref} className="mp-cal">
      <div className="mp-calgrid">{Array.from({length:28}).map((_,i)=><i key={i} className={i===d?'on':''}/>)}</div>
    </div>
  );
}

function MatchAnim(){
  const [ref,seen]=useInView(0.4);
  const [on,setOn]=useState(false);
  useEffect(()=>{ if(!seen) return; const id=setInterval(()=>setOn(o=>!o),2200); return ()=>clearInterval(id); },[seen]);
  return (
    <div ref={ref} className="mp-match">
      <div className="mp-matchrow">
        {["Wohnung","€1,0–1,5 Mio","4–5 Zi","1020 Wien"].map((c,i)=><span key={i} className={"mp-chip"+(on?" on":"")} style={{transition:'all .3s '+(i*0.08)+'s'}}>{c}</span>)}
      </div>
      <div className={"mp-matchcheck"+(on?" on":"")}><Icon.check size={16}/> Passendes Objekt gefunden</div>
    </div>
  );
}

function PlatformBento(){
  return (
    <section className="sec" id="plattform"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker">Deine Makler-Plattform</span>
        <h2>Ein System für deinen<br/>gesamten Verkauf.</h2>
        <p>Von der KI-Suche über abgesicherte Leads bis zum Portal-Export — jede Funktion arbeitet für dich, damit du dich auf Abschlüsse konzentrierst.</p></div>
      <div className="mp-bento">
        <div className="mp-card mp-c4">
          <div className="mh">KI-Suche & Lead-Inbox</div>
          <div className="mp">Frag in natürlicher Sprache nach Objekten oder Käufern — die Plattform versteht dich und liefert sofort passende Treffer.</div>
          <div className="mstage" style={{display:'flex',alignItems:'flex-end'}}><KITyper/></div>
        </div>
        <div className="mp-card mp-c2">
          <div className="mh">Provisionssicherung</div>
          <div className="mp">Jeder Lead wird automatisch abgesichert — bevor du Zeit investierst.</div>
          <div className="mstage"><ShieldAnim/></div>
        </div>
        <div className="mp-card mp-c2">
          <div className="mh">Suggested Actions</div>
          <div className="mp">Das System sagt dir den nächsten Schritt — priorisiert nach Wirkung.</div>
          <div className="mstage"><ActionsAnim/></div>
        </div>
        <div className="mp-card mp-c2">
          <div className="mh">Portal-Export</div>
          <div className="mp">Ein Klick veröffentlicht auf ImmobilienScout24 & willhaben — inkl. Update & Rückzug.</div>
          <div className="mstage"><PortalAnim/></div>
        </div>
        <div className="mp-card mp-c2">
          <div className="mh">Besichtigung & Kalender</div>
          <div className="mp">Termine direkt aus dem Lead heraus buchen — synchron mit deinem Kalender.</div>
          <div className="mstage"><CalAnim/></div>
        </div>
        <div className="mp-card mp-c3">
          <div className="mh">Automatisches Matching</div>
          <div className="mp">Aus jeder Anfrage entsteht ein Suchprofil — und die Plattform matcht es laufend gegen deinen Bestand.</div>
          <div className="mstage"><MatchAnim/></div>
        </div>
        <div className="mp-card mp-c3">
          <div className="mh">KI-Objektanlage</div>
          <div className="mp">Dokumente reinziehen — die KI erstellt Exposé, Daten und Suchprofil automatisch.</div>
          <div className="mstage"><div className="mp-bignum"><div className="v"><Num end={90}/> %</div><div className="k">weniger Tipparbeit pro Objekt</div></div></div>
        </div>
      </div>
    </div></section>
  );
}

/* ---------------- Screenshot scroll-tour ---------------- */
const PT_STEPS=[
  {img:'mk_19', addr:'app.unio.at/dashboard', n:'01', t:'Dein Cockpit.', p:'Aktivität, Status-Mix und Kontakt-Funnel auf einen Blick — du siehst sofort, wo Bewegung ist und worauf du dich heute konzentrieren solltest.', lb:'Dashboard'},
  {img:'mk_05', addr:'app.unio.at/interessenten', n:'02', t:'Jeder Lead. Abgesichert.', p:'Alle Interessenten an einem Ort — mit Status, Kaufabsicht und automatischer Provisionssicherung, bevor du Zeit investierst.', lb:'Interessenten'},
  {img:'mk_06', addr:'app.unio.at/leads', n:'03', t:'Suggested Actions führen dich.', p:'Pro Lead siehst du den vollständigen Verlauf und den klar empfohlenen nächsten Schritt — Anruf, Besichtigung oder Kaufanbot.', lb:'Lead-Detail'},
  {img:'mk_08', addr:'app.unio.at/matching', n:'04', t:'Automatisches Matching.', p:'Aus jeder Anfrage entsteht ein Suchprofil, das laufend gegen deinen Bestand gematcht wird — kein Lead geht verloren.', lb:'Matching'},
  {img:'mk_01', addr:'app.unio.at/immobilien', n:'05', t:'Dein Bestand, durchsuchbar.', p:'Alle Objekte und Entwürfe mit KI-Suche in natürlicher Sprache — Filter, Ansichten und Status in Echtzeit.', lb:'Immobilien'},
  {img:'mk_04', addr:'app.unio.at/immobilien/detail', n:'06', t:'Objekte, die verkaufen.', p:'Hochwertige Exposés mit Galerie, Interessenten, Plattform-Export und Abschluss — alles am selben Objekt.', lb:'Objekt'},
  {img:'mk_13', addr:'app.unio.at/portale', n:'07', t:'Ein Klick. Alle Portale.', p:'Veröffentliche, aktualisiere und ziehe zurück auf ImmobilienScout24 & willhaben — mit vollständigem Übertragungs-Log.', lb:'Portale'},
  {img:'mk_03', addr:'app.unio.at/immobilien/neu', n:'08', t:'Die KI legt das Objekt an.', p:'Dokumente reinziehen — die KI erstellt den ersten Entwurf inkl. Exposé, Daten und Suchprofil. Du prüfst nur noch.', lb:'KI-Anlage'},
];
function PlatformTour(){
  const wrapRef=useRef();
  const p=useStickyProgress(wrapRef);
  const N=PT_STEPS.length;
  const auto=Math.max(0,Math.min(N-1,Math.floor(p*N*0.999)));
  const [manual,setManual]=useState(null);
  const active=manual!=null?manual:auto;
  return (
    <section className="sec ground" id="tour"><div className="wrap-wide">
      <div className="sec-head"><span className="kicker">LENS · Die Plattform live</span>
        <h2>Scrolle durch deine Plattform.</h2>
        <p>So arbeitest du im CIRCLE — echte Screens aus dem UNIO-Dashboard, Schritt für Schritt.</p></div>
    </div>
    <div className="pt-scroll" ref={wrapRef} style={{height:(N*62)+'vh'}}>
      <div className="pt-sticky"><div className="wrap-wide"><div className="pt-grid">
        <div className="pt-copy">
          {PT_STEPS.map((s,i)=>(
            <div key={i} className={"pt-step"+(i===active?" on":"")}>
              <div className="pt-num">{s.n} / 0{N}</div>
              <h3>{s.t}</h3>
              <p>{s.p}</p>
            </div>
          ))}
          <div className="pt-dots">
            {PT_STEPS.map((s,i)=>(
              <button key={i} className={"pt-dot"+(i===active?" on":"")} onClick={()=>setManual(i)}>
                <span className="bar"/><span className="lb">{s.lb}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="pt-frame">
          <div className="pt-chrome"><i/><i/><i/><span className="addr">{PT_STEPS[active].addr}</span></div>
          <div className="pt-live"><span className="pulse"/>LIVE</div>
          <div className="pt-shots">
            {PT_STEPS.map((s,i)=>(
              <div key={i} className={"pt-shot"+(i===active?" on":"")} style={{transform:i===active?'scale(1)':'scale(1.03)',transition:'opacity .6s var(--ease), transform 4s ease-out'}}>
                <img src={IMG[s.img]} alt={s.lb} loading="lazy"/>
              </div>
            ))}
          </div>
        </div>
      </div></div></div>
    </div>
    <div className="wrap-wide" style={{marginTop:18,display:'flex',gap:13,flexWrap:'wrap',alignItems:'center'}}>
      <a className="btn btn-g btn-lg" href={APP_URL} target="_blank" rel="noopener">Dashboard öffnen <Icon.arrowUR size={16}/></a>
      <span style={{fontSize:13,color:'var(--fg3)'}}>Live unter app.unio.at · echte Screens</span>
    </div>
    </section>
  );
}
