import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(__dirname, "../src/assets");

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
});

console.log("Browser launched");

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  console.log("Navigating to https://thevoicestudio.net...");
  await page.goto("https://thevoicestudio.net", { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));
  const outputPath = path.join(assetsDir, "voicestudio-screenshot.jpg");
  await page.screenshot({ path: outputPath, fullPage: false, type: "jpeg", quality: 85 });
  console.log(`Saved to ${outputPath}`);
  await page.close();
} catch (err) {
  console.error(`Failed: ${err.message}`);
}

await browser.close();
console.log("Done!");
