/* UNIO Social Animationen -> MP4 (Reel/Story 9:16, 1080x1920, 30 fps, H.264).
   Rendert anim.html Frame fuer Frame deterministisch (SEEK(t)) und encodiert
   mit dem statischen ffmpeg aus imageio-ffmpeg.
   Aufruf: node social/record.mjs [szene ...]   (Default: alle: r o p) */
import puppeteer from "puppeteer-core";
import { mkdirSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "exports");
const FPS = 30;
const NAMES = { r: "makler-rechner-reel-916", o: "makler-objektanlage-reel-916", p: "endkunde-objekt-reveal-916",
  m: "brand-manifest-reel-916", x: "endkunde-offmarket-reel-916", s: "makler-provision-reel-916",
  c: "brand-moveasone-crowd-916", q: "endkunde-quote-zuhause-916", k: "endkunde-ki-suche-916", l: "endkunde-lens-live-916",
  b: "system-bento-reel-916", t: "endkunde-matching-reel-916", a: "makler-actions-reel-916",
  v: "endkunde-verkauf-prozess-916", d: "endkunde-besichtigung-916", f: "endkunde-bewertung-916",
  u: "brand-inszeniert-reel-916", w: "brand-vorort-reel-916",
  g: "brand-team-reel-916", j: "bautraeger-referenzen-reel-916" };

const FFMPEG = execFileSync("python3", ["-c", "import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())"]).toString().trim();
const scenes = process.argv.slice(2).length ? process.argv.slice(2) : ["r", "o", "p", "m", "x", "s", "c", "q", "k", "l", "b", "t", "a", "v", "d", "f", "u", "w", "g", "j"];

const browser = await puppeteer.launch({ channel: "chrome", headless: "new" });
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1920, deviceScaleFactor: 1 });

for (const sc of scenes) {
  const frames = join(HERE, "_frames_" + sc);
  rmSync(frames, { recursive: true, force: true });
  mkdirSync(frames, { recursive: true });
  await page.goto("file://" + join(HERE, "anim.html") + "?scene=" + sc, { waitUntil: "networkidle0" });
  await page.evaluate(() => document.fonts.ready);
  const dur = await page.evaluate(() => window.DUR);
  const total = Math.round(dur * FPS);
  console.log(`Szene ${sc}: ${dur}s -> ${total} Frames`);
  for (let i = 0; i < total; i++) {
    await page.evaluate((t) => window.SEEK(t), i / FPS);
    await page.screenshot({ path: join(frames, String(i).padStart(4, "0") + ".png") });
    if (i % 60 === 0) console.log(`  frame ${i}/${total}`);
  }
  const mp4 = join(OUT, NAMES[sc] + ".mp4");
  execFileSync(FFMPEG, ["-y", "-framerate", String(FPS), "-i", join(frames, "%04d.png"),
    "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", "-movflags", "+faststart", mp4],
    { stdio: "ignore" });
  rmSync(frames, { recursive: true, force: true });
  console.log("✓", NAMES[sc] + ".mp4");
}
await browser.close();
console.log("Fertig →", OUT);
