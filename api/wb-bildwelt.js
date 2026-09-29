/* Werkbank: Warteschlange für Bildwelt-Aufträge an Higgsfield (Vercel Serverless Function, Node, ESM).
   Protokoll: docs/werkbank/BILDWELT_BRUECKE.md. Die Werkbank legt Aufträge ab, eine geplante Claude-Routine
   mit Higgsfield-Connector holt sie, erzeugt und schreibt das Ergebnis zurück. Kein Higgsfield-Schlüssel hier.

   Team (Browser, über /ux/api/bildwelt, Basic Auth wie middleware.js):
     GET  ?aktion=status                 { ok, bereit, worker: { zuletzt }, monat: { credits, budget } }
     POST { aktion: "auftrag", auftrag } { ok, id, status: "offen" }   wb-bildwelt/1
     GET  ?aktion=auftrag&id=bw-...      { ok, status, ergebnis? }
   Routine (Header x-wb-token = WB_WORKER_TOKEN):
     GET  ?aktion=offen                  { ok, auftraege: [...] }  setzt status "in_arbeit"
     POST { aktion: "ergebnis", ergebnis }  wb-bildwelt-ergebnis/1, setzt "fertig"
     POST { aktion: "fehler", id, grund }

   Umgebung (Vercel > Settings > Environment Variables):
     KV_REST_API_URL, KV_REST_API_TOKEN  Upstash Redis (Vercel Marketplace, legt beide selbst an)
     WB_WORKER_TOKEN                     langer Zufallswert, derselbe in der Routine
     WB_BW_MONATSBUDGET                  optional, Credits pro Monat, Standard 150
     UX_PASSWORT                         optional, sonst das Passwort aus middleware.js */

const PASSWORT = process.env.UX_PASSWORT || "UnioUX";
const KV_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const KV_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";
const WORKER = process.env.WB_WORKER_TOKEN || "";
const BUDGET = Number(process.env.WB_BW_MONATSBUDGET || 150);
const TAGE_90 = 90 * 24 * 3600;

async function kv(...befehl) {
  const r = await fetch(KV_URL, { method: "POST", headers: { Authorization: `Bearer ${KV_TOKEN}`, "Content-Type": "application/json" }, body: JSON.stringify(befehl) });
  const j = await r.json();
  if (j.error) throw new Error(j.error);
  return j.result;
}
const lesen = async (k) => { const v = await kv("GET", k); return v ? JSON.parse(v) : null; };
const schreiben = (k, v) => kv("SET", k, JSON.stringify(v), "EX", TAGE_90);
const monat = () => new Date().toISOString().slice(0, 7);

function team(req) {
  const auth = String(req.headers.authorization || "");
  if (!auth.startsWith("Basic ")) return false;
  try { const d = Buffer.from(auth.slice(6), "base64").toString("utf8"); return d.slice(d.indexOf(":") + 1) === PASSWORT; } catch (e) { return false; }
}
const routine = (req) => !!WORKER && String(req.headers["x-wb-token"] || "") === WORKER;

function pruefeAuftrag(a) {
  if (!a || a.schema !== "wb-bildwelt/1") return "schema wb-bildwelt/1 fehlt";
  if (!/^bw-[a-z0-9]{4,20}$/.test(a.id || "")) return "id ungültig";
  if (!a.makler || !a.makler.id) return "makler fehlt";
  if (!Array.isArray(a.motive) || !a.motive.length || a.motive.length > 12) return "1 bis 12 Motive";
  if (a.motive.some((m) => !m.prompt || m.prompt.length > 4000)) return "Prompt fehlt oder zu lang";
  if (!(a.varianten >= 1 && a.varianten <= 3)) return "varianten 1 bis 3";
  if (!["gpt_image_2_5", "soul_2"].includes(a.modell)) return "Modell nicht freigegeben";
  return null;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");
  const q = req.query || {};
  const body = typeof req.body === "string" ? (() => { try { return JSON.parse(req.body); } catch (e) { return {}; } })() : (req.body || {});
  const aktion = q.aktion || body.aktion;
  const istRoutine = routine(req);
  if (!istRoutine && !team(req)) { res.setHeader("WWW-Authenticate", 'Basic realm="UNIO UX-Vorschau", charset="UTF-8"'); return res.status(401).json({ ok: false, fehler: "Passwort fehlt" }); }
  if (!KV_URL || !KV_TOKEN) return res.status(503).json({ ok: false, bereit: false, fehler: "Speicher fehlt: Upstash Redis in Vercel verbinden" });
  try {
    if (req.method === "GET" && aktion === "status") {
      const zuletzt = await kv("GET", "wb:bw:worker");
      const credits = Number((await kv("GET", "wb:bw:monat:" + monat())) || 0);
      return res.json({ ok: true, bereit: !!WORKER, worker: { zuletzt: zuletzt ? Number(zuletzt) : null }, monat: { credits, budget: BUDGET } });
    }
    if (req.method === "POST" && aktion === "auftrag" && !istRoutine) {
      const a = body.auftrag; const f = pruefeAuftrag(a);
      if (f) return res.status(400).json({ ok: false, fehler: f });
      const credits = Number((await kv("GET", "wb:bw:monat:" + monat())) || 0);
      if (credits + Number(a.budget_credits || 0) > BUDGET) return res.status(402).json({ ok: false, fehler: `Monatsbudget erreicht (${credits} von ${BUDGET} Credits)` });
      if (await kv("EXISTS", "wb:bw:a:" + a.id)) return res.json({ ok: true, id: a.id, status: "doppelt" });
      await schreiben("wb:bw:a:" + a.id, { auftrag: a, status: "offen", erstellt: Date.now() });
      await kv("RPUSH", "wb:bw:offen", a.id);
      return res.json({ ok: true, id: a.id, status: "offen" });
    }
    if (req.method === "GET" && aktion === "auftrag") {
      const e = await lesen("wb:bw:a:" + String(q.id || ""));
      if (!e) return res.status(404).json({ ok: false, fehler: "unbekannt" });
      return res.json({ ok: true, status: e.status, ergebnis: e.ergebnis || null, grund: e.grund || null });
    }
    if (!istRoutine) return res.status(403).json({ ok: false, fehler: "Nur für die Routine" });
    await kv("SET", "wb:bw:worker", String(Date.now()));
    if (req.method === "GET" && aktion === "offen") {
      const ids = []; for (let i = 0; i < 5; i++) { const id = await kv("LPOP", "wb:bw:offen"); if (!id) break; ids.push(id); }
      const auftraege = [];
      for (const id of ids) { const e = await lesen("wb:bw:a:" + id); if (!e) continue; e.status = "in_arbeit"; e.start = Date.now(); await schreiben("wb:bw:a:" + id, e); auftraege.push(e.auftrag); }
      return res.json({ ok: true, auftraege, budget: { rest: BUDGET - Number((await kv("GET", "wb:bw:monat:" + monat())) || 0) } });
    }
    if (req.method === "POST" && aktion === "ergebnis") {
      const r = body.ergebnis;
      if (!r || r.schema !== "wb-bildwelt-ergebnis/1" || !r.auftrag) return res.status(400).json({ ok: false, fehler: "schema wb-bildwelt-ergebnis/1 fehlt" });
      const e = await lesen("wb:bw:a:" + r.auftrag); if (!e) return res.status(404).json({ ok: false, fehler: "unbekannt" });
      e.status = "fertig"; e.ergebnis = r; e.fertig = Date.now(); await schreiben("wb:bw:a:" + r.auftrag, e);
      if (r.credits) await kv("INCRBYFLOAT", "wb:bw:monat:" + monat(), String(r.credits));
      return res.json({ ok: true });
    }
    if (req.method === "POST" && aktion === "fehler") {
      const e = await lesen("wb:bw:a:" + String(body.id || "")); if (!e) return res.status(404).json({ ok: false, fehler: "unbekannt" });
      e.status = "fehler"; e.grund = String(body.grund || "").slice(0, 300); await schreiben("wb:bw:a:" + body.id, e);
      return res.json({ ok: true });
    }
    return res.status(400).json({ ok: false, fehler: "unbekannte Aktion" });
  } catch (err) {
    console.error("WB_BILDWELT_FEHLER", err && err.message);
    return res.status(502).json({ ok: false, fehler: "Speicher nicht erreichbar" });
  }
}
