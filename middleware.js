/* Passwortschutz fuer die UX-Vorschauen unter /ux/* (HTTP Basic Auth, Vercel Edge Middleware).
   Benutzername beliebig. Das Passwort steht nicht im Code, sondern in der Umgebungsvariable UX_PASSWORT
   (Vercel > Settings > Environment Variables, fuer Production und Preview, danach neu deployen).
   Ohne gesetzte Variable bleibt /ux gesperrt (503). Einen Rueckfall auf einen festen Wert gibt es nicht. */
export const config = { matcher: "/ux/:path*" };

const KEIN_CACHE = { "Cache-Control": "no-store" };

/* Passwort aus "Basic <base64(name:passwort)>", als UTF-8 gelesen (Umlaute und Sonderzeichen bleiben erhalten) */
function passwortAus(header) {
  if (!/^basic /i.test(header)) return null;
  try {
    const roh = atob(header.slice(6).trim());
    const text = new TextDecoder().decode(Uint8Array.from(roh, (c) => c.charCodeAt(0)));
    const i = text.indexOf(":");
    return i < 0 ? null : text.slice(i + 1);
  } catch (e) { return null; }
}

/* Vergleich ohne fruehen Abbruch: Die Dauer haengt nur von der Eingabe ab, nicht vom richtigen Passwort */
function gleich(eingabe, soll) {
  const a = new TextEncoder().encode(eingabe), b = new TextEncoder().encode(soll);
  if (!b.length) return false;
  let d = a.length ^ b.length;
  for (let i = 0; i < a.length; i++) d |= a[i] ^ b[i % b.length];
  return d === 0;
}

export default function middleware(request) {
  const soll = process.env.UX_PASSWORT || "";
  if (!soll) {
    return new Response("UX-Vorschau gesperrt: Die Umgebungsvariable UX_PASSWORT ist nicht gesetzt.", { status: 503, headers: KEIN_CACHE });
  }
  const eingabe = passwortAus(request.headers.get("authorization") || "");
  if (eingabe !== null && gleich(eingabe, soll)) return;
  return new Response("Zugriff geschuetzt. Bitte mit Passwort anmelden.", {
    status: 401,
    headers: { ...KEIN_CACHE, "WWW-Authenticate": 'Basic realm="UNIO UX-Vorschau", charset="UTF-8"' },
  });
}
