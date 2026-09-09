import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
];
const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto("http://localhost:5173", { waitUntil: "networkidle0" });

  // Click toggle menu button
  await page.click('button[aria-label="Toggle menu"]');
  await new Promise((r) => setTimeout(r, 400));

  const artifactDir = "C:\\Users\\saadm\\.gemini\\antigravity-ide\\brain\\53884c41-4100-4010-9f6d-45a87c7ebc4c";
  await page.screenshot({ path: path.join(artifactDir, "mobile_menu_open.png") });
  console.log("Mobile menu open screenshot taken successfully!");
} catch (e) {
  console.error(e);
} finally {
  await browser.close();
}
