/* Passwortschutz fuer die UX-Vorschauen unter /ux/* (HTTP Basic Auth, Vercel Edge Middleware).
   Benutzername beliebig, Passwort: UnioUX */
export const config = { matcher: "/ux/:path*" };

export default function middleware(request) {
  const auth = request.headers.get("authorization") || "";
  if (auth.startsWith("Basic ")) {
    try {
      const decoded = atob(auth.slice(6));
      const pass = decoded.slice(decoded.indexOf(":") + 1);
      if (pass === "UnioUX") return;
    } catch (e) { /* ungueltiger Header -> 401 */ }
  }
  return new Response("Zugriff geschuetzt. Bitte mit Passwort anmelden.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="UNIO UX-Vorschau", charset="UTF-8"' },
  });
}
