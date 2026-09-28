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
      <Kopf ueber={fertig === HM_EINRICHTUNG.length ? "Alles eingerichtet" : `${fertig} von ${HM_EINRICHTUNG.length} erledigt`} titel="Einrichtung" text={teamSicht ? "Zehn Bausteine. Was beim Team liegt, ist markiert." : "Zehn kurze Bausteine, ein paar erledigen wir für dich."}
        rechts={<div className="hm-row" style={{ gap: 14 }}><Ring wert={fertig / HM_EINRICHTUNG.length} groesse={72} /><div><div style={{ fontSize: 28, letterSpacing: "-.03em", color: "var(--ink)" }}>{fertig} von {HM_EINRICHTUNG.length}</div><div className="hm-mono">erledigt</div></div></div>} />
      {naechster && !teamSicht && <button className="hm-weiter" onClick={() => setOffen(naechster.id)}><div><div style={{ fontSize: 22, letterSpacing: "-.02em" }}>{naechster.titel}</div><div style={{ color: "var(--text-inverse-muted)", fontSize: 14, marginTop: 4 }}>{naechster.satz} {naechster.dauer}.</div></div><span className="k"><Ico n="pfeil" /></span></button>}
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
  const { st, daten, setZ, setD } = useEinrichtung(m.id);
  const abo = HM_ABOS.find((a) => a.name === m.abo) || HM_ABOS[0];
  const sig = daten.vertrag || {};
  const [gelesen, setGelesen] = React.useState(false);
  const [name, setName] = React.useState("");
  const T = hmVertragText(m, abo);
  if (st.vertrag === "fertig") return <div className="hm-stack">
    <Leer titel="Unterschrieben." text={sig.zeit ? `Von ${sig.name} am ${new Date(sig.zeit).toLocaleString("de-AT", { dateStyle: "long", timeStyle: "short" })}.` : `${abo.name}, ${abo.preis} € pro Monat.`} />
    {sig.hash && <div className="hm-daten" style={{ textAlign: "center", wordBreak: "break-all" }}>Prüfsumme {sig.hash.slice(0, 16)}…{sig.hash.slice(-8)}</div>}
    <button className="hm-link" style={{ alignSelf: "center" }} onClick={() => hmVertragPdf(m, abo, sig.hash ? sig : { name: m.name, zeit: "2026-09-22T10:00", hash: "vor Einführung der Prüfsumme unterschrieben" })}>Als PDF sichern</button>
  </div>;
  const unterschreiben = async () => { const zeit = new Date().toISOString(); const hash = await hmSha256(JSON.stringify({ T, name: name.trim(), zeit })); setD("vertrag", { name: name.trim(), zeit, hash }); setZ("vertrag", "fertig", "Vertrag digital unterschrieben"); toast("Unterschrieben. Willkommen bei UNIO."); zu(); };
  return <div className="hm-stack">
    <div className="hm-gruppe">{T.map(([t, x]) => <div key={t} className="hm-reihe"><div className="m"><div className="t">{t}</div><div className="u" style={{ whiteSpace: "normal" }}>{x}</div></div></div>)}</div>
    <Haken an={gelesen} set={setGelesen}>Gelesen und einverstanden.</Haken>
    <label className="hm-feld"><span>Mit deinem Namen unterschreiben</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder={m.name} style={{ fontFamily: "'Fraunces', serif", fontSize: 22 }} /></label>
    <div className="hm-row" style={{ justifyContent: "space-between" }}><span className="hm-daten">Mit Zeitstempel und Prüfsumme</span><Btn disabled={!gelesen || name.trim().length < 3} onClick={unterschreiben}>Unterschreiben</Btn></div>
  </div>;
}

function EPlattform({ m, zu }) {
  const { setZ } = useEinrichtung(m.id);
  const [i, setI] = React.useState(0);
  const S = [
    ["Heute", "Oben steht immer genau eine Sache, die dich braucht. Alles andere läuft sichtbar im Hintergrund.", "../../assets/img/lens-analyse.jpg"],
    ["Marke", "Fragebogen, Konzept, Logo, Website. Alles, was dich erkennbar macht, an einem Ort.", "../../assets/img/pager-visuell.jpg"],
    ["Inhalte", "Jeden Monat wählst du Ideen, wir drehen und schneiden. Du siehst jeden Schritt.", "../../assets/img/pager-vermarktung.jpg"],
    ["Freigaben", "Zwei Knöpfe: Freigeben oder Änderung. Nach fünf Tagen geben wir automatisch frei.", "../../assets/img/pager-expose.jpg"],
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
  const [weg, setWeg] = React.useState(null);
  if (st.import === "fertig") return <Leer titel="Übernommen." text={d.anzahl != null ? `${d.anzahl} ${d.art === "objekte" ? "Objekte" : "Kontakte"} aus ${d.datei || d.quelle} liegen im Dashboard.` : `Kontakte und Objekte aus ${d.quelle || "deiner Quelle"} liegen im Dashboard.`} />;
  if (st.import === "wartet_team") return <Leer titel="Termin steht." text={`Übernahme aus ${d.quelle} am ${d.termin}. Du brauchst nur deinen Zugang.`} />;
  const crm = ["onOffice", "Propstack", "JUSTIMMO"].includes(d.quelle);
  const fertig = (e) => { setD("import", { ...e }); setZ("import", "fertig", `${e.anzahl} ${e.art === "objekte" ? "Objekte" : "Kontakte"} übernommen`); toast("Übernommen"); zu(); };
  return <div className="hm-stack">
    <div className="hm-chips">{HM_IMPORT_QUELLEN.map((q) => <button key={q} className={"hm-chip" + (d.quelle === q ? " on" : "")} onClick={() => { setD("import", { quelle: q }); setWeg(null); }}>{q}</button>)}</div>
    {d.quelle === "Excel oder CSV" && <ImportMapper m={m} fertig={fertig} />}
    {crm && !weg && <div className="hm-gruppe"><Zeile titel="Export hochladen" unter={`In ${d.quelle} Kontakte oder Objekte als CSV oder Excel exportieren`} onClick={() => setWeg("datei")} rechts={<Ico n="weiter" />} /><Zeile titel="Gemeinsam übernehmen" unter="20 Minuten, du brauchst nur deinen Zugang" onClick={() => setWeg("termin")} rechts={<Ico n="weiter" />} /></div>}
    {crm && weg === "datei" && <ImportMapper m={m} fertig={(e) => fertig({ ...e, quelle: d.quelle })} />}
    {crm && weg === "termin" && <><TerminWahl wahl={d.termin} set={(x) => setD("import", { termin: x.text, terminIso: x.iso })} anzahl={4} /><Btn disabled={!d.termin} onClick={() => { setZ("import", "wartet_team", `Übernahme aus ${d.quelle} gebucht: ${d.termin}`); hmIcs({ titel: `UNIO Übernahme ${d.quelle}`, iso: d.terminIso, dauer: 20, text: "Zugang bereithalten" }); toast("Gebucht, Kalendereintrag geladen"); zu(); }}>Termin buchen</Btn></>}
    {d.quelle === "willhaben-Profil" && <><label className="hm-feld"><span>Link zu deinem willhaben-Profil</span><input value={d.link || ""} onChange={(e) => setD("import", { link: e.target.value })} placeholder="willhaben.at/iad/immobilien/..." /></label><Btn disabled={!(d.link || "").includes("willhaben")} onClick={() => { setZ("import", "wartet_team", "willhaben-Profil zur Übernahme"); toast("Wir übernehmen deine Objekte"); zu(); }}>Übernehmen lassen</Btn></>}
    {d.quelle === "Ich habe noch keinen Bestand" && <Btn onClick={() => { setZ("import", "fertig", "Kein Bestand zu übernehmen"); zu(); }}>Passt, weiter</Btn>}
  </div>;
}

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
    <div className="hm-schritte">{seiten.map((t, i) => <button key={t} className={i === schritt ? "on" : i < schritt ? "done" : ""} onClick={() => i <= schritt && go(i)}><i>{i < schritt ? <Ico n="haken" g={12} /> : i + 1}</i>{t}</button>)}</div>
    {schritt === 0 && <>
      <p className="hm-sub" style={{ marginTop: 0 }}>Für jede Plattform eine Antwort. Instagram und Facebook brauchen wir sicher, der Rest ist optional.</p>
      {HM_PLATTFORMEN.map((p) => <div key={p.id} className="hm-plattform"><div className="hm-row" style={{ gap: 10 }}><i style={{ background: p.farbe }}></i><div><div style={{ color: "var(--ink)" }}>{p.name}</div><div className="hm-mono">{p.pflicht ? "Brauchen wir" : "Optional"}</div></div></div><div className="hm-seg">{[["habe", "Habe ich"], ["neu", "Lege ich an"], ...(p.pflicht ? [] : [["nein", "Nicht nötig"]])].map(([v, t]) => <button key={v} className={wahl[p.id] === v ? "on" : ""} onClick={() => setWahl(p.id, v)}>{t}</button>)}</div></div>)}
      <div className="hm-row" style={{ justifyContent: "space-between" }}><button className="hm-chip" onClick={() => { setZ("konten", "wartet_team", "Konten-Session mit dem Team gewünscht"); toast("Wir melden uns für eine gemeinsame Session"); zu(); }}>Lieber gemeinsam in einer Session</button><Btn disabled={!HM_PLATTFORMEN.filter((p) => p.pflicht).every((p) => wahl[p.id])} onClick={() => { setZ("konten", "in_arbeit"); go(1); }}>Weiter</Btn></div>
    </>}
    {schritt > 0 && schritt <= aktiv.length && (() => { const p = aktiv[schritt - 1]; const neu = wahl[p.id] === "neu"; const liste = neu ? p.anlegen : p.haben; const alle = liste.every((_, i) => erledigt[p.id + i]); return <>
      <div className="hm-row" style={{ gap: 10 }}><i className="hm-pl-punkt" style={{ background: p.farbe }}></i><div className="hm-h hm-h3">{neu ? `${p.name} anlegen` : `${p.name} vorbereiten`}</div></div>
      <div className="hm-stack" style={{ gap: 6 }}>{liste.map((t, i) => <Haken key={i} an={!!erledigt[p.id + i]} set={(v) => tick(p.id + i, v)}>{t}</Haken>)}</div>
      {neu && p.id === "instagram" && <div className="hm-card" style={{ background: "var(--paper-2)", boxShadow: "none" }}><div className="hm-mono">Benutzername, Vorschläge</div><div className="hm-chips" style={{ marginTop: 8 }}>{handle.map((h) => <Kopieren key={h} text={"@" + h} />)}</div><div className="hm-mono" style={{ marginTop: 14 }}>Bio, aus deiner Marke</div><div style={{ marginTop: 6 }}>{b.bio ? <><Kopieren text={b.bio.slice(0, 150)} /><div className={b.bio.length > 150 ? "hm-hinweis" : "hm-daten"} style={{ marginTop: 6 }}>{b.bio.length > 150 ? `${b.bio.length} Zeichen, Instagram erlaubt 150. Gekürzt auf 150.` : `${b.bio.length} von 150 Zeichen`}</div></> : <span style={{ fontSize: 13, color: "var(--text-muted)" }}>Kommt automatisch, sobald dein Konzept steht. Bis dahin reicht: Immobilien in {m.region.replace(/^\d{4}\s/, "")}.</span>}</div></div>}
      {p.id === "linkedin" && b.w && <div className="hm-card" style={{ background: "var(--paper-2)", boxShadow: "none" }}><div className="hm-mono">Titelzeile, aus deinem Positionierungssatz</div><div style={{ marginTop: 6 }}><Kopieren text={`${b.w.archetyp.name.replace("Der ", "")} für Immobilien in ${b.w.bezirke.map((x) => x.replace(/^\d{4}\s/, "")).join(", ") || "Wien"} · UNIO Partner`} /></div></div>}
      <div className="hm-row" style={{ justifyContent: "space-between" }}><button className="hm-chip" onClick={() => go(schritt - 1)}>Zurück</button><Btn disabled={!alle} onClick={() => go(schritt + 1)}>{alle ? "Erledigt, weiter" : `${liste.filter((_, i) => erledigt[p.id + i]).length} von ${liste.length}`}</Btn></div>
    </>; })()}
    {schritt === aktiv.length + 1 && <>
      <p className="hm-sub" style={{ marginTop: 0 }}>Damit wir für dich planen und posten können, fügst du UNIO als Person hinzu. Du bleibst Inhaber und kannst den Zugriff jederzeit entziehen.</p>
      <div className="hm-card hm-dark"><div className="hm-mono">Diese Adresse hinterlegen</div><div style={{ fontSize: 26, letterSpacing: "-.02em", margin: "8px 0 12px" }}>{HM_UNIO_SOCIAL_MAIL}</div><Kopieren text={HM_UNIO_SOCIAL_MAIL} /></div>
      {aktiv.some((p) => ["instagram", "facebook"].includes(p.id)) && <div className="hm-card"><div className="hm-h hm-h3">Instagram und Facebook</div><div className="hm-stack" style={{ gap: 6, marginTop: 10 }}>{["business.facebook.com öffnen, mit deinem Facebook-Konto anmelden", "Einstellungen, Personen, Hinzufügen", `E-Mail ${HM_UNIO_SOCIAL_MAIL} eintragen`, "Zugriff: Inhalte und Nachrichten für Seite und Instagram-Konto", "Einladung senden"].map((t, i) => <Haken key={i} an={!!erledigt["meta" + i]} set={(v) => tick("meta" + i, v)}>{t}</Haken>)}</div></div>}
      {aktiv.some((p) => p.id === "tiktok") && <div className="hm-card"><div className="hm-h hm-h3">TikTok</div><div className="hm-stack" style={{ gap: 6, marginTop: 10 }}>{["TikTok Business Center öffnen", "Mitglieder, Einladen", `${HM_UNIO_SOCIAL_MAIL} als Mitglied mit Zugriff auf dein Konto`].map((t, i) => <Haken key={i} an={!!erledigt["tt" + i]} set={(v) => tick("tt" + i, v)}>{t}</Haken>)}</div></div>}
      {aktiv.some((p) => p.id === "linkedin") && <div className="hm-daten">LinkedIn erlaubt keinen Fremdzugriff. Deine Beiträge kommen fertig, du postest mit einem Tipp.</div>}
      <div className="hm-row" style={{ justifyContent: "space-between" }}><button className="hm-chip" onClick={() => go(schritt - 1)}>Zurück</button><Btn onClick={() => { setZ("konten", "wartet_team", `Einladung an ${HM_UNIO_SOCIAL_MAIL} verschickt`); toast("Danke. Wir bestätigen den Zugriff."); zu(); }}>Einladung ist verschickt</Btn></div>
    </>}
  </div>;
}

function EFoto({ m, zu, teamSicht }) {
  const { st, daten, setZ, setD } = useEinrichtung(m.id);
  const d = daten.foto || {};
  const P = (useHm("portraits") || {})[m.id] || { liste: [] };
  const [weg, setWeg] = React.useState(d.weg || "upload");
  const hat = P.liste.length > 0;
  React.useEffect(() => { if (hat && st.foto !== "fertig") setZ("foto", "fertig", teamSicht ? "Porträts vom Foto-Termin zugeschnitten" : "Porträt hochgeladen, freigestellt und zugeschnitten"); if (hat && teamSicht && P.liste.length > 1 && !P.gewaehlt) hmStore.patch("portraits", (a) => ({ ...a, [m.id]: { ...a[m.id], auswahlOffen: true } })); }, [P.liste.length]);
  if (hat || teamSicht) return <div className="hm-stack">
    {teamSicht && !hat && <p className="hm-sub" style={{ marginTop: 0 }}>{d.termin ? `Foto-Termin ${d.termin}. ` : ""}Fotos vom Termin hier ablegen. Alle werden automatisch zugeschnitten und freigestellt, die beste Aufnahme wird aktiv, {m.name.split(" ")[0]} kann tauschen.</p>}
    <Portraits m={m} teamSicht={teamSicht} />
  </div>;
  if (st.foto === "wartet_team") return <div className="hm-stack"><Leer titel="Termin steht." text={`${d.termin}. Danach liegen deine Porträts hier, fertig zugeschnitten.`} /><button className="hm-link" style={{ alignSelf: "center" }} onClick={() => { setZ("foto", "offen"); setWeg("upload"); }}>Doch eigene Fotos hochladen</button></div>;
  return <div className="hm-stack">
    <div className="hm-seg">{[["upload", "Eigene Fotos"], ["termin", "Foto-Termin"]].map(([v, t]) => <button key={v} className={weg === v ? "on" : ""} onClick={() => setWeg(v)}>{t}</button>)}</div>
    {weg !== "termin" && <><Portraits m={m} /><div className="hm-daten">Stehend, Oberkörper im Bild, gleichmäßiges Licht. Mehrere Fotos: die beste Aufnahme wird automatisch gewählt.</div></>}
    {weg === "termin" && <>
      <TerminWahl wahl={d.termin} set={(x) => setD("foto", { termin: x.text, terminIso: x.iso, weg: "termin" })} vorzug hinweis="Am Drehtag, kein Extratermin" anzahl={4} />
      <Btn disabled={!d.termin} onClick={() => { setZ("foto", "wartet_team", `Foto-Termin gebucht: ${d.termin}`); hmIcs({ titel: "UNIO Foto-Termin", iso: d.terminIso, dauer: 20, ort: "Kärntner Straße 12, 1010 Wien" }); toast("Gebucht, Kalendereintrag geladen"); zu(); }}>Termin buchen</Btn>
    </>}
  </div>;
}

function EStrategie({ m, zu, go }) {
  const { st, daten, setZ, setD } = useEinrichtung(m.id);
  const fb = (hmStore.get("fragebogen") || {})[m.id];
  const d = daten.strategie || {};
  if (st.strategie === "fertig") return <Leer titel="Workshop war." text="Deine Strategie ist geprüft und liegt im Konzept." aktion={<Btn onClick={() => { zu(); go("marke", { sub: "konzept" }); }}>Konzept ansehen</Btn>} />;
  if (st.strategie === "wartet_team") return <div className="hm-stack"><Leer titel="Termin steht." text={`${d.termin} mit Daniel, 60 Minuten.${fb && fb.fertig ? "" : " Vorher den Fragebogen, dann ist der Termin halb so lang."}`} aktion={d.terminIso ? <button className="hm-link" onClick={() => hmIcs({ titel: "UNIO Strategie-Workshop", iso: d.terminIso, dauer: 60, ort: "Kärntner Straße 12, 1010 Wien oder online" })}>In den Kalender</button> : null} /></div>;
  return <div className="hm-stack">
    <Zeile titel="Fragebogen" unter={fb && fb.fertig ? "Beantwortet. Zwei Wege liegen bereit." : "Vorher ausfüllen, dann ist der Termin halb so lang."} rechts={fb && fb.fertig ? <span className="hm-ez z-fertig">Erledigt</span> : <button className="hm-chip" onClick={() => { zu(); go("marke", { sub: "fragebogen" }); }}>Starten</button>} />
    <div className="hm-abschnitt-t">Termin mit Daniel, 60 Minuten</div>
    <TerminWahl wahl={d.termin} set={(x) => setD("strategie", { termin: x.text, terminIso: x.iso })} anzahl={5} />
    <Btn disabled={!d.termin} onClick={() => { setZ("strategie", "wartet_team", `Strategie-Termin gebucht: ${d.termin}`); hmIcs({ titel: "UNIO Strategie-Workshop", iso: d.terminIso, dauer: 60, ort: "Kärntner Straße 12, 1010 Wien oder online" }); toast("Gebucht, Kalendereintrag geladen"); zu(); }}>Termin buchen</Btn>
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
  const [profil, setProfil] = React.useState("standard");
  const preis = { 100: 39, 250: 59, 500: 89 }[stk];
  if (!b.fertig) return <Leer titel="Kommt nach deinem Branding." text="Sobald das Branding freigegeben ist, steht die Karte hier fertig." aktion={<Btn onClick={() => { zu(); go("marke", { sub: "design" }); }}>Zum Branding</Btn>} />;
  if (st.visitenkarten === "fertig") return <div className="hm-stack"><div className="hm-vk-paar"><Visitenkarte b={b} tel={d.tel || tel} mail={d.mail || mail} /><Visitenkarte b={b} seite="hinten" /></div><Leer titel="Zugestellt." text={`${d.stk || 250} Stück, geliefert ins Büro Kärntner Straße 12.`} /></div>;
  if (st.visitenkarten === "in_arbeit") return <div className="hm-stack"><div className="hm-vk-paar"><Visitenkarte b={b} tel={d.tel} mail={d.mail} /><Visitenkarte b={b} seite="hinten" /></div><div className="hm-verlauf">{["Bestellt", "Im Druck", "Versandt", "Zugestellt"].map((t, i) => <div key={t} className={i <= 1 ? "on" : ""}><i></i>{t}</div>)}</div><div className="hm-daten">Voraussichtlich in 4 Werktagen.</div><button className="hm-chip" onClick={() => { setZ("visitenkarten", "fertig", "Visitenkarten zugestellt"); zu(); }}>Demo: als zugestellt markieren</button></div>;
  const pruef = hmVkPruefung(b, tel, mail);
  const ok = pruef.every((x) => x.ok);
  return <div className="hm-stack">
    <div className="hm-vk-paar hm-vk-druck"><Visitenkarte b={b} tel={tel} mail={mail} /><Visitenkarte b={b} seite="hinten" /></div>
    <div className="hm-pruefliste">{pruef.map((x) => <div key={x.t} className={x.ok ? "ok" : "nein"}><Ico n={x.ok ? "haken" : "x"} />{x.t}</div>)}</div>
    <div className="hm-feld2"><label className="hm-feld"><span>Telefon</span><input value={tel} onChange={(e) => setTel(e.target.value)} /></label><label className="hm-feld"><span>E-Mail</span><input value={mail} onChange={(e) => setMail(e.target.value)} /></label></div>
    <div className="hm-seg">{[100, 250, 500].map((n) => <button key={n} className={stk === n ? "on" : ""} onClick={() => setStk(n)}>{n} Stück</button>)}</div>
    <div className="hm-row" style={{ justifyContent: "space-between" }}><button className="hm-link" onClick={() => hmVkDruck(b, profil)}>Druck-PDF ansehen</button><div className="hm-seg klein">{Object.entries(HM_DRUCKPROFILE).map(([id, x]) => <button key={id} className={profil === id ? "on" : ""} onClick={() => setProfil(id)}>{x.name}</button>)}</div></div>
    <Btn disabled={!ok} onClick={() => { setD("visitenkarten", { tel, mail, stk }); hmStore.patch("auftraege", (l) => [...(l || []), { id: "o" + Date.now(), maklerId: m.id, katalog: "visitenkarte", name: `Visitenkarten ${stk} Stück`, preis, stufe: 2, zustand: "in_arbeit", datum: "2026-09-28", wer: "System" }]); setZ("visitenkarten", "in_arbeit", `Visitenkarten bestellt, ${stk} Stück`); toast("Bestellt"); }}>{`Bestellen · ${preis} €`}</Btn>
  </div>;
}

function EShop({ m, zu, go }) {
  const { st, setZ } = useEinrichtung(m.id);
  const b = hmBrand(m.id);
  if (!b.fertig) return <Leer titel="Kommt nach deinem Branding." text="Der Shop nutzt dein Logo und dein Portrait für alle Bestellungen." aktion={<Btn onClick={() => { zu(); go("marke", { sub: "design" }); }}>Zum Branding</Btn>} />;
  return <div className="hm-stack">
    <div className="hm-kacheln zwei"><div className="hm-card" style={{ display: "grid", placeItems: "center", minHeight: 160 }}><BrandLogo b={b} h={40} /></div><div className="hm-card" style={{ display: "grid", placeItems: "center", minHeight: 160 }}>{b.portrait ? <img src={b.portrait} alt="" style={{ height: 150, borderRadius: 12 }} /> : <Avatar name={b.makler.name} gross />}</div></div>
    <div className="hm-daten">Alle Bestellungen tragen ab jetzt Logo und Porträt.</div>
    {st.shop === "fertig" ? <Leer titel="Eingerichtet." /> : <Btn onClick={() => { setZ("shop", "fertig", "Shop mit Foto und Logo eingerichtet"); toast("Shop eingerichtet"); zu(); }}>Übernehmen</Btn>}
  </div>;
}

function ETutorials({ m, zu }) {
  const { daten, setZ, setD } = useEinrichtung(m.id);
  const d = daten.tutorials || {};
  const [spiel, setSpiel] = React.useState(null);
  return <div className="hm-stack">
    {spiel && <div className="hm-video"><video src={"../../assets/video/" + spiel.video} poster={spiel.poster} controls autoPlay playsInline /><div className="hm-row" style={{ justifyContent: "space-between", marginTop: 10 }}><div className="hm-h hm-h3">{spiel.titel}</div><Btn onClick={() => { setD("tutorials", { [spiel.id]: true }); setSpiel(null); }}>Gesehen</Btn></div></div>}
    <div className="hm-list">{HM_TUTORIALS.map((t) => <Zeile key={t.id} links={<img src={t.poster} alt="" className="hm-mini" />} titel={t.titel} unter={t.dauer} onClick={() => setSpiel(t)} rechts={d[t.id] ? <span className="hm-ez z-fertig">Gesehen</span> : <span className="hm-mono">Abspielen</span>} />)}</div>
    <Btn onClick={() => { setZ("tutorials", "fertig", "Tutorials angesehen"); zu(); }}>Fertig</Btn>
  </div>;
}

Object.assign(window, { Einrichtung, EinrichtungSheet, useEinrichtung, Visitenkarte, HM_EZ });
