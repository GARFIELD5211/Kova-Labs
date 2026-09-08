/**
 * QA: verifies the carousel's opening frame — project 1 dead-center,
 * partial cards bleeding on both edges, lift applied.
 *
 *   node scripts/opening-check.mjs [url]
 */
import puppeteer from "puppeteer-core";
import fs from "node:fs";

const URL = process.argv[2] ?? "http://localhost:5174";
const CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  process.env.LOCALAPPDATA + "\\Google\\Chrome\\Application\\chrome.exe",
];
const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));
if (!executablePath) {
  console.error("Chrome not found");
  process.exit(1);
}

let failures = 0;
const check = (ok, msg) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${msg}`);
  if (!ok) failures++;
};

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--window-size=1500,900"],
});
const page = await browser.newPage();
await page.setViewport({ width: 1500, height: 900, deviceScaleFactor: 1 });
await page.goto(URL, { waitUntil: "networkidle2" });
// freeze auto-advance so we capture the true opening frame
await page.evaluate(() => {
  window.__KOVA_PAUSED__ = true;
});
// capture the hero first, before scrolling away
await new Promise((r) => setTimeout(r, 1800));
fs.mkdirSync("qa-shots", { recursive: true });
await page.screenshot({ path: "qa-shots/hero.png" });
await page.evaluate(() => document.querySelector("#work").scrollIntoView({ block: "center" }));
await new Promise((r) => setTimeout(r, 1500)); // reveals + image paint

const state = await page.evaluate(() => {
  const el = document.querySelector("#work .no-scrollbar");
  const elRect = el.getBoundingClientRect();
  const cards = [...el.querySelectorAll("[data-card]")];
  const mid = elRect.left + el.clientWidth / 2;

  let best = -1;
  let bestD = Infinity;
  cards.forEach((c, i) => {
    const r = c.getBoundingClientRect();
    const d = Math.abs(r.left + r.width / 2 - mid);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  });

  const bestRect = cards[best].getBoundingClientRect();
  const leftBleed = cards.some(
    (c) => c.getBoundingClientRect().left < elRect.left && c.getBoundingClientRect().right > elRect.left + 10
  );
  const rightBleed = cards.some(
    (c) => c.getBoundingClientRect().right > elRect.right && c.getBoundingClientRect().left < elRect.right - 10
  );

  return {
    best,
    project: best + 1 <= 5 ? best + 1 : ((best % 5) + 1),
    offset: bestRect.left + bestRect.width / 2 - mid,
    lifted: cards[best].classList.contains("is-center"),
    leftBleed,
    rightBleed,
  };
});

check(state.project === 1, `opening card is project 1 (got project ${state.project})`);
check(Math.abs(state.offset) < 1.5, `centered exactly (offset ${state.offset.toFixed(2)}px)`);
check(state.lifted, "center card has the is-center lift");
check(state.leftBleed, "a partial card bleeds in on the LEFT edge");
check(state.rightBleed, "a partial card bleeds in on the RIGHT edge");

fs.mkdirSync("qa-shots", { recursive: true });
await page.screenshot({ path: "qa-shots/opening.png" });
console.log("\nscreenshot saved: qa-shots/opening.png");
console.log(failures === 0 ? "ALL CHECKS PASSED — opening frame is a proper carousel" : `${failures} CHECK(S) FAILED`);

await browser.close();
process.exit(failures === 0 ? 0 : 1);
