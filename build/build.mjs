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
  {
    src: "partner.html", out: "partner.html", path: "/partner", nurV2: true,
    title: "Partner im CIRCLE | UNIO",
    description: "Die Makler im CIRCLE von UNIO: persönliche Beratung in Wien und Umgebung, jede und jeder mit eigener Seite.",
    og: "/assets/team/editorial/lara-jonas.jpg", noindex: true,
  },
  {
    src: "vorlagen.html", out: "vorlagen.html", path: "/vorlagen", nurV2: true, static: true,
    title: "Vorlagen | UNIO", description: "Vorlagen für die Abstimmung: Elemente der UNIO Website in mehreren Varianten.", noindex: true,
  },
  { src: "agb.html", out: "agb.html", path: "/agb", title: "Allgemeine Geschäftsbedingungen | UNIO", description: "Allgemeine Geschäftsbedingungen der UNIO Immobilienvermittlung.", noindex: true, static: true },
  { src: "impressum.html", out: "impressum.html", path: "/impressum", title: "Impressum | UNIO", description: "Impressum der UNIO Website.", noindex: true, static: true },
  { src: "datenschutz.html", out: "datenschutz.html", path: "/datenschutz", title: "Datenschutzerklärung | UNIO", description: "Datenschutzerklärung der UNIO Website.", noindex: true, static: true },
];

/* Variante 2 der Hauptseiten: Adresse mit 2, immer noindex */
const V2_PAGES = PAGES.filter((p) => /^(index|makler|bautraeger|immobilien|story|kontakt|projekt|partner|vorlagen)\.html$/.test(p.src)).map((p) => ({
  ...p, noindex: true, extraSchema: undefined,
  out: p.src === "index.html" ? "2.html" : p.src.replace(".html", "2.html"),
  path: p.path === "/" ? "/2" : p.path + "2",
}));

/* Wissens-Hub: statische Seiten unter /wissen (werden separat gepflegt) */
const WISSEN_DIR = join(ROOT, "wissen");

const JSX_FILES = ["site-shared.jsx", "hero-neu.jsx", "bento.jsx", "strecke.jsx", "bt-system.jsx", "homepage.jsx", "page-makler.jsx", "page-bautraeger.jsx", "page-immobilien.jsx", "page-story.jsx", "page-kontakt.jsx", "page-partner.jsx", "page-vorlagen.jsx"];

/* interne Links + Asset-Pfade auf saubere URLs umschreiben */
/* v2 = Variante 2: gleiche Seiten unter Adressen mit einer 2 am Ende
   (/2, /makler2, /immobilien2, /projekt2 ...). Variante 1 bleibt unveraendert. */
const V2_SEITEN = "makler|bautraeger|immobilien|story|kontakt|projekt|partner|vorlagen";
function rewriteUrls(s, v2 = false) {
  s = s.replaceAll("../../assets/", "/assets/");
  s = s.replaceAll("../../styles.css", "/styles.css");
  s = s.replaceAll("../../_ds_bundle.js", "/assets/js/_ds_bundle.js");
  s = s.replace(/(?<![\w/])index\.html/g, v2 ? "/2" : "/");
  if (v2) s = s.replace(new RegExp("\\b(" + V2_SEITEN + ")2?\\.html", "g"), "/$12");
  s = s.replace(/\b(makler|bautraeger|immobilien|story|kontakt|projekt|impressum|datenschutz|agb)\.html/g, "/$1");
  s = s.replaceAll('href="/#', 'href="/#');
  return s;
}

/* Variante 2, Raster: ein einheitlicher Seitenrand. In den Quellen stehen gemischt
   5vw, 7vw und 8vw neben 6vw, dadurch springen die Abschnitte gegeneinander.
   Hier werden sie fuer Variante 2 auf 6vw gezogen. Ausgenommen: Werte in Funktionen
   wie clamp() oder min() (Schriftgroessen, Breiten) und der ueberbreite Bildstreifen. */
function einRand(code, datei) {
  if (datei === "strecke.jsx") return code;
  return code.replace(/(?<![\d.])[578]vw/g, (m, pos) => {
    const davor = code.slice(Math.max(0, pos - 60), pos);
    const abZitat = davor.slice(Math.max(davor.lastIndexOf('"'), davor.lastIndexOf("`"), davor.lastIndexOf("'")) + 1);
    return abZitat.includes("(") ? m : "6vw";
  });
}

/* Variante 2, Texte: keine Gedanken- oder Halbgeviertstriche. Ein Strich mit Leerzeichen davor und danach wird ein Komma, aus Zahlenspannen wird "bis". */
const V2_STAMP = Date.now().toString(36);
function ohneStriche(t) {
  return t
    .replace(/(\d)\s?[\u2013\u2014]\s?(\d)/g, "$1 bis $2")
    .replace(/\s[\u2013\u2014]\s/g, ", ")
    .replace(/[\u2013\u2014]/g, "-")
    /* esbuild schreibt Sonderzeichen im Skript als \\uXXXX: dieselben Regeln fuer diese Schreibweise */
    .replace(/(\d)\s?\\u201[34]\s?(\d)/g, "$1 bis $2")
    .replace(/\s\\u201[34]\s/g, ", ")
    .replace(/\\u201[34]/g, "-")
    /* Keine Trennpunkte (Vorgabe Daniel, 22.11.2026): Mittelpunkt und Aufzaehlungspunkt werden zu einem Komma,
       in allen Schreibweisen (Zeichen, HTML-Entity, Escape im Skript). */
    .replace(/\s*(?:[\u00B7\u2022\u2219\u22C5\u30FB]|&middot;|&bull;|&#183;|&#xB7;|\\xB7|\\u00B7|\\u2022)\s*/gi, ", ");
}

/* Variante 2 und 3: eigene Symbol-Schrift. Power Grotesk und Outfit enthalten Zeichen wie Haekchen, Kreuz, Herz oder
   Dreieck nicht, dann zeichnet jedes Geraet sie mit seiner Systemschrift. "UNIO Symbole" (Ausschnitt aus DejaVu Sans,
   assets/fonts/symbole) steht in beiden Schrift-Stapeln direkt hinter der Marken-Schrift und springt nur fuer fehlende
   Zeichen ein. unicode-range sorgt dafuer, dass die Datei nur geladen wird, wenn ein solches Zeichen vorkommt.
   Auch die Kartensteuerung (Leaflet) sowie Knoepfe und Eingabefelder ohne eigene Angabe nutzen danach die Marken-Schrift
   (Browser geben Knoepfen sonst die Systemschrift). */
const SYMBOL_STIL = `<style>
@font-face{font-family:"UNIO Symbole";src:url("/assets/fonts/symbole/unio-symbole.woff2") format("woff2");font-weight:100 900;font-style:normal;font-display:swap;unicode-range:U+2190-21FF,U+2212,U+2215,U+2219,U+221E,U+2248,U+2260,U+2264-2265,U+2300-23FF,U+25A0-25FF,U+2600-26FF,U+2700-27BF,U+27F0-27FF;}
:root{--font-display:"Power Grotesk","UNIO Symbole","Helvetica Neue",sans-serif;--font-mono:"Outfit","UNIO Symbole",system-ui,sans-serif;}
.leaflet-container,.leaflet-container .leaflet-bar a,.leaflet-container .leaflet-control-attribution{font-family:var(--font-mono);}
:where(button,input,select,textarea){font-family:inherit;}
</style>`;

/* Variante 2, Raster innen: zweispaltige Aufteilungen mit freien Verhaeltnissen (1.4fr zu 1fr,
   0.9fr zu 1.1fr ...) werden auf ganze Spalten des 12er-Rasters gelegt, der Abstand auf 24 Pixel.
   Gleich breite Kartenreihen (repeat(n, 1fr)) bekommen ebenfalls 24 Pixel Abstand.
   Nur wo direkt dahinter ein Zahlen-Abstand steht, sonst bleibt die Stelle unveraendert. */
function aufRaster(code) {
  const sp = (n) => `calc((100% - 264px) / 12 * ${n} + ${(n - 1) * 24}px)`;
  const abstand = (rest) => {
    const m = rest.match(/^([^}]{0,160}?[,{]gap:)(?:(\w+\?\d+:)(\d+)|(\d+))(?=[,}])/);
    if (!m) return null;
    const alt = +(m[3] || m[4]);
    if (alt < 14 || alt > 72) return null;
    return m[1] + (m[2] || "") + "24" + rest.slice(m[0].length);
  };
  code = code.replace(/"minmax\(0, ?([\d.]+)fr\) minmax\(0, ?([\d.]+)fr\)"([^]{0,200})/g, (ganz, a, b, rest) => {
    const neu = abstand(rest); if (neu == null) return ganz;
    const n = Math.min(8, Math.max(4, Math.round(12 * +a / (+a + +b))));
    return `"${sp(n)} minmax(0, 1fr)"` + neu;
  });
  code = code.replace(/"repeat\(([2346]), 1fr\)"([^]{0,200})/g, (ganz, n, rest) => {
    const neu = abstand(rest); return neu == null ? ganz : `"repeat(${n}, minmax(0, 1fr))"` + neu;
  });
  /* Liste mit Nummernspalte (Vorteile): Nummer = 1 Spalte, Text beginnt exakt in Spalte 2 */
  code = code.replace(/"64px minmax\(0, ?([\d.]+)fr\) minmax\(0, ?([\d.]+)fr\)"([^]{0,200})/g, (ganz, a, b, rest) => {
    const neu = abstand(rest); if (neu == null) return ganz;
    const n = Math.min(8, Math.max(4, Math.round(11 * +a / (+a + +b))));
    return `"${sp(1)} ${sp(n)} minmax(0, 1fr)"` + neu;
  });
  code = code.replace(/"64px minmax\(0, 1\.5fr\) minmax\(0, 1fr\)"(,gap:\w+\?"12px 0":)"0 40px"/g, (g, mitte) => `"${sp(1)} ${sp(6)} minmax(0, 1fr)"${mitte}"0 24px"`);
  /* Hero-Karten von Bautraeger und Story bleiben so breit wie die Navigation darueber (40 Pixel Rand).
     Sie wandern erst mit der Navigation auf den Rasterrand, wenn die neue Navigation gewaehlt ist. */
  /* Eingerueckte Tafeln der festgehaltenen Abschnitte: Einzug = Beginn von Spalte 2 */
  const sp2 = "calc(6vw + (88vw - 264px) / 12 + 24px)";
  code = code.replaceAll('11vw"', sp2 + '"').replaceAll('"0 9vw 0 ', '"0 6vw 0 ');
  return code.replaceAll("clamp(24px, 5vw, 96px)", "6vw");
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
    /* Variante 2: eigener Satz Skripte, interne Links zeigen auf die 2er-Adressen */
    mkdirSync(join(DIST, "assets", "js2"), { recursive: true });
    writeFileSync(join(DIST, "assets", "js2", f.replace(".jsx", ".js")), "(()=>{" + ohneStriche(aufRaster(einRand(rewriteUrls(out.code, true), f))) + "})();");
  }
  console.log("✓ JSX precompiled:", JSX_FILES.length, "Dateien");

  /* 2) Assets + Styles + Bundle */
  cpSync(join(ROOT, "assets"), join(DIST, "assets"), { recursive: true });
  cpSync(join(ROOT, "styles.css"), join(DIST, "styles.css"));
  cpSync(join(ROOT, "tokens"), join(DIST, "tokens"), { recursive: true });
  cpSync(join(ROOT, "_ds_bundle.js"), join(DIST, "assets", "js", "_ds_bundle.js"));
  mkdirSync(join(DIST, "assets", "js2"), { recursive: true });
  writeFileSync(join(DIST, "assets", "js2", "_ds_bundle.js"), ohneStriche(readFileSync(join(ROOT, "_ds_bundle.js"), "utf8")));
  console.log("✓ Assets kopiert");

  /* 3) HTML-Seiten transformieren */
  for (const p of PAGES.filter((x) => !x.nurV2)) {
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

  /* 3a) Variante 2: dieselben Seiten unter /2, /makler2 ... (noindex, nicht in Sitemap).
        Eigene Quelle <name>2.html, falls vorhanden, sonst die der Variante 1. */
  for (const p of V2_PAGES) {
    const eigene = p.src.replace(".html", "2.html");
    let s = readFileSync(join(SRC, existsSync(join(SRC, eigene)) ? eigene : p.src), "utf8");
    s = productionReact(s);
    s = rewriteUrls(s, true);
    s = s.replace(/<script src="https:\/\/unpkg\.com\/@babel\/standalone[^>]*><\/script>\n?/, "");
    /* Versionskennung: /assets/* wird ein Jahr lang im Browser gehalten (vercel.json),
       ohne Kennung saehe man nach einer Aenderung weiter den alten Stand. */
    s = s.replace(/<script type="text\/babel" src="([a-z-]+)\.jsx"><\/script>/g, `<script src="/assets/js2/$1.js?v=${V2_STAMP}"></script>`);
    /* Auch das Designsystem-Bundle kommt fuer Variante 2 bereinigt (ohne Striche und Trennpunkte) */
    s = s.replace("/assets/js/_ds_bundle.js", `/assets/js2/_ds_bundle.js?v=${V2_STAMP}`);
    s = s.replace(/<title>[\s\S]*?<\/title>/, `<title>${p.title} | Variante 2</title>`);
    s = s.replace(/<meta name="robots"[^>]*>\n?/g, "");
    s = s.replace("</head>", metaBlock(p) + "\n<script>window.UNIO_V2=true;</script>\n" + SYMBOL_STIL + "\n</head>");
    s = ohneStriche(s);
    writeFileSync(join(DIST, p.out), s);
  }
  console.log("✓ Variante 2:", V2_PAGES.map((p) => p.path).join(" "));

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
  const UX_KITS = [["ux-hub", ""], ["dashboard", "backend"], ["objektseite", "objekt"], ["projektseite", "projekt"], ["explore", "explore"], ["print", "pager"], ["werkbank", "human"],
    /* Variante 2 der Endkunden-Vorschauen */
    ["objektseite2", "objekt2"], ["explore2", "explore2"]];
  for (const [kit, out] of UX_KITS) {
    const kitDir = join(ROOT, "ui_kits", kit);
    if (!existsSync(kitDir)) continue;
    const outDir = join(DIST, "ux", out);
    mkdirSync(outDir, { recursive: true });
    for (const f of readdirSync(kitDir).filter((f) => f.endsWith(".html") || f.endsWith(".jsx"))) {
      let s = readFileSync(join(kitDir, f), "utf8");
      /* Einheiten-Links der Projekt-Ueberseite bleiben in der geschuetzten UX-Vorschau */
      s = s.replaceAll('href="projekt.html"', 'href="/ux/objekt"');
      s = rewriteUrls(s, kit.endsWith("2"));
      if (kit.endsWith("2") && f.endsWith(".html")) s = ohneStriche(s).replace("</head>", SYMBOL_STIL + "\n</head>");
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

  /* 3g) Makler-Zuschnitt (Portrait-Crop nach Foto-Guideline), eigenstaendige Seite, noindex, nicht in Sitemap.
        Quelle tools/maklerzuschnitt/src, gebaut mit tools/maklerzuschnitt/build.py. */
  if (existsSync(join(ROOT, "tools", "maklerzuschnitt", "index.html"))) {
    cpSync(join(ROOT, "tools", "maklerzuschnitt", "index.html"), join(DIST, "maklerzuschnitt.html"));
    console.log("\u2713 Makler-Zuschnitt nach /maklerzuschnitt");
  }

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
    for (const p of [...PAGES.filter((x) => !x.nurV2), ...V2_PAGES].filter((x) => !x.static)) {
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
      if (p.path.endsWith("2")) s = ohneStriche(s);
      writeFileSync(join(DIST, p.out), s);
      console.log("✓ prerendered:", p.path);
    }
    await browser.close();
    server.close();
  } else {
    console.log("· Prerender übersprungen (--no-prerender)");
  }

  /* 6) Variante 3: dieselben Seiten wie Variante 2 unter Adressen mit 3 (/3, /makler3 ...).
        Einziger Unterschied: die Filme laufen in der schnelleren Fassung im Stil der Makler-Filme
        (leb-<name>-circle statt leb-<name>). Gesteuert ueber window.UNIO_FILM, siehe LebBild in site-shared.jsx. */
  const zuDrei = (t) => t
    .replace(new RegExp("([\"'`(=])/(" + V2_SEITEN + ")2(?=[\"'`#?)])", "g"), "$1/$23")
    .replace(/(["'`=])\/2(?=["'`#?])/g, "$1/3");
  mkdirSync(join(DIST, "assets", "js3"), { recursive: true });
  for (const f of readdirSync(join(DIST, "assets", "js2"))) writeFileSync(join(DIST, "assets", "js3", f), zuDrei(readFileSync(join(DIST, "assets", "js2", f), "utf8")));
  for (const p of V2_PAGES) {
    let s = zuDrei(readFileSync(join(DIST, p.out), "utf8"));
    s = s.replaceAll("/assets/js2/", "/assets/js3/");
    s = s.replace("window.UNIO_V2=true;", 'window.UNIO_V2=true;window.UNIO_FILM="circle";');
    s = s.replace(/leb-(fruehling|herbst|cafe)\.(jpg|mp4)/g, "leb-$1-circle.$2");
    s = s.replace(" | Variante 2</title>", " | Variante 3</title>");
    s = s.replace(new RegExp("(" + ORIGIN.replace(/[.]/g, "\\.") + ")/(" + V2_SEITEN + ")2(?=\")", "g"), "$1/$23");
    writeFileSync(join(DIST, p.out === "2.html" ? "3.html" : p.out.replace("2.html", "3.html")), s);
  }
  console.log("✓ Variante 3:", V2_PAGES.map((p) => (p.path === "/2" ? "/3" : p.path.replace(/2$/, "3"))).join(" "));

  console.log("\nBuild fertig → dist/");
}

main().catch((e) => { console.error(e); process.exit(1); });
