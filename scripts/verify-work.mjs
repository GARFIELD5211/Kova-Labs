import puppeteer from "puppeteer-core";
import fs from "node:fs";

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

async function run() {
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ["--window-size=1500,950"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1500, height: 950, deviceScaleFactor: 1 });

  let url = "http://localhost:5175";
  await page.goto(url, { waitUntil: "networkidle2" });
  console.log("Connected to", url);

  // Scroll to #work
  await page.evaluate(() => {
    const el = document.querySelector("#work");
    if (el) el.scrollIntoView({ block: "start" });
  });

  await sleep(1500);

  // Verify section and typography
  const details = await page.evaluate(() => {
    const work = document.querySelector("#work");
    const h2 = work?.querySelector("h2");
    const cards = work?.querySelectorAll("[data-card]");
    const activeClient = work?.querySelector("h3")?.textContent?.trim();

    return {
      workBg: work ? window.getComputedStyle(work).backgroundColor : null,
      h2Text: h2 ? h2.textContent.trim() : null,
      cardsCount: cards ? cards.length : 0,
      activeClient,
    };
  });
  console.log("Inspection details:", details);

  const shotDir = "C:/Users/saadm/.gemini/antigravity-ide/brain/d8fa5ee2-2a97-4beb-b71a-cfe5ba53206a";
  const workHandle = await page.$("#work");
  await workHandle.screenshot({ path: `${shotDir}/final_kova_work.png` });
  console.log("Saved final screenshot to final_kova_work.png");

  // Test dragging
  const railHandle = await page.$("#work [data-rail]");
  const box = await railHandle.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 - 240, box.y + box.height / 2, { steps: 12 });
  await page.mouse.up();
  await sleep(800);

  const afterDragClient = await page.evaluate(() => {
    return document.querySelector("#work h3")?.textContent?.trim();
  });
  console.log("Active client after drag:", afterDragClient);

  // Test Modal open
  const modalBtn = await page.evaluateHandle(() => {
    const btns = [...document.querySelectorAll("#work button")];
    return btns.find((b) => b.textContent.includes("Case Study"));
  });
  if (modalBtn) {
    await modalBtn.click();
    await sleep(600);

    const modalOpen = await page.evaluate(() => {
      const modal = document.querySelector("[role='dialog']");
      return modal ? modal.textContent.includes("The Architectural Solution") : false;
    });
    console.log("Modal opened successfully:", modalOpen);

    if (modalOpen) {
      await page.screenshot({ path: `${shotDir}/final_kova_modal.png` });
      console.log("Saved modal screenshot to final_kova_modal.png");
      await page.keyboard.press("Escape");
      await sleep(400);
    }
  }

  await browser.close();
  console.log("All tests finished!");
}

run().catch((e) => {
  console.error("Test failed:", e);
  process.exit(1);
});
