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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "method not allowed" });
  }
  const lead = req.body || {};
  if (!lead.type || !lead.email) {
    return res.status(400).json({ ok: false, error: "type und email sind Pflichtfelder" });
  }

  const to = recipient(lead);
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
      replyTo: typeof lead.email === "string" ? oneLine(lead.email) : undefined,
      subject: `Website-Lead: ${LABELS[lead.type] || oneLine(lead.type)}${lead.name ? " von " + oneLine(lead.name) : ""}`,
      text:
        `Neuer Lead ueber die UNIO Website\n` +
        `Seite: ${lead.page || "?"}\nZeitpunkt: ${lead.ts || new Date().toISOString()}\nEmpfaenger-Routing: ${to}\n\n` +
        lines.join("\n") + "\n",
    });
    return res.status(200).json({ ok: true, delivered: true });
  } catch (err) {
    console.error("UNIO_LEAD_MAIL_ERROR", err && err.message);
    return res.status(502).json({ ok: false, error: "mail delivery failed" });
  }
}
