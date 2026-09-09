import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

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

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto("http://localhost:5173", { waitUntil: "networkidle0", timeout: 15000 });
  
  await new Promise((r) => setTimeout(r, 1500));
  
  const artifactDir = "C:\\Users\\saadm\\.gemini\\antigravity-ide\\brain\\53884c41-4100-4010-9f6d-45a87c7ebc4c";
  
  // 1. Capture Hero Section with "KOVA LABS" and new description
  const heroScreenshot = path.join(artifactDir, "hero_kova_labs.png");
  await page.screenshot({ path: heroScreenshot, fullPage: false });
  console.log("Hero screenshot saved to:", heroScreenshot);

  // 2. Scroll to Selected Work section on pure white background
  await page.evaluate(() => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 1200));

  const workWhiteScreenshot = path.join(artifactDir, "work_hadiya_exact_white.png");
  await page.screenshot({ path: workWhiteScreenshot, fullPage: false });
  console.log("Work white coverflow screenshot saved to:", workWhiteScreenshot);

  // 3. Perform a continuous drag on the rail to test infinite loop & physics
  const railBox = await page.evaluate(() => {
    const rail = document.querySelector('[data-rail="true"]');
    if (!rail) return null;
    const r = rail.getBoundingClientRect();
    return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
  });

  if (railBox) {
    await page.mouse.move(railBox.x, railBox.y);
    await page.mouse.down();
    await page.mouse.move(railBox.x - 300, railBox.y, { steps: 20 });
    await new Promise((r) => setTimeout(r, 300));
    
    const dragScreenshot = path.join(artifactDir, "work_hadiya_drag.png");
    await page.screenshot({ path: dragScreenshot, fullPage: false });
    console.log("Drag screenshot saved to:", dragScreenshot);

    await page.mouse.up();
    await new Promise((r) => setTimeout(r, 1000));

    const finalScreenshot = path.join(artifactDir, "work_hadiya_settled.png");
    await page.screenshot({ path: finalScreenshot, fullPage: false });
    console.log("Settled screenshot saved to:", finalScreenshot);
  }
} catch (err) {
  console.error("Error capturing screenshot:", err);
} finally {
  await browser.close();
}
