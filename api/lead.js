/* UNIO Lead-Endpoint (Vercel Serverless Function).
   Nimmt alle Website-Formulare entgegen (type: kontakt | projekt | bewerbung | simulator-pdf).
   WICHTIG: Hier muss noch ein Mail- oder CRM-Provider angebunden werden
   (z. B. Resend an office@unio.at oder HubSpot). Bis dahin sind Leads nur
   im Vercel-Log der Function sichtbar (Dashboard > Functions > Logs). */
export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "method not allowed" });
  }
  const lead = req.body || {};
  if (!lead.type || !lead.email) {
    return res.status(400).json({ ok: false, error: "type und email sind Pflichtfelder" });
  }
  console.log("UNIO_LEAD", JSON.stringify(lead));
  return res.status(200).json({ ok: true });
}
