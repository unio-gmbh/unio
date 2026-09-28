/* UNIO HUMAN. Einrichtung: die zehn Onboarding-Bausteine aus dem Diagramm, jeder als geführter Ablauf. */

function useEinrichtung(mid) {
  const all = useHm("einrichtung") || {};
  const daten = (useHm("einrichtung_daten") || {})[mid] || {};
  const st = all[mid] || {};
  const setZ = (id, z, text) => { hmStore.patch("einrichtung", (a) => ({ ...(a || {}), [mid]: { ...((a || {})[mid] || {}), [id]: z } })); if (text) hmEvent(mid, "einrichtung", text, (hmStore.get("makler") || []).find((x) => x.id === mid)?.name); };
  const setD = (id, v) => hmStore.patch("einrichtung_daten", (a) => ({ ...(a || {}), [mid]: { ...((a || {})[mid] || {}), [id]: { ...(((a || {})[mid] || {})[id] || {}), ...v } } }));
  return { st, daten, setZ, setD };
}
const HM_EZ = { offen: "Offen", in_arbeit: "Begonnen", wartet_team: "Beim Team", fertig: "Erledigt" };

function Einrichtung({ m, go, teamSicht }) {
  const { st } = useEinrichtung(m.id);
  const [offen, setOffen] = React.useState(null);
  const b = hmBrand(m.id);
  const fertig = HM_EINRICHTUNG.filter((e) => st[e.id] === "fertig").length;
  const gruppen = [...new Set(HM_EINRICHTUNG.map((e) => e.gruppe))];
  const naechster = HM_EINRICHTUNG.find((e) => st[e.id] !== "fertig" && st[e.id] !== "wartet_team" && !(e.braucht && !b.fertig));
  return (
    <div>
      <Kopf ueber={teamSicht ? `Einrichtung · ${m.name}` : "Einrichtung"} titel={fertig === HM_EINRICHTUNG.length ? "Alles eingerichtet." : "Einmal einrichten, dann läuft es."} text={teamSicht ? "Zehn Bausteine. Was beim Team liegt, ist markiert." : "Zehn kurze Bausteine. Die meisten dauern weniger als fünf Minuten, ein paar erledigen wir für dich."}
        rechts={<div className="hm-row" style={{ gap: 14 }}><Ring wert={fertig / HM_EINRICHTUNG.length} groesse={72} /><div><div style={{ fontSize: 28, letterSpacing: "-.03em", color: "var(--ink)" }}>{fertig} von {HM_EINRICHTUNG.length}</div><div className="hm-mono">erledigt</div></div></div>} />
      {naechster && !teamSicht && <button className="hm-weiter" onClick={() => setOffen(naechster.id)}><div><div className="hm-mono" style={{ color: "var(--text-inverse-muted)" }}>Als Nächstes · {naechster.dauer}</div><div style={{ fontSize: 22, letterSpacing: "-.02em", marginTop: 4 }}>{naechster.titel}</div><div style={{ color: "var(--text-inverse-muted)", fontSize: 14, marginTop: 2 }}>{naechster.satz}</div></div><span className="k">→</span></button>}
      {gruppen.map((g) => (
        <div key={g} style={{ marginTop: 28 }}>
          <div className="hm-mono" style={{ marginBottom: 10 }}>{g}</div>
          <div className="hm-kacheln">
            {HM_EINRICHTUNG.filter((e) => e.gruppe === g).map((e) => { const z = st[e.id] || "offen"; const gesperrt = e.braucht && !b.fertig; return (
              <button key={e.id} className={"hm-kachel" + (z === "fertig" ? " fertig" : "") + (gesperrt ? " gesperrt" : "")} onClick={() => setOffen(e.id)}>
                <div className="hm-row" style={{ justifyContent: "space-between", width: "100%" }}><span className="hm-mono">{e.dauer}</span><span className={"hm-ez z-" + z}>{gesperrt ? "Nach dem Branding" : HM_EZ[z]}</span></div>
                <div className="t">{e.titel}</div><div className="s">{e.satz}</div>
              </button>); })}
          </div>
        </div>
      ))}
      <EinrichtungSheet id={offen} m={m} zu={() => setOffen(null)} go={go} teamSicht={teamSicht} />
    </div>
  );
}

function EinrichtungSheet({ id, m, zu, go, teamSicht }) {
  if (!id) return null;
  const e = HM_EINRICHTUNG.find((x) => x.id === id);
  const K = { vertrag: EVertrag, plattform: EPlattform, import: EImport, konten: EKonten, foto: EFoto, strategie: EStrategie, backoffice: EBackoffice, visitenkarten: EVisitenkarten, shop: EShop, tutorials: ETutorials }[id];
  return <Sheet offen titel={e.titel} unter={e.satz} zu={zu} breit={["konten", "visitenkarten", "tutorials", "foto"].includes(id)}><K m={m} zu={zu} go={go} teamSicht={teamSicht} /></Sheet>;
}

function EVertrag({ m, zu }) {
  const { st, setZ } = useEinrichtung(m.id);
  const abo = HM_ABOS.find((a) => a.name === m.abo) || HM_ABOS[0];
  const [gelesen, setGelesen] = React.useState(st.vertrag === "fertig");
  const [name, setName] = React.useState(st.vertrag === "fertig" ? m.name : "");
  if (st.vertrag === "fertig") return <Leer titel="Unterschrieben." text={`${abo.name}, ${abo.preis} € pro Monat, ${abo.note}. Das PDF liegt in deinen Unterlagen.`} />;
  return <div className="hm-stack">
    <div className="hm-card">
      <div className="hm-mono">Das Wichtigste auf einen Blick</div>
      <div className="hm-list" style={{ marginTop: 6 }}>{[["Paket", abo.name], ["Preis", `${abo.preis} € pro Monat, netto`], ["Laufzeit", abo.note], ["Leistung pro Monat", `${abo.kontingent.videos} Videos, ${abo.kontingent.fotos} Fotos, ${abo.kontingent.grafiken} Grafiken, ${abo.drehtage} Drehtag`], ["Rechte", "Alle Inhalte gehören dir ab Produktion"], ["Korrekturen", "Zwei Runden je Beitrag inklusive"]].map(([t, v]) => <Zeile key={t} titel={t} rechts={<span style={{ color: "var(--ink)" }}>{v}</span>} />)}</div>
    </div>
    <div className="hm-note">Konditionen sind Arbeitsstand und werden vor dem Start rechtlich geprüft.</div>
    <Haken an={gelesen} set={setGelesen}>Ich habe den Vertrag gelesen und bin einverstanden.</Haken>
    <label className="hm-feld"><span>Mit deinem Namen unterschreiben</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder={m.name} style={{ fontFamily: "'Fraunces', serif", fontSize: 22 }} /></label>
    <Btn disabled={!gelesen || name.trim().length < 3} onClick={() => { setZ("vertrag", "fertig", "Vertrag digital unterschrieben"); toast("Unterschrieben. Willkommen bei UNIO."); zu(); }}>Digital unterschreiben</Btn>
  </div>;
}

function EPlattform({ m, zu }) {
  const { setZ } = useEinrichtung(m.id);
  const [i, setI] = React.useState(0);
  const S = [
    ["Heute", "Oben steht immer genau eine Sache, die dich braucht. Alles andere läuft sichtbar im Hintergrund.", "/assets/img/lens-analyse.jpg"],
    ["Marke", "Fragebogen, Konzept, Logo, Website. Alles, was dich erkennbar macht, an einem Ort.", "/assets/img/pager-visuell.jpg"],
    ["Inhalte", "Jeden Monat wählst du Ideen, wir drehen und schneiden. Du siehst jeden Schritt.", "/assets/img/pager-vermarktung.jpg"],
    ["Freigaben", "Zwei Knöpfe: Freigeben oder Änderung. Nach fünf Tagen geben wir automatisch frei.", "/assets/img/pager-expose.jpg"],
  ];
  return <div className="hm-stack">
    <div className="hm-tour"><img src={S[i][2]} alt="" /><div className="hm-tour-t"><div className="hm-mono">{i + 1} von {S.length}</div><div className="hm-h hm-h2" style={{ marginTop: 6 }}>{S[i][0]}</div><p className="hm-sub">{S[i][1]}</p></div></div>
    <div className="hm-row" style={{ justifyContent: "space-between" }}>
      <div className="hm-dots">{S.map((_, j) => <i key={j} className={j === i ? "on" : j < i ? "done" : ""}></i>)}</div>
      {i < S.length - 1 ? <Btn onClick={() => setI(i + 1)}>Weiter</Btn> : <Btn onClick={() => { setZ("plattform", "fertig", "Plattform-Tour abgeschlossen"); toast("Tour abgeschlossen"); zu(); }}>Verstanden</Btn>}
    </div>
  </div>;
}

function EImport({ m, zu }) {
  const { st, daten, setZ, setD } = useEinrichtung(m.id);
  const d = daten.import || {};
  const [datei, setDatei] = React.useState(d.datei || "");
  if (st.import === "fertig") return <Leer titel="Übernommen." text={`${d.kontakte || 142} Kontakte und ${d.objekte || 18} Objekte aus ${d.quelle || "deiner Quelle"} liegen im Dashboard.`} />;
  if (st.import === "wartet_team") return <Leer titel="Termin steht." text={`Übernahme aus ${d.quelle} am ${d.termin}. Wir melden uns am Schritt, falls etwas fehlt.`} />;
  return <div className="hm-stack">
    <div className="hm-mono">1 · Woher kommt dein Bestand?</div>
    <div className="hm-chips">{HM_IMPORT_QUELLEN.map((q) => <button key={q} className={"hm-chip" + (d.quelle === q ? " on" : "")} onClick={() => setD("import", { quelle: q })}>{q}</button>)}</div>
    {d.quelle === "Excel oder CSV" && <><div className="hm-mono">2 · Datei hochladen</div><label className="hm-drop klein"><input type="file" accept=".csv,.xlsx,.xls" hidden onChange={(e) => { const f = e.target.files[0]; if (f) { setDatei(f.name); setD("import", { datei: f.name, kontakte: 142, objekte: 18 }); } }} /><span>{datei ? `${datei} · 142 Kontakte und 18 Objekte erkannt (Vorschau)` : "Datei wählen oder hierher ziehen"}</span></label>
      <Btn disabled={!datei} onClick={() => { setZ("import", "fertig", "Kunden und Objekte übernommen"); toast("Übernommen"); zu(); }}>Übernehmen</Btn></>}
    {d.quelle === "Ich habe noch keinen Bestand" && <Btn onClick={() => { setZ("import", "fertig", "Kein Bestand zu übernehmen"); zu(); }}>Passt, weiter</Btn>}
    {d.quelle && !["Excel oder CSV", "Ich habe noch keinen Bestand"].includes(d.quelle) && <><div className="hm-mono">2 · Termin für die Übernahme</div><p className="hm-sub" style={{ marginTop: 0 }}>Aus {d.quelle} holen wir die Daten gemeinsam in 20 Minuten. Du brauchst nur deinen Zugang.</p>
      <div className="hm-chips">{["Di 30.09., 10:00", "Mi 01.10., 14:00", "Fr 03.10., 09:30"].map((t) => <button key={t} className={"hm-chip" + (d.termin === t ? " on" : "")} onClick={() => setD("import", { termin: t })}>{t}</button>)}</div>
      <Btn disabled={!d.termin} onClick={() => { setZ("import", "wartet_team", `Übernahme aus ${d.quelle} gebucht: ${d.termin}`); toast("Termin gebucht"); zu(); }}>Termin buchen</Btn></>}
  </div>;
}

/* Social-Media-Konten: vorhandene übergeben oder neu anlegen, am Ende UNIO als Admin hinterlegen */
function EKonten({ m, zu }) {
  const { st, daten, setZ, setD } = useEinrichtung(m.id);
  const d = daten.konten || {};
  const wahl = d.wahl || {};
  const [schritt, setSchritt] = React.useState(d.schritt || 0);
  const b = hmBrand(m.id);
  const aktiv = HM_PLATTFORMEN.filter((p) => wahl[p.id] && wahl[p.id] !== "nein");
  const seiten = ["Auswahl", ...aktiv.map((p) => p.name), "UNIO Zugriff geben"];
  const go = (n) => { setSchritt(n); setD("konten", { schritt: n }); };
  const setWahl = (pid, v) => setD("konten", { wahl: { ...wahl, [pid]: v } });
  const erledigt = d.erledigt || {};
  const tick = (key, v) => hmStore.patch("einrichtung_daten", (a) => { const all = a || {}; const md = all[m.id] || {}; const kd = md.konten || {}; return { ...all, [m.id]: { ...md, konten: { ...kd, erledigt: { ...(kd.erledigt || {}), [key]: v } } } }; });
  const handle = [`${b.vor}.${b.nach}.immobilien`, `${b.vor}${b.nach}.wien`, `${b.nach}.immo`].map((x) => x.toLowerCase().replace(/[^a-z0-9._]/g, ""));
  if (st.konten === "wartet_team") return <div className="hm-stack"><Leer titel="Einladung ist unterwegs." text={`Wir bestätigen den Zugriff für ${HM_UNIO_SOCIAL_MAIL} und melden uns, sobald alles verbunden ist. Du musst nichts weiter tun.`} /><button className="hm-chip" onClick={() => { setZ("konten", "in_arbeit"); go(0); }}>Nochmal ansehen</button></div>;
  if (st.konten === "fertig") return <Leer titel="Verbunden." text="Deine Konten sind mit UNIO verbunden. Beiträge planen wir ab jetzt direkt." />;
  return <div className="hm-stack">
    <div className="hm-schritte">{seiten.map((t, i) => <button key={t} className={i === schritt ? "on" : i < schritt ? "done" : ""} onClick={() => i <= schritt && go(i)}><i>{i < schritt ? "✓" : i + 1}</i>{t}</button>)}</div>
    {schritt === 0 && <>
      <p className="hm-sub" style={{ marginTop: 0 }}>Für jede Plattform eine Antwort. Instagram und Facebook brauchen wir sicher, der Rest ist optional.</p>
      {HM_PLATTFORMEN.map((p) => <div key={p.id} className="hm-plattform"><div className="hm-row" style={{ gap: 10 }}><i style={{ background: p.farbe }}></i><div><div style={{ color: "var(--ink)" }}>{p.name}</div><div className="hm-mono">{p.pflicht ? "Brauchen wir" : "Optional"}</div></div></div><div className="hm-seg">{[["habe", "Habe ich"], ["neu", "Lege ich an"], ...(p.pflicht ? [] : [["nein", "Nicht nötig"]])].map(([v, t]) => <button key={v} className={wahl[p.id] === v ? "on" : ""} onClick={() => setWahl(p.id, v)}>{t}</button>)}</div></div>)}
      <div className="hm-row" style={{ justifyContent: "space-between" }}><button className="hm-chip" onClick={() => { setZ("konten", "wartet_team", "Konten-Session mit dem Team gewünscht"); toast("Wir melden uns für eine gemeinsame Session"); zu(); }}>Lieber gemeinsam in einer Session</button><Btn disabled={!HM_PLATTFORMEN.filter((p) => p.pflicht).every((p) => wahl[p.id])} onClick={() => { setZ("konten", "in_arbeit"); go(1); }}>Weiter</Btn></div>
    </>}
    {schritt > 0 && schritt <= aktiv.length && (() => { const p = aktiv[schritt - 1]; const neu = wahl[p.id] === "neu"; const liste = neu ? p.anlegen : p.haben; const alle = liste.every((_, i) => erledigt[p.id + i]); return <>
      <div className="hm-row" style={{ gap: 10 }}><i className="hm-pl-punkt" style={{ background: p.farbe }}></i><div className="hm-h hm-h3">{neu ? `${p.name} anlegen` : `${p.name} vorbereiten`}</div></div>
      <div className="hm-stack" style={{ gap: 6 }}>{liste.map((t, i) => <Haken key={i} an={!!erledigt[p.id + i]} set={(v) => tick(p.id + i, v)}>{t}</Haken>)}</div>
      {neu && p.id === "instagram" && <div className="hm-card" style={{ background: "var(--paper-2)", boxShadow: "none" }}><div className="hm-mono">Benutzername, Vorschläge</div><div className="hm-chips" style={{ marginTop: 8 }}>{handle.map((h) => <Kopieren key={h} text={"@" + h} />)}</div><div className="hm-mono" style={{ marginTop: 14 }}>Bio, aus deiner Marke</div><div style={{ marginTop: 6 }}>{b.bio ? <Kopieren text={b.bio} /> : <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Kommt automatisch, sobald dein Konzept steht. Bis dahin reicht: Immobilien in {m.region.replace(/^\d{4}\s/, "")}.</span>}</div></div>}
      {p.id === "linkedin" && b.w && <div className="hm-card" style={{ background: "var(--paper-2)", boxShadow: "none" }}><div className="hm-mono">Titelzeile, aus deinem Positionierungssatz</div><div style={{ marginTop: 6 }}><Kopieren text={`${b.w.archetyp.name.replace("Der ", "")} für Immobilien in ${b.w.bezirke.map((x) => x.replace(/^\d{4}\s/, "")).join(", ") || "Wien"} · UNIO Partner`} /></div></div>}
      <div className="hm-row" style={{ justifyContent: "space-between" }}><button className="hm-chip" onClick={() => go(schritt - 1)}>Zurück</button><Btn disabled={!alle} onClick={() => go(schritt + 1)}>{alle ? "Erledigt, weiter" : `${liste.filter((_, i) => erledigt[p.id + i]).length} von ${liste.length}`}</Btn></div>
    </>; })()}
    {schritt === aktiv.length + 1 && <>
      <p className="hm-sub" style={{ marginTop: 0 }}>Damit wir für dich planen und posten können, fügst du UNIO als Person hinzu. Du bleibst Inhaber und kannst den Zugriff jederzeit entziehen.</p>
      <div className="hm-card hm-dark"><div className="hm-mono">Diese Adresse hinterlegen</div><div style={{ fontSize: 26, letterSpacing: "-.02em", margin: "8px 0 12px" }}>{HM_UNIO_SOCIAL_MAIL}</div><Kopieren text={HM_UNIO_SOCIAL_MAIL} /></div>
      {aktiv.some((p) => ["instagram", "facebook"].includes(p.id)) && <div className="hm-card"><div className="hm-h hm-h3">Instagram und Facebook</div><div className="hm-stack" style={{ gap: 6, marginTop: 10 }}>{["business.facebook.com öffnen, mit deinem Facebook-Konto anmelden", "Einstellungen, Personen, Hinzufügen", `E-Mail ${HM_UNIO_SOCIAL_MAIL} eintragen`, "Zugriff: Inhalte und Nachrichten für Seite und Instagram-Konto", "Einladung senden"].map((t, i) => <Haken key={i} an={!!erledigt["meta" + i]} set={(v) => tick("meta" + i, v)}>{t}</Haken>)}</div></div>}
      {aktiv.some((p) => p.id === "tiktok") && <div className="hm-card"><div className="hm-h hm-h3">TikTok</div><div className="hm-stack" style={{ gap: 6, marginTop: 10 }}>{["TikTok Business Center öffnen", "Mitglieder, Einladen", `${HM_UNIO_SOCIAL_MAIL} als Mitglied mit Zugriff auf dein Konto`].map((t, i) => <Haken key={i} an={!!erledigt["tt" + i]} set={(v) => tick("tt" + i, v)}>{t}</Haken>)}</div></div>}
      {aktiv.some((p) => p.id === "linkedin") && <div className="hm-note">LinkedIn erlaubt keinen Fremdzugriff auf persönliche Profile. Deine LinkedIn-Beiträge bekommst du fertig zur Freigabe und postest sie mit einem Tipp selbst.</div>}
      <div className="hm-row" style={{ justifyContent: "space-between" }}><button className="hm-chip" onClick={() => go(schritt - 1)}>Zurück</button><Btn onClick={() => { setZ("konten", "wartet_team", `Einladung an ${HM_UNIO_SOCIAL_MAIL} verschickt`); toast("Danke. Wir bestätigen den Zugriff."); zu(); }}>Einladung ist verschickt</Btn></div>
    </>}
  </div>;
}

function EFoto({ m, zu }) {
  const { st, daten, setZ, setD } = useEinrichtung(m.id);
  const d = daten.foto || {};
  const [weg, setWeg] = React.useState(d.weg || null);
  const [bilder, setBilder] = React.useState([]);
  if (st.foto === "fertig") return <div className="hm-stack"><Leer titel="Portraits sind da." text="Freigestellt und im Format 3 : 4 zugeschnitten. Sie landen automatisch auf Website, Visitenkarte und Profilbildern." />{HM_PORTRAIT[m.id] && <img src={HM_PORTRAIT[m.id]} alt="" style={{ width: 160, borderRadius: 16, alignSelf: "center" }} />}</div>;
  return <div className="hm-stack">
    <div className="hm-kacheln zwei">
      <button className={"hm-kachel" + (weg === "termin" ? " on" : "")} onClick={() => setWeg("termin")}><div className="t">Foto-Termin</div><div className="s">20 Minuten, am Drehtag oder im Büro. Wir bringen Licht und Hintergrund.</div></button>
      <button className={"hm-kachel" + (weg === "upload" ? " on" : "")} onClick={() => setWeg("upload")}><div className="t">Eigene Fotos</div><div className="s">Hochladen, wir stellen frei und schneiden nach der Guideline zu.</div></button>
    </div>
    {weg === "termin" && <><div className="hm-chips">{["Mo 29.09., 13:00 (mit Drehtag)", "Do 02.10., 09:00", "Mi 08.10., 14:00"].map((t) => <button key={t} className={"hm-chip" + (d.termin === t ? " on" : "")} onClick={() => setD("foto", { termin: t, weg: "termin" })}>{t}</button>)}</div><Btn disabled={!d.termin} onClick={() => { setZ("foto", "wartet_team", `Foto-Termin gebucht: ${d.termin}`); toast("Termin gebucht"); zu(); }}>Termin buchen</Btn></>}
    {weg === "upload" && <>
      <label className="hm-drop"><input type="file" accept="image/*" multiple hidden onChange={(e) => setBilder([...e.target.files].map((f) => ({ n: f.name, u: URL.createObjectURL(f) })))} /><span>{bilder.length ? `${bilder.length} Fotos gewählt` : "Fotos wählen oder hierher ziehen. Am besten stehend, heller Hintergrund, Oberkörper im Bild."}</span></label>
      {bilder.length > 0 && <div className="hm-thumbs">{bilder.map((x) => <img key={x.u} src={x.u} alt={x.n} />)}</div>}
      <div className="hm-note">Der Zuschnitt läuft mit dem UNIO-Werkzeug: Augen auf der Guideline, Hintergrund transparent, Originalauflösung. <a href="/maklerzuschnitt" target="_blank" rel="noopener">Werkzeug öffnen</a></div>
      <Btn disabled={!bilder.length} onClick={() => { setD("foto", { weg: "upload", anzahl: bilder.length }); setZ("foto", "wartet_team", `${bilder.length} Portrait-Fotos hochgeladen`); toast("Hochgeladen. Wir schneiden zu."); zu(); }}>Hochladen</Btn>
    </>}
  </div>;
}

function EStrategie({ m, zu, go }) {
  const { st, daten, setZ, setD } = useEinrichtung(m.id);
  const fb = (hmStore.get("fragebogen") || {})[m.id];
  const d = daten.strategie || {};
  if (st.strategie === "fertig") return <Leer titel="Workshop war." text="Deine Strategie ist geprüft. Sie liegt unter Marke, Konzept." aktion={<Btn onClick={() => { zu(); go("marke", { sub: "konzept" }); }}>Konzept ansehen</Btn>} />;
  return <div className="hm-stack">
    <Zeile titel="Fragebogen" unter={fb && fb.fertig ? "Beantwortet. Zwei Wege liegen bereit." : "Vorher ausfüllen, dann ist der Termin halb so lang."} rechts={fb && fb.fertig ? <span className="hm-ez z-fertig">Erledigt</span> : <button className="hm-chip" onClick={() => { zu(); go("marke", { sub: "fragebogen" }); }}>Starten</button>} />
    <div className="hm-mono">Termin mit Daniel · 60 Minuten · online oder vor Ort</div>
    <div className="hm-chips">{["Di 30.09., 10:00", "Mi 01.10., 16:00", "Do 02.10., 11:00", "Mo 06.10., 09:00"].map((t) => <button key={t} className={"hm-chip" + (d.termin === t ? " on" : "")} onClick={() => setD("strategie", { termin: t })}>{t}</button>)}</div>
    <Btn disabled={!d.termin} onClick={() => { setZ("strategie", "wartet_team", `Strategie-Termin gebucht: ${d.termin}`); toast("Gebucht. Die Einladung kommt per Mail."); zu(); }}>Termin buchen</Btn>
  </div>;
}

function EBackoffice({ m, zu }) {
  const { daten, setZ, setD } = useEinrichtung(m.id);
  const d = daten.backoffice || {};
  const alle = HM_BACKOFFICE.every((x) => d[x.id]);
  return <div className="hm-stack">
    {HM_BACKOFFICE.map((x) => <div key={x.id} className="hm-card"><div className="hm-row" style={{ justifyContent: "space-between" }}><div className="hm-h hm-h3">{x.titel}</div>{d[x.id] ? <span className="hm-ez z-fertig">Verstanden</span> : <button className="hm-chip" onClick={() => setD("backoffice", { [x.id]: true })}>Verstanden</button>}</div><p className="hm-sub" style={{ marginTop: 8 }}>{x.satz}</p></div>)}
    <Btn disabled={!alle} onClick={() => { setZ("backoffice", "fertig", "Backoffice kennengelernt"); zu(); }}>Fertig</Btn>
  </div>;
}

function Visitenkarte({ b, tel, mail, seite }) {
  const f = b.schrift;
  if (seite === "hinten") return <div className="hm-vk hinten" style={{ background: b.akzent }}><BrandLogo b={b} h={34} invert /></div>;
  return <div className="hm-vk"><BrandLogo b={b} h={26} /><div style={{ marginTop: "auto" }}><div style={{ fontFamily: hmFont(f.d), fontSize: 19, color: "#0B0A09" }}>{b.makler.name}</div><div style={{ fontSize: 11, color: "#383429", marginTop: 2 }}>{b.claim}</div><div style={{ fontSize: 10.5, color: "#383429", marginTop: 10, fontFamily: "JetBrains Mono, monospace" }}>{tel}<br />{mail}<br />unio.at</div></div><i className="hm-vk-punkt" style={{ background: b.akzent }}></i></div>;
}
function EVisitenkarten({ m, zu, go }) {
  const { st, daten, setZ, setD } = useEinrichtung(m.id);
  const b = hmBrand(m.id);
  const d = daten.visitenkarten || {};
  const k = ((hmStore.get("kontakte") || {})[m.id] || [])[0] || {};
  const [tel, setTel] = React.useState(d.tel || "+43 1 000 00 00");
  const [mail, setMail] = React.useState(d.mail || k.mail || "");
  const [stk, setStk] = React.useState(d.stk || 250);
  const preis = { 100: 39, 250: 59, 500: 89 }[stk];
  if (!b.fertig) return <Leer titel="Kommt nach deinem Branding." text="Logo, Schrift und Farbe kommen aus deiner Marke. Sobald das Branding freigegeben ist, steht die Karte hier fertig." aktion={<Btn onClick={() => { zu(); go("marke", { sub: "design" }); }}>Zum Branding</Btn>} />;
  if (st.visitenkarten === "fertig") return <div className="hm-stack"><div className="hm-vk-paar"><Visitenkarte b={b} tel={d.tel || tel} mail={d.mail || mail} /><Visitenkarte b={b} seite="hinten" /></div><Leer titel="Zugestellt." text={`${d.stk || 250} Stück, geliefert ins Büro Kärntner Straße 12.`} /></div>;
  if (st.visitenkarten === "in_arbeit") return <div className="hm-stack"><div className="hm-vk-paar"><Visitenkarte b={b} tel={d.tel} mail={d.mail} /><Visitenkarte b={b} seite="hinten" /></div><div className="hm-verlauf">{["Bestellt", "Im Druck", "Versandt", "Zugestellt"].map((t, i) => <div key={t} className={i <= 1 ? "on" : ""}><i></i>{t}</div>)}</div><div className="hm-note">Voraussichtlich in 4 Werktagen. Druckdaten entstehen aus dem LaTeX-Template von UNIO.</div><button className="hm-chip" onClick={() => { setZ("visitenkarten", "fertig", "Visitenkarten zugestellt"); zu(); }}>Demo: als zugestellt markieren</button></div>;
  return <div className="hm-stack">
    <div className="hm-vk-paar"><Visitenkarte b={b} tel={tel} mail={mail} /><Visitenkarte b={b} seite="hinten" /></div>
    <div className="hm-note">Aus deiner Marke: Logo {HM_LOGO_TYPEN.find((x) => x.id === b.logo).name}, Schrift {b.schrift.name}, Akzent. Du prüfst nur Telefon und E-Mail.</div>
    <div className="hm-feld2"><label className="hm-feld"><span>Telefon</span><input value={tel} onChange={(e) => setTel(e.target.value)} /></label><label className="hm-feld"><span>E-Mail</span><input value={mail} onChange={(e) => setMail(e.target.value)} /></label></div>
    <div className="hm-seg">{[100, 250, 500].map((n) => <button key={n} className={stk === n ? "on" : ""} onClick={() => setStk(n)}>{n} Stück</button>)}</div>
    <Btn onClick={() => { setD("visitenkarten", { tel, mail, stk }); hmStore.patch("auftraege", (l) => [...(l || []), { id: "o" + Date.now(), maklerId: m.id, katalog: "visitenkarte", name: `Visitenkarten ${stk} Stück`, preis, stufe: 2, zustand: "in_arbeit", datum: "2026-09-28", wer: "System" }]); setZ("visitenkarten", "in_arbeit", `Visitenkarten bestellt, ${stk} Stück`); toast("Bestellt"); }}>{`Bestellen · ${preis} €`}</Btn>
  </div>;
}

function EShop({ m, zu, go }) {
  const { st, setZ } = useEinrichtung(m.id);
  const b = hmBrand(m.id);
  if (!b.fertig) return <Leer titel="Kommt nach deinem Branding." text="Der Shop nutzt dein Logo und dein Portrait für alle Bestellungen." aktion={<Btn onClick={() => { zu(); go("marke", { sub: "design" }); }}>Zum Branding</Btn>} />;
  return <div className="hm-stack">
    <div className="hm-kacheln zwei"><div className="hm-card" style={{ display: "grid", placeItems: "center", minHeight: 160 }}><BrandLogo b={b} h={40} /></div><div className="hm-card" style={{ display: "grid", placeItems: "center", minHeight: 160 }}>{b.portrait ? <img src={b.portrait} alt="" style={{ height: 150, borderRadius: 12 }} /> : <Avatar name={b.makler.name} gross />}</div></div>
    <div className="hm-note">Beides kommt aus Branding und Foto-Termin. Bestellungen im Shop tragen ab jetzt automatisch dein Logo und Portrait.</div>
    {st.shop === "fertig" ? <Leer titel="Eingerichtet." /> : <Btn onClick={() => { setZ("shop", "fertig", "Shop mit Foto und Logo eingerichtet"); toast("Shop eingerichtet"); zu(); }}>Übernehmen</Btn>}
  </div>;
}

function ETutorials({ m, zu }) {
  const { daten, setZ, setD } = useEinrichtung(m.id);
  const d = daten.tutorials || {};
  const [spiel, setSpiel] = React.useState(null);
  return <div className="hm-stack">
    {spiel && <div className="hm-video"><video src={"/assets/video/" + spiel.video} poster={spiel.poster} controls autoPlay playsInline /><div className="hm-row" style={{ justifyContent: "space-between", marginTop: 10 }}><div className="hm-h hm-h3">{spiel.titel}</div><Btn onClick={() => { setD("tutorials", { [spiel.id]: true }); setSpiel(null); }}>Gesehen</Btn></div></div>}
    <div className="hm-list">{HM_TUTORIALS.map((t) => <Zeile key={t.id} links={<img src={t.poster} alt="" className="hm-mini" />} titel={t.titel} unter={t.dauer} onClick={() => setSpiel(t)} rechts={d[t.id] ? <span className="hm-ez z-fertig">Gesehen</span> : <span className="hm-mono">Abspielen</span>} />)}</div>
    <Btn onClick={() => { setZ("tutorials", "fertig", "Tutorials angesehen"); zu(); }}>Fertig</Btn>
  </div>;
}

Object.assign(window, { Einrichtung, EinrichtungSheet, useEinrichtung, Visitenkarte, HM_EZ });
