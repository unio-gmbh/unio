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

/* Kanonische Domain: nach Umzug auf unio.at hier EINMAL umstellen. */
const ORIGIN = "https://unio-verse.vercel.app";

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
    description: "CIRCLE ist die Agent-First Community für Top-Makler in Wien: bis 100 % Provision, kuratierter Dealflow, Personal Branding und echte Beteiligung. Jetzt als UNIO Partner bewerben.",
    og: "/assets/team/gruppe-serioes.jpg",
  },
  {
    src: "bautraeger.html", out: "bautraeger.html", path: "/bautraeger",
    title: "Bauträger Vermarktung Wien: Markttest vor Baustart | UNIO",
    description: "Neubauprojekte datenbasiert vermarkten: Markttest vor dem Baustart, Performance-Kampagnen, kuratierter Maklervertrieb und Live-Steuerung in LENS. 100 % erfolgsbasiert, kein Retainer.",
    og: "/assets/img/ecoluxe-wide.jpg",
  },
  {
    src: "immobilien.html", out: "immobilien.html", path: "/immobilien",
    title: "Immobilie kaufen oder verkaufen in Wien | UNIO",
    description: "Kuratierte Wiener Objekte mit Kartenansicht und Live-Vermarktung. Für Eigentümer: datenbasierte Bewertung, passende Käufer und volle Transparenz bis zum Notar.",
    og: "/assets/img/penthouse.jpg",
  },
  {
    src: "story.html", out: "story.html", path: "/story",
    title: "Die UNIO Story: Fünf Unternehmen, eine Mission | UNIO",
    description: "Der Markt war eine Blackbox, also bauten wir Klarheit: Wie Vertrieb, Marketing und Technologie 2026 zu UNIO fusionierten. Acht Gründer, drei Disziplinen, ein Betriebssystem.",
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
  s = s.replace(/\b(makler|bautraeger|immobilien|story|kontakt|projekt|impressum|datenschutz)\.html/g, "/$1");
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

  /* 4) robots.txt + sitemap.xml */
  writeFileSync(join(DIST, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${ORIGIN}/sitemap.xml\n`);
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
        return { root: document.getElementById("root").innerHTML, faq };
      });
      await page.close();
      let s = readFileSync(join(DIST, p.out), "utf8");
      s = s.replace(/<div id="root">[\s\S]*?<\/div>\n<script/, `<div id="root">${snap.root}</div>\n<script`);
      if (snap.faq) s = s.replace("</head>", snap.faq + "\n</head>");
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
