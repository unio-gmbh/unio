/* ===================== KONTAKT ===================== */

const ROUTES_K=[
  {icon:<Icon.building size={20}/>,h:'Bauträger',p:'Projekt prüfen lassen — 100 % erfolgsbasiert.',go:'Zur Bauträger-Seite',href:'bautraeger.html'},
  {icon:<Icon.users size={20}/>,h:'Makler',p:'Als CIRCLE Partner bewerben.',go:'Zur CIRCLE-Seite',href:'makler.html'},
  {icon:<Icon.home size={20}/>,h:'Käufer & Suchende',p:'Immobilien entdecken oder bewerten.',go:'Immobilien ansehen',href:'immobilien.html'},
];

function ContactForm(){
  const [d,setD]=useState({name:'',email:'',anliegen:'Allgemeine Anfrage',msg:''});
  const [sent,setSent]=useState(false);
  const set=(k,v)=>setD(s=>({...s,[k]:v}));
  const valid=d.name.trim()&&/.+@.+\..+/.test(d.email)&&d.msg.trim().length>3;
  if(sent){
    return (
      <div className="card" style={{padding:'48px 36px',textAlign:'center'}}>
        <div style={{display:'flex',justifyContent:'center',marginBottom:20}}><Ring size={72} w={8} color="var(--orange)" track="var(--track)"/></div>
        <h3 style={{fontWeight:800,fontSize:26,letterSpacing:'-.02em'}}>Danke, {d.name.split(' ')[0]}!</h3>
        <p style={{color:'var(--fg2)',fontSize:15.5,lineHeight:1.6,marginTop:12,maxWidth:380,marginLeft:'auto',marginRight:'auto'}}>Deine Nachricht ist bei uns. Wir melden uns innerhalb von 48 Stunden.</p>
        <button className="btn btn-g btn-lg" style={{marginTop:24}} onClick={()=>{setSent(false);setD({name:'',email:'',anliegen:'Allgemeine Anfrage',msg:''});}}>Neue Nachricht</button>
      </div>
    );
  }
  return (
    <form className="card" style={{padding:'34px 36px'}} onSubmit={(e)=>{e.preventDefault();if(valid)setSent(true);}}>
      <h3 style={{fontWeight:700,fontSize:21,letterSpacing:'-.01em'}}>Schreib uns</h3>
      <p style={{color:'var(--fg3)',fontSize:14,marginTop:6,marginBottom:22}}>Wir antworten persönlich — kein Bot, keine Warteschleife.</p>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        <div className="field" style={{margin:0}}><label>Name *</label><input className="input" value={d.name} onChange={e=>set('name',e.target.value)}/></div>
        <div className="field" style={{margin:0}}><label>E-Mail *</label><input className="input" type="email" value={d.email} onChange={e=>set('email',e.target.value)}/></div>
      </div>
      <div className="field" style={{marginTop:14}}><label>Anliegen</label>
        <select className="select" value={d.anliegen} onChange={e=>set('anliegen',e.target.value)}>
          <option>Allgemeine Anfrage</option><option>Ich bin Bauträger</option><option>Ich bin Makler (CIRCLE)</option><option>Ich suche eine Immobilie</option><option>Presse & Partnerschaften</option>
        </select></div>
      <div className="field" style={{marginTop:14,marginBottom:22}}><label>Nachricht *</label><textarea className="textarea" value={d.msg} onChange={e=>set('msg',e.target.value)} placeholder="Wie können wir helfen?"/></div>
      <button className="btn btn-p btn-lg" type="submit" disabled={!valid}>Nachricht senden <Icon.arrow size={16}/></button>
    </form>
  );
}

function HeroK(){
  return (
    <section className="hero"><div className="wrap-wide" style={{position:'relative'}}><div className="hero-grid"/></div>
      <div className="wrap-wide hero-in" style={{alignItems:'start'}}>
        <div>
          <span className="kicker">Kontakt</span>
          <h1 style={{fontSize:'clamp(38px,5vw,64px)'}}>Sprich mit uns.</h1>
          <p className="sub">Egal ob Bauträger, Makler oder auf der Suche nach dem nächsten Zuhause — wir holen dich genau dort ab, wo du gerade stehst.</p>
          <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:32}}>
            {ROUTES_K.map(r=>(
              <a key={r.h} href={r.href} className="card" style={{padding:'18px 20px',display:'flex',alignItems:'center',gap:16,transition:'all .18s var(--ease)'}}>
                <span className="ricon" style={{width:42,height:42}}>{r.icon}</span>
                <div style={{flex:1}}><div style={{fontWeight:700,fontSize:16}}>{r.h}</div><div style={{fontSize:13.5,color:'var(--fg3)',marginTop:2}}>{r.p}</div></div>
                <span style={{color:'var(--orange-deep)',fontWeight:600,fontSize:13,display:'inline-flex',alignItems:'center',gap:6}}>{r.go} <Icon.arrow size={15}/></span>
              </a>
            ))}
          </div>
          <div style={{marginTop:28,display:'flex',flexDirection:'column',gap:14,paddingTop:24,borderTop:'1px solid var(--bdf)'}}>
            <div style={{display:'flex',alignItems:'center',gap:12,fontSize:14.5,color:'var(--fg2)'}}><Icon.pin size={17}/> Real Unio GmbH · Kärntner Straße 12, 1010 Wien</div>
            <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
              <a className="btn btn-g" href={APP_URL} target="_blank" rel="noopener">Dashboard Login <Icon.arrowUR size={15}/></a>
              <a className="btn btn-g" href={BEWERTUNG_URL} target="_blank" rel="noopener">Immobilie bewerten <Icon.arrowUR size={15}/></a>
            </div>
          </div>
        </div>
        <ContactForm/>
      </div>
    </section>
  );
}

function App(){
  return <><Nav active="kontakt"/><HeroK/><Footer/></>;
}
