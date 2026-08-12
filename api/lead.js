/* UNIO Lead-Endpoint (Vercel Serverless Function).
   Nimmt alle Website-Formulare entgegen (type: kontakt | projekt | bewerbung | simulator-pdf)
   und stellt sie per Gmail-SMTP zu. Routing:
     bewerbung (Makler/CIRCLE)          -> circle@unio.at
     projekt + simulator-pdf (Bautraeger) -> projects@unio.at
     kontakt: Rolle Makler -> circle@, Rolle Bautraeger -> projects@, sonst office@unio.at
   Versand: zwei Wege, geprueft in dieser Reihenfolge.
   1. OAuth2 (empfohlen, funktioniert ohne App-Passwort): Env-Vars GMAIL_USER,
      GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET, GMAIL_REFRESH_TOKEN. Der Refresh-Token
      wird einmalig ueber den OAuth-Consent des normalen Gmail-Kontos erzeugt
      (Google Cloud Console + OAuth Playground, Scope https://mail.google.com/).
   2. App-Passwort (Fallback): GMAIL_USER + GMAIL_APP_PASSWORD.
   Fehlen beide, wird der Lead nur geloggt (Dashboard > Functions > Logs),
   das Formular bleibt funktionsfaehig. */
import nodemailer from "nodemailer";

const FALLBACK = "office@unio.at";

/* TESTBETRIEB: solange gesetzt, gehen ALLE Leads an diese Adresse.
   Das eigentliche Routing steht trotzdem in jeder Mail ("Empfaenger-Routing"). */
const TEST_EMPFAENGER = null;

/* Diese Adresse bekommt IMMER eine Kopie jedes Leads (Wunsch Daniel, Aug 2026). */
const KOPIE = "daniel@ad.boutique";

function recipient(lead) {
  const type = String(lead.type || "").toLowerCase();
  if (type === "bewerbung") return "circle@unio.at";
  if (type === "projekt" || type === "simulator-pdf") return "projects@unio.at";
  if (type === "kontakt") {
    const rolle = String(lead.rolle || "").toLowerCase();
    if (rolle.startsWith("makler")) return "circle@unio.at";
    if (rolle.startsWith("bautr")) return "projects@unio.at";
  }
  return FALLBACK;
}

const LABELS = {
  bewerbung: "CIRCLE-Bewerbung",
  projekt: "Bautraeger-Projektanfrage",
  "simulator-pdf": "Simulator-Report angefordert",
  kontakt: "Kontaktanfrage",
};

const oneLine = (v) => String(v).replace(/[\r\n]+/g, " ").slice(0, 200);

/* ===== HTML-Mail im UNIO-Design (Referenz: email/EMAIL_BRIEFING.md) =====
   Interne Lead-Benachrichtigung: Topbar, Headline mit orangem Punkt,
   Mono-Datenpanel mit den Formularfeldern, Antworten-Button, Ink-Footer. */
const ORIGIN = "https://www.unio.at";
const MONO = "'SF Mono','Segoe UI Mono','Courier New',monospace";
const DISPLAY = "'Helvetica Neue',Helvetica,Arial,sans-serif";

const HEADLINES = {
  bewerbung: "Neue CIRCLE-Bewerbung",
  projekt: "Neue Projektanfrage",
  "simulator-pdf": "Simulator-Report angefordert",
  kontakt: "Neue Kontaktanfrage",
};

const esc = (v) => String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function mailHtml(lead, routed) {
  const label = LABELS[lead.type] || oneLine(lead.type);
  const headline = HEADLINES[lead.type] || "Neue Anfrage";
  const skip = new Set(["type", "ts", "page", "nachricht"]);
  const order = ["name", "email", "rolle"];
  const keys = [...order.filter((k) => lead[k] != null), ...Object.keys(lead).filter((k) => !skip.has(k) && !order.includes(k))];
  const rows = keys.map((k, i) => `
    <tr><td style="padding:${i === 0 ? "16px" : "13px"} 20px ${i === keys.length - 1 ? "16px" : "13px"}; ${i < keys.length - 1 ? "border-bottom:1px solid #EDEAE2;" : ""}">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="font-family:${MONO}; font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#8A857C; vertical-align:top; width:42%;">${esc(k)}</td>
        <td align="right" style="font-family:${DISPLAY}; font-size:14px; color:#0B0A09; word-break:break-word;">${esc(typeof lead[k] === "string" ? lead[k] : JSON.stringify(lead[k]))}</td>
      </tr></table>
    </td></tr>`).join("");
  const nachricht = lead.nachricht ? `
    <tr><td style="padding:22px 40px 0;">
      <div style="font-family:${MONO}; font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#8A857C; padding-bottom:8px;">NACHRICHT</div>
      <div style="font-family:${DISPLAY}; font-size:15px; line-height:1.6; color:#1B1A16; background-color:#FDFCFA; border:1px solid #E3DFD6; border-radius:12px; padding:16px 18px; white-space:pre-wrap;">${esc(lead.nachricht)}</div>
    </td></tr>` : "";
  const mailto = `mailto:${encodeURIComponent(oneLine(lead.email))}?subject=${encodeURIComponent("Re: Deine Anfrage bei UNIO")}`;
  return `<!DOCTYPE html>
<html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><meta name="supported-color-schemes" content="light"><title>UNIO</title></head>
<body style="margin:0; padding:0; background-color:#F0EDE6; word-spacing:normal;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F0EDE6;">
<tr><td align="center" style="padding:26px 12px 36px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px; max-width:600px;">
  <tr><td style="padding:6px 8px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td align="left" style="vertical-align:middle;"><img src="${ORIGIN}/assets/logo/unio-logo-black.png" width="72" height="18" alt="UNIO" style="display:block; width:72px; height:18px;"></td>
      <td align="right" style="vertical-align:middle; font-family:${MONO}; font-size:10px; letter-spacing:2px; text-transform:uppercase; color:#8A857C;">WEBSITE-LEAD&nbsp;&middot;&nbsp;${esc(label.toUpperCase())}</td>
    </tr></table>
  </td></tr>
  <tr><td style="background-color:#F7F5F1; border:1px solid #E3DFD6; border-radius:18px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
      <tr><td style="padding:36px 40px 0;">
        <div style="font-family:${MONO}; font-size:10px; letter-spacing:2.2px; text-transform:uppercase; color:#B87400; padding-bottom:14px;">ROUTING&nbsp;&middot;&nbsp;${esc(routed.toUpperCase())}</div>
        <div style="font-family:${DISPLAY}; font-weight:500; font-size:31px; line-height:1.08; letter-spacing:-0.8px; color:#0B0A09;">${esc(headline)}<span style="color:#FFAA09;">.</span></div>
        <div style="font-family:${DISPLAY}; font-size:14.5px; line-height:1.6; color:#5F5A54; padding-top:12px;">&Uuml;ber die Website eingegangen&nbsp;&middot;&nbsp;Seite ${esc(lead.page || "?")}&nbsp;&middot;&nbsp;${esc(lead.ts || new Date().toISOString())}</div>
      </td></tr>
      <tr><td style="padding:24px 40px 0;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FDFCFA; border:1px solid #E3DFD6; border-radius:14px;">${rows}</table>
      </td></tr>
      ${nachricht}
      <tr><td style="padding:26px 40px 36px;">
        <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
          <td bgcolor="#FFAA09" style="border-radius:12px;"><a href="${mailto}" style="display:inline-block; padding:14px 26px; font-family:${DISPLAY}; font-weight:500; font-size:14.5px; color:#1A1305; text-decoration:none; border-radius:12px;">Antworten</a></td>
          <td style="padding-left:16px; font-family:${DISPLAY}; font-size:13px; color:#5F5A54;">Antwort geht direkt an ${esc(oneLine(lead.email))}</td>
        </tr></table>
      </td></tr>
    </table>
  </td></tr>
  <tr><td style="padding-top:12px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0B0A09; border-radius:16px;">
      <tr><td style="padding:22px 40px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
          <td style="vertical-align:middle;"><img src="${ORIGIN}/assets/logo/unio-logo-white.png" width="56" height="14" alt="UNIO" style="display:block; width:56px; height:14px;"></td>
          <td align="right" style="vertical-align:middle; font-family:${MONO}; font-size:9px; letter-spacing:1.8px; text-transform:uppercase; color:#8A857C;">MOVE AS ONE&nbsp;&middot;&nbsp;INTERNE BENACHRICHTIGUNG</td>
        </tr></table>
      </td></tr>
    </table>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "method not allowed" });
  }
  const lead = req.body || {};
  if (!lead.type || !lead.email) {
    return res.status(400).json({ ok: false, error: "type und email sind Pflichtfelder" });
  }

  const routed = recipient(lead);
  const to = TEST_EMPFAENGER || routed;
  console.log("UNIO_LEAD", to, JSON.stringify(lead));

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const oauth = process.env.GMAIL_CLIENT_ID && process.env.GMAIL_CLIENT_SECRET && process.env.GMAIL_REFRESH_TOKEN;
  if (!user || (!pass && !oauth)) {
    console.warn("UNIO_LEAD_MAIL_SKIPPED: Env-Vars fehlen. Entweder GMAIL_USER + GMAIL_CLIENT_ID + GMAIL_CLIENT_SECRET + GMAIL_REFRESH_TOKEN (OAuth) oder GMAIL_USER + GMAIL_APP_PASSWORD setzen (Vercel > Settings > Environment Variables).");
    return res.status(200).json({ ok: true, delivered: false });
  }
  const auth = oauth
    ? { type: "OAuth2", user, clientId: process.env.GMAIL_CLIENT_ID, clientSecret: process.env.GMAIL_CLIENT_SECRET, refreshToken: process.env.GMAIL_REFRESH_TOKEN }
    : { user, pass };

  const lines = Object.entries(lead)
    .filter(([k]) => k !== "type" && k !== "ts")
    .map(([k, v]) => `${k}: ${typeof v === "string" ? v : JSON.stringify(v)}`);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth,
    });
    await transporter.sendMail({
      from: `"UNIO Website" <${user}>`,
      to,
      cc: KOPIE,
      replyTo: typeof lead.email === "string" ? oneLine(lead.email) : undefined,
      subject: `Website-Lead: ${LABELS[lead.type] || oneLine(lead.type)}${lead.name ? " von " + oneLine(lead.name) : ""}`,
      text:
        `Neuer Lead ueber die UNIO Website\n` +
        `Seite: ${lead.page || "?"}\nZeitpunkt: ${lead.ts || new Date().toISOString()}\nEmpfaenger-Routing: ${routed}${TEST_EMPFAENGER ? ` (Testbetrieb: zugestellt an ${TEST_EMPFAENGER})` : ""}\n\n` +
        lines.join("\n") + "\n",
      html: mailHtml(lead, routed),
    });
    return res.status(200).json({ ok: true, delivered: true });
  } catch (err) {
    console.error("UNIO_LEAD_MAIL_ERROR", err && err.message);
    return res.status(502).json({ ok: false, error: "mail delivery failed" });
  }
}
