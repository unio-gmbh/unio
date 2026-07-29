/* UNIO Social Templates -> PNG-Export.
   Rendert jedes .board aus templates.html einzeln (Instagram-native Pixelmasse,
   deviceScaleFactor 2 fuer Schaerfe-Reserve).
   Aufruf: node social/export.mjs   (Node 22, nutzt installiertes Chrome wie build.mjs) */
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "exports");
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({ channel: "chrome", headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1400, height: 2100, deviceScaleFactor: 1 });
await page.goto("file://" + join(HERE, "templates.html"), { waitUntil: "networkidle0" });
await page.evaluate(() => document.fonts.ready);
await new Promise((r) => setTimeout(r, 600));

const boards = await page.$$(".board");
for (const b of boards) {
  const name = await b.evaluate((el) => el.dataset.name);
  await b.evaluate((el) => el.scrollIntoView());
  await new Promise((r) => setTimeout(r, 150));
  await b.screenshot({ path: join(OUT, name + ".png") });
  console.log("✓", name + ".png");
}
await browser.close();
console.log("Fertig →", OUT);
