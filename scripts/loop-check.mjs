/**
 * QA: drives the #work carousel through a full loop in headless Chrome
 * and asserts the wrap is pixel-continuous.
 *
 *   node scripts/loop-check.mjs [url]
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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
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
// freeze the auto-advance interval so the test is the only driver
await page.evaluate(() => {
  window.__KOVA_PAUSED__ = true;
});

// jump to the work section and let reveals + first centering settle
await page.evaluate(() => document.querySelector("#work").scrollIntoView({ block: "center" }));
await sleep(2800);

// static geometry: period must be exactly 5 pitches, range must exceed one period
const geo = await page.evaluate(() => {
  const el = document.querySelector("#work .no-scrollbar");
  const cards = [...el.querySelectorAll("[data-card]")];
  return {
    period: cards[5].getBoundingClientRect().left - cards[0].getBoundingClientRect().left,
    pitch: cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left,
    range: el.scrollWidth - el.clientWidth,
  };
});
check(Math.abs(geo.period - 5 * geo.pitch) < 1, `period (${geo.period.toFixed(1)}px) == 5 pitches (${(5 * geo.pitch).toFixed(1)}px)`);
check(geo.range > geo.period, `scroll range (${geo.range.toFixed(0)}px) exceeds one period (${geo.period.toFixed(0)}px)`);

// hover the strip so auto-advance pauses — the test drives the arrows only
const strip = await page.$("#work .no-scrollbar");
const stripBox = await strip.boundingBox();
await page.mouse.move(stripBox.x + stripBox.width / 2, stripBox.y + stripBox.height / 2);
await sleep(300);

const nextBtn = await page.$('#work button[aria-label="Next project"]');
const read = () =>
  page.evaluate(() => {
    const el = document.querySelector("#work .no-scrollbar");
    const cards = [...el.querySelectorAll("[data-card]")];
    const mid = el.getBoundingClientRect().left + el.clientWidth / 2;
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
    const r = cards[best].getBoundingClientRect();
    return { best, project: (best % 5) + 1, offset: r.left + r.width / 2 - mid };
  });

fs.mkdirSync("qa-shots", { recursive: true });
const seen = [];
let prevProject = null;

for (let step = 1; step <= 7; step++) {
  const before = await read();
  if (step === 6) await page.screenshot({ path: "qa-shots/wrap-before.png" });

  await nextBtn.click();
  await sleep(1600); // glide + settle

  const after = await read();
  seen.push(after.project);
  if (step === 6) await page.screenshot({ path: "qa-shots/wrap-after.png" });

  check(
    Math.abs(after.offset) < 1.5,
    `step ${step}: centered card #${after.best} (project ${after.project}) offset ${after.offset.toFixed(2)}px`
  );
  if (prevProject !== null) {
    const expected = (prevProject % 5) + 1;
    check(
      after.project === expected,
      `step ${step}: sequence ${prevProject} -> ${after.project} (expected ${expected})`
    );
  }
  prevProject = after.project;
}

// across 7 steps we must have seen the pattern 2,3,4,5,1,2,3 — a full wrap included
const expectedSeq = [2, 3, 4, 5, 1, 2, 3];
check(
  JSON.stringify(seen) === JSON.stringify(expectedSeq),
  `full loop sequence repeats pattern: [${seen.join(", ")}] (expected [${expectedSeq.join(", ")}])`
);

console.log(failures === 0 ? "\nALL CHECKS PASSED — wrap is seamless" : `\n${failures} CHECK(S) FAILED`);
await browser.close();
process.exit(failures === 0 ? 0 : 1);
