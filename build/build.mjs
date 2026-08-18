/* UNIO Build-Pipeline: Precompile (esbuild) + Prerender (puppeteer-core/Chrome)
   + saubere URLs + Meta/OG/Schema + robots/sitemap → dist/.
   Aufruf:  node build/build.mjs            (voller Build)
            node build/build.mjs --no-prerender   (ohne Snapshots, schneller)
   Voraussetzungen: Node >= 20, Google Chrome installiert (nur für Prerender). */
import { build as _noop } from "esbuild";
import { transform } from "esbuild";
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import http from "node:http";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "ui_kits", "homepage");
const DIST = join(ROOT, "dist");
const NO_PRERENDER = process.argv.includes("--no-prerender");

/* Kanonische Domain (seit Aug 2026 live auf unio.at). */
const ORIGIN = "https://www.unio.at";

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": ["Organization", "RealEstateAgent"],
  name: "UNIO",
  url: ORIGIN,
  logo: ORIGIN + "/assets/logo/unio-icon.png",
  email: "office@unio.at",
  address: { "@type": "PostalAddress", streetAddress: "Kärntnerstraße 12", postalCode: "1010", addressLocality: "Wien", addressCountry: "AT" },
  areaServed: "Wien",
  description: "UNIO ist das AI-native Operating System für Immobilienvertrieb: Markttest, Performance-Marketing, kuratierte Makler-Community und Live-Dashboard in einer Plattform.",
};

const PAGES = [
  {
    src: "index.html", out: "index.html", path: "/",
    title: "UNIO | Immobilienvertrieb Wien: Der Markt wird lesbar",
    description: "UNIO verbindet Daten, Software und Menschen zu einem Betriebssystem für Immobilienvertrieb in Wien: kuratierte Objekte, Markttest vor Baustart, Live-Transparenz für Eigentümer und Bauträger.",
    og: "/assets/img/vienna-facades.jpg",
    preload: ["/assets/img/vienna-facades.jpg"],
  },
  {
    src: "makler.html", out: "makler.html", path: "/makler",
    title: "Makler Community Wien: CIRCLE von UNIO | 100 % Provision",
    description: "Die höchste Provisionsbeteiligung am Markt: 85 % ab dem ersten Deal, 100 % ab 150.000 Euro Jahresumsatz. Dazu kuratierter Dealflow, Personal Branding und echte Beteiligung. Jetzt als UNIO Partner bewerben.",
    og: "/assets/team/gruppe-serioes.jpg",
  },
  {
    src: "bautraeger.html", out: "bautraeger.html", path: "/bautraeger",
    title: "Bauträger Vermarktung Wien: Marketing & Vertrieb als System | UNIO",
    description: "Neubauprojekte und Bestands-Abverkauf mit einem System: Performance-Kampagnen, kuratierter Maklervertrieb (CIRCLE) und Live-Steuerung in LENS. 100 % erfolgsbasiert, kein Retainer.",
    og: "/assets/img/albrechts-fassade.jpg",
  },
  {
    src: "immobilien.html", out: "immobilien.html", path: "/immobilien",
    noindex: true, /* AKTIV: /immobilien leitet via vercel.json in die App weiter */
    title: "Immobilie kaufen oder verkaufen in Wien | UNIO",
    description: "Kuratierte Wiener Objekte mit Kartenansicht und Live-Vermarktung. Für Eigentümer: datenbasierte Bewertung, passende Käufer und volle Transparenz bis zum Notar.",
    og: "/assets/img/penthouse.jpg",
  },
  {
    src: "story.html", out: "story.html", path: "/story",
    title: "Die UNIO Story: Fünf Unternehmen, eine Mission | UNIO",
    description: "Move as one: Wie Vertrieb, Marketing und Technologie 2026 zu UNIO fusionierten. Acht Gründer, drei Disziplinen, ein Betriebssystem.",
    og: "/assets/team/gruppe-serioes.jpg",
    extraSchema: () => ([{
      "@context": "https://schema.org", "@type": "AboutPage", name: "Die UNIO Story", url: ORIGIN + "/story",
    }]),
  },
  {
    src: "kontakt.html", out: "kontakt.html", path: "/kontakt",
    title: "Kontakt: Demo buchen oder Projekt besprechen | UNIO",
    description: "Sprechen wir: Antwort innerhalb von 48 Stunden, mit einer ersten Einschätzung statt Floskeln. Demo durch LENS, Immobilienbewertung oder CIRCLE-Bewerbung.",
    og: "/assets/img/vienna-street.jpg",
  },
  {
    src: "projekt.html", out: "projekt.html", path: "/projekt",
    title: "Traum Penthouse in Hernals | UNIO",
    description: "Penthouse mit 140,95 m², 51 m² Außenflächen und Blick auf Kahlenberg und Stephansdom. Demo-Objektseite mit Live-Marktdaten.",
    og: "/assets/img/penthouse.jpg",
    noindex: true, static: true,
  },
  { src: "agb.html", out: "agb.html", path: "/agb", title: "Allgemeine Geschäftsbedingungen | UNIO", description: "Allgemeine Geschäftsbedingungen der UNIO Immobilienvermittlung.", noindex: true, static: true },
  { src: "impressum.html", out: "impressum.html", path: "/impressum", title: "Impressum | UNIO", description: "Impressum der UNIO Website.", noindex: true, static: true },
  { src: "datenschutz.html", out: "datenschutz.html", path: "/datenschutz", title: "Datenschutzerklärung | UNIO", description: "Datenschutzerklärung der UNIO Website.", noindex: true, static: true },
];

/* Wissens-Hub: statische Seiten unter /wissen (werden separat gepflegt) */
const WISSEN_DIR = join(ROOT, "wissen");

const JSX_FILES = ["site-shared.jsx", "bento.jsx", "strecke.jsx", "bt-system.jsx", "homepage.jsx", "page-makler.jsx", "page-bautraeger.jsx", "page-immobilien.jsx", "page-story.jsx", "page-kontakt.jsx"];

/* interne Links + Asset-Pfade auf saubere URLs umschreiben */
function rewriteUrls(s) {
  s = s.replaceAll("../../assets/", "/assets/");
  s = s.replaceAll("../../styles.css", "/styles.css");
  s = s.replaceAll("../../_ds_bundle.js", "/assets/js/_ds_bundle.js");
  s = s.replace(/(?<![\w/])index\.html/g, "/");
  s = s.replace(/\b(makler|bautraeger|immobilien|story|kontakt|projekt|impressum|datenschutz|agb)\.html/g, "/$1");
  s = s.replaceAll('href="/#', 'href="/#');
  return s;
}

/* React dev-CDN → production */
function productionReact(s) {
  return s
    .replace(/react@18\.3\.1\/umd\/react\.development\.js"[^>]*/, 'react@18.3.1/umd/react.production.min.js" crossorigin="anonymous"')
    .replace(/react-dom@18\.3\.1\/umd\/react-dom\.development\.js"[^>]*/, 'react-dom@18.3.1/umd/react-dom.production.min.js" crossorigin="anonymous"');
}

function metaBlock(p) {
  const canonical = ORIGIN + (p.path === "/" ? "/" : p.path);
  const og = p.og ? ORIGIN + p.og : ORIGIN + "/assets/img/vienna-facades.jpg";
  const robots = p.noindex ? '<meta name="robots" content="noindex, follow">' : '<meta name="robots" content="index, follow">';
  const schemas = [ORG_SCHEMA, ...(p.extraSchema ? p.extraSchema() : [])];
  return [
    `<meta name="description" content="${p.description.replaceAll('"', "&quot;")}">`,
    robots,
    `<link rel="canonical" href="${canonical}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="UNIO">`,
    `<meta property="og:locale" content="de_AT">`,
    `<meta property="og:title" content="${p.title.replaceAll('"', "&quot;")}">`,
    `<meta property="og:description" content="${p.description.replaceAll('"', "&quot;")}">`,
    `<meta property="og:url" content="${canonical}">`,
    `<meta property="og:image" content="${og}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    ...(p.preload || []).map((u) => `<link rel="preload" as="image" href="${u}">`),
    ...schemas.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`),
  ].join("\n");
}

async function main() {
  rmSync(DIST, { recursive: true, force: true });
  mkdirSync(join(DIST, "assets", "js"), { recursive: true });

  /* 1) JSX precompilen (Babel entfällt im Browser) */
  for (const f of JSX_FILES) {
    const src = readFileSync(join(SRC, f), "utf8");
    const out = await transform(src, { loader: "jsx", jsx: "transform", target: "es2018", minify: true });
    /* IIFE-Wrapper: Babel-standalone gab jeder Datei einen eigenen Scope,
       als klassische Scripts würden top-level consts sonst global kollidieren. */
    writeFileSync(join(DIST, "assets", "js", f.replace(".jsx", ".js")), "(()=>{" + rewriteUrls(out.code) + "})();");
  }
  console.log("✓ JSX precompiled:", JSX_FILES.length, "Dateien");

  /* 2) Assets + Styles + Bundle */
  cpSync(join(ROOT, "assets"), join(DIST, "assets"), { recursive: true });
  cpSync(join(ROOT, "styles.css"), join(DIST, "styles.css"));
  cpSync(join(ROOT, "tokens"), join(DIST, "tokens"), { recursive: true });
  cpSync(join(ROOT, "_ds_bundle.js"), join(DIST, "assets", "js", "_ds_bundle.js"));
  console.log("✓ Assets kopiert");

  /* 3) HTML-Seiten transformieren */
  for (const p of PAGES) {
    let s = readFileSync(join(SRC, p.src), "utf8");
    s = productionReact(s);
    s = rewriteUrls(s);
    /* Babel raus, kompilierte Skripte rein */
    s = s.replace(/<script src="https:\/\/unpkg\.com\/@babel\/standalone[^>]*><\/script>\n?/, "");
    s = s.replace(/<script type="text\/babel" src="([a-z-]+)\.jsx"><\/script>/g, '<script src="/assets/js/$1.js"></script>');
    /* Titel + Meta */
    s = s.replace(/<title>[\s\S]*?<\/title>/, `<title>${p.title}</title>`);
    /* bestehende noindex-Zeile der statischen Rechtsseiten nicht doppeln */
    s = s.replace(/<meta name="robots"[^>]*>\n?/g, "");
    s = s.replace("</head>", metaBlock(p) + "\n</head>");
    writeFileSync(join(DIST, p.out), s);
  }
  console.log("✓ Seiten transformiert:", PAGES.length);

  /* 3b) Wissens-Hub kopieren (bereits mit absoluten Pfaden geschrieben) */
  if (existsSync(WISSEN_DIR)) {
    cpSync(WISSEN_DIR, join(DIST, "wissen"), { recursive: true });
    console.log("✓ Wissens-Hub kopiert");
  }

  /* 3c) Showcase-Seiten (Partner-Page-Varianten): unverlinkt, noindex,
        bewusst NICHT in der Sitemap. Self-contained, flach nach dist/
        -> /homepages, /showcase1 ... /showcase7 via cleanUrls. */
  const SHOWCASE_DIR = join(ROOT, "showcase");
  if (existsSync(SHOWCASE_DIR)) {
    for (const f of readdirSync(SHOWCASE_DIR).filter((f) => f.endsWith(".html"))) {
      cpSync(join(SHOWCASE_DIR, f), join(DIST, f));
    }
    console.log("✓ Showcase-Seiten kopiert (nicht in Sitemap)");
  }

  /* 3e) Unverlinkte Sonderseiten (z. B. Mail-Sequenzen): flach nach dist/,
        selbst noindex, bewusst NICHT in der Sitemap. */
  const EXTRA_DIR = join(ROOT, "extra");
  if (existsSync(EXTRA_DIR)) {
    for (const f of readdirSync(EXTRA_DIR).filter((f) => f.endsWith(".html"))) {
      cpSync(join(EXTRA_DIR, f), join(DIST, f));
    }
    console.log("✓ Sonderseiten kopiert (nicht in Sitemap)");
  }

  /* 3d) Social-Vorschau (unverlinkt, noindex): Galerie + Exporte */
  if (existsSync(join(ROOT, "social", "preview.html"))) {
    cpSync(join(ROOT, "social", "preview.html"), join(DIST, "social-preview.html"));
    cpSync(join(ROOT, "social", "exports"), join(DIST, "social-exports"), { recursive: true });
    console.log("✓ Social-Vorschau kopiert (nicht in Sitemap)");
  }

  /* 3f) Passwortgeschuetzte UX-Vorschauen unter /ux/* (Schutz: middleware.js, Passwort UnioUX):
        Dashboard-Backend + Objekt-Detailseite, dev-style mit Babel zur Laufzeit. */
  const BUILD_STAMP = Date.now().toString(36);
  const UX_KITS = [["ux-hub", ""], ["dashboard", "backend"], ["objektseite", "objekt"], ["projektseite", "projekt"], ["explore", "explore"]];
  for (const [kit, out] of UX_KITS) {
    const kitDir = join(ROOT, "ui_kits", kit);
    if (!existsSync(kitDir)) continue;
    const outDir = join(DIST, "ux", out);
    mkdirSync(outDir, { recursive: true });
    for (const f of readdirSync(kitDir).filter((f) => f.endsWith(".html") || f.endsWith(".jsx"))) {
      let s = readFileSync(join(kitDir, f), "utf8");
      /* Einheiten-Links der Projekt-Ueberseite bleiben in der geschuetzten UX-Vorschau */
      s = s.replaceAll('href="projekt.html"', 'href="/ux/objekt"');
      s = rewriteUrls(s);
      s = s.replaceAll("../homepage/site-shared.jsx", "site-shared.jsx");
      /* JSX-Pfade absolut machen: Vercel liefert /ux/backend ohne Slash aus,
         relative Pfade wuerden sonst gegen /ux/ aufgeloest (404, weisse Seite).
         Der Build-Stempel bricht Browser-Caches: die UX-Vorschauen laufen mit
         Runtime-Babel, ohne Stempel liefern Browser nach Deploys alte JSX aus. */
      if (f.endsWith(".html")) s = s.replace(/src="([a-zA-Z0-9_.-]+\.jsx)"/g, `src="/ux/${out}/$1?v=${BUILD_STAMP}"`);
      writeFileSync(join(outDir, f), s);
    }
    if (kit === "property") {
      writeFileSync(join(outDir, "site-shared.jsx"), rewriteUrls(readFileSync(join(SRC, "site-shared.jsx"), "utf8")));
    }
  }
  console.log("\u2713 UX-Vorschauen nach /ux (Passwortschutz via middleware.js)");

  /* 4) robots.txt + sitemap.xml + llms.txt
        KI-Crawler explizit erlauben: rein deklarativ (Allow: / gilt ohnehin),
        signalisiert aber Offenheit gegenueber AI-Answer-Engines (GEO). */
  const AI_BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-User", "Claude-SearchBot", "PerplexityBot", "Perplexity-User", "Google-Extended", "Applebot-Extended", "meta-externalagent", "Amazonbot", "cohere-ai", "MistralAI-User"];
  writeFileSync(join(DIST, "robots.txt"),
    `User-agent: *\nAllow: /\n\n` +
    AI_BOTS.map((b) => `User-agent: ${b}\nAllow: /\n`).join("\n") +
    `\nSitemap: ${ORIGIN}/sitemap.xml\n`);

  /* llms.txt: Markdown-Wegweiser fuer LLM-Agenten (llmstxt.org-Konvention) */
  const wissenLinks = existsSync(WISSEN_DIR)
    ? readdirSync(WISSEN_DIR).filter((f) => f.endsWith(".html") && f !== "index.html").map((f) => {
        const html = readFileSync(join(WISSEN_DIR, f), "utf8");
        const title = (html.match(/<title>([^<]*)<\/title>/) || [, f])[1].replace(" | UNIO", "");
        const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [, ""])[1];
        return `- [${title}](${ORIGIN}/wissen/${f.replace(".html", "")}): ${desc}`;
      })
    : [];
  writeFileSync(join(DIST, "llms.txt"), `# UNIO

> UNIO ist das AI-native Operating System für Immobilienvertrieb in Wien: Markttest vor Baustart (NOVA), Performance-Marketing, kuratierte Makler-Community (CIRCLE, 85 % Provision ab Deal 1, 100 % ab 150.000 Euro Jahresumsatz) und Live-Dashboard für Bauträger (LENS) in einer Plattform. Kontakt: office@unio.at, Kärntnerstraße 12, 1010 Wien.

Wichtig: UNIO ist keine klassische Immobilienagentur und keine offene Plattform, sondern ein kuratiertes System aus Software, Marketing und Menschen. Die Makler-Community CIRCLE bietet die höchste Provisionsbeteiligung am Markt (bis 100 %, Arbeitsstand).

## Seiten

${PAGES.filter((p) => !p.noindex).map((p) => `- [${p.title.replace(" | UNIO", "")}](${ORIGIN}${p.path === "/" ? "/" : p.path}): ${p.description}`).join("\n")}
- [UNIO Wissen: Immobilien-Ratgeber](${ORIGIN}/wissen): Recherchierte Ratgeber zu Immobilienverkauf, Maklerprovision und Bauträger-Vermarktung in Österreich.

## Wissen (Ratgeber)

${wissenLinks.join("\n")}

## Fakten

- Makler im CIRCLE behalten 85 % der Provision ab dem ersten Deal und 100 % ab 150.000 Euro Jahresumsatz (fixer Software-Beitrag statt Split, Arbeitsstand).
- UNIO-Gründungsteam: 300+ Mio Euro vermitteltes Volumen, 1 Mrd+ erzielte Reichweite, 25+ Makler im CIRCLE.
- Für Bauträger arbeitet UNIO 100 % erfolgsbasiert, ohne Retainer, mit Live-Transparenz im LENS-Dashboard.
- Immobiliensuche und Login laufen unter https://app.unio.at.
`);
  const today = new Date().toISOString().slice(0, 10);
  const urls = PAGES.filter((p) => !p.noindex).map((p) => p.path);
  if (existsSync(WISSEN_DIR)) {
    for (const f of readdirSync(WISSEN_DIR).filter((f) => f.endsWith(".html"))) {
      urls.push(f === "index.html" ? "/wissen" : "/wissen/" + f.replace(".html", ""));
    }
  }
  writeFileSync(join(DIST, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${ORIGIN}${u === "/" ? "/" : u}</loc><lastmod>${today}</lastmod></url>`).join("\n") +
    `\n</urlset>\n`);
  console.log("✓ robots.txt + sitemap.xml");

  /* 5) Prerender: Chrome lädt jede React-Seite mit prefers-reduced-motion,
        der gerenderte Root-Inhalt wandert als statisches HTML in die Datei.
        React übernimmt den Container beim Laden (createRoot ersetzt Inhalt). */
  if (!NO_PRERENDER) {
    const puppeteer = (await import("puppeteer-core")).default;
    const server = http.createServer((req, res) => {
      let url = req.url.split("?")[0];
      if (url === "/") url = "/index.html";
      if (!url.includes(".") && existsSync(join(DIST, url + ".html"))) url += ".html";
      const file = join(DIST, decodeURIComponent(url));
      try {
        const body = readFileSync(file);
        const mime = url.endsWith(".html") ? "text/html" : url.endsWith(".css") ? "text/css" : url.endsWith(".js") ? "text/javascript" : url.endsWith(".svg") ? "image/svg+xml" : "application/octet-stream";
        res.writeHead(200, { "Content-Type": mime });
        res.end(body);
      } catch (e) { res.writeHead(404); res.end(); }
    }).listen(4899);

    const browser = await puppeteer.launch({ channel: "chrome", headless: "new", args: ["--no-sandbox", "--disable-gpu"] });
    for (const p of PAGES.filter((x) => !x.static)) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1440, height: 900 });
      await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
      await page.goto("http://127.0.0.1:4899" + (p.path === "/" ? "/" : p.path), { waitUntil: "networkidle2", timeout: 60000 });
      await page.waitForFunction(() => {
        const r = document.getElementById("root");
        return r && r.children.length && r.innerHTML.indexOf("uBoot") === -1;
      }, { timeout: 30000 });
      await new Promise((r) => setTimeout(r, 1800));
      const snap = await page.evaluate(() => {
        /* Bilder unterhalb des Folds lazy laden (nur für den statischen First Paint) */
        const imgs = [...document.querySelectorAll("#root img")];
        imgs.forEach((im, i) => { if (i > 1 && !im.loading) { im.setAttribute("loading", "lazy"); im.setAttribute("decoding", "async"); } });
        const faq = [...document.querySelectorAll('head script[type="application/ld+json"]')].filter((s) => (s.id || "").startsWith("faq")).map((s) => s.outerHTML).join("\n");
        /* JS-injizierte Styles (u-skip, u-grain, Keyframes ...) einfrieren: auf langsamen
           Verbindungen sonst FOUC, bis das Bundle laedt. Die Injektion prueft per id,
           daher entsteht zur Laufzeit kein Duplikat. */
        const styles = [...document.querySelectorAll("head style[id]")].map((s) => s.outerHTML).join("\n");
        return { root: document.getElementById("root").innerHTML, faq, styles };
      });
      await page.close();
      let s = readFileSync(join(DIST, p.out), "utf8");
      s = s.replace(/<div id="root">[\s\S]*?<\/div>\n<script/, `<div id="root">${snap.root}</div>\n<script`);
      if (snap.faq) s = s.replace("</head>", snap.faq + "\n</head>");
      if (snap.styles) s = s.replace("</head>", snap.styles + "\n</head>");
      writeFileSync(join(DIST, p.out), s);
      console.log("✓ prerendered:", p.path);
    }
    await browser.close();
    server.close();
  } else {
    console.log("· Prerender übersprungen (--no-prerender)");
  }

  console.log("\nBuild fertig → dist/");
}

main().catch((e) => { console.error(e); process.exit(1); });
