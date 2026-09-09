import puppeteer from "puppeteer-core";
import fs from "node:fs";
import path from "node:path";

const CHROME_PATHS = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  process.env.LOCALAPPDATA + "\\Google\\Chrome\\Application\\chrome.exe",
];
const executablePath = CHROME_PATHS.find((p) => fs.existsSync(p));

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();

  for (const width of [390, 360]) {
    await page.setViewport({ width, height: 844, isMobile: true, hasTouch: true });
    await page.goto("http://localhost:5173", { waitUntil: "networkidle0" });
    await new Promise((r) => setTimeout(r, 1000));

    const overflow = await page.evaluate(() => {
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      };
    });
    console.log(`Mobile overflow check (${width}px):`, overflow);
  }

  // Reset to 390px for visual screenshots
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
  await page.goto("http://localhost:5173", { waitUntil: "networkidle0" });
  await new Promise((r) => setTimeout(r, 1000));

  const artifactDir = "C:\\Users\\saadm\\.gemini\\antigravity-ide\\brain\\53884c41-4100-4010-9f6d-45a87c7ebc4c";

  // Check top / hero
  await page.screenshot({ path: path.join(artifactDir, "mobile_hero_v2.png") });

  // Scroll to brandband
  await page.evaluate(() => {
    window.scrollTo({ top: 750, behavior: "instant" });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, "mobile_brandband_v2.png") });

  // Scroll to work
  await page.evaluate(() => {
    const el = document.getElementById("work");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, "mobile_work_v2.png") });

  // Scroll to services
  await page.evaluate(() => {
    const el = document.getElementById("services");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, "mobile_services_v2.png") });

  // Scroll to comparison
  await page.evaluate(() => {
    const el = document.getElementById("compare");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, "mobile_comparison_v2.png") });

  // Scroll to team
  await page.evaluate(() => {
    const el = document.getElementById("team");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, "mobile_team_v2.png") });

  // Scroll to faq
  await page.evaluate(() => {
    const el = document.getElementById("faq");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, "mobile_faq_v2.png") });

  // Scroll to final cta / footer
  await page.evaluate(() => {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await new Promise((r) => setTimeout(r, 600));
  await page.screenshot({ path: path.join(artifactDir, "mobile_footer_v2.png") });

  console.log("All mobile screenshots saved successfully!");
} catch (e) {
  console.error(e);
} finally {
  await browser.close();
}
