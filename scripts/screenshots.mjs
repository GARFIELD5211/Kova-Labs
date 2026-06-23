import puppeteer from "puppeteer";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(__dirname, "../src/assets");

const sites = [
  { url: "https://ornibellajewels.com/", filename: "ornibella.jpg" },
  { url: "https://lancertravels.netlify.app/", filename: "lancer-travels.jpg" },
  { url: "https://asasnaturals.com/", filename: "asas-naturals.jpg" },
  { url: "https://broadcastuae.net/", filename: "broadcast-uae.jpg" },
  { url: "https://xyntra.tech/", filename: "xyntra-tech.jpg" },
];

const browser = await puppeteer.launch({
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
});

console.log("Browser launched");

for (const site of sites) {
  console.log(`Taking screenshot of ${site.url}...`);
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.goto(site.url, { waitUntil: "networkidle2", timeout: 30000 });
    // Wait a bit more for any animations
    await new Promise((r) => setTimeout(r, 2000));
    const outputPath = path.join(assetsDir, site.filename);
    await page.screenshot({ path: outputPath, fullPage: false, type: "jpeg", quality: 85 });
    console.log(`  Saved to ${outputPath}`);
    await page.close();
  } catch (err) {
    console.error(`  Failed for ${site.url}: ${err.message}`);
  }
}

await browser.close();
console.log("All screenshots complete!");
