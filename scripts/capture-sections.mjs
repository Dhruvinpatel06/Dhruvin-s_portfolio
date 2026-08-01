/**
 * Capture section screenshots for the portfolio dialog slideshow.
 * Takes screenshots of: projects section, skills section, navbar, and a project card.
 */
import { chromium } from "playwright";
import { join } from "path";

const URL = process.argv[2] || "http://localhost:3001";
const OUT_DIR = join("public", "assets", "projects-screenshots", "portfolio");

(async () => {
  const browser = await chromium.launch({
    headless: false,
    args: ["--use-gl=angle", "--enable-webgl"],
  });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log(`Navigating to ${URL}...`);
  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });

  // Wait for 3D scene to load
  console.log("Waiting for 3D scene...");
  await page.waitForTimeout(8000);

  // 1. Capture hero + navbar
  console.log("Capturing navbar/hero...");
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: join(OUT_DIR, "navbar.png"), type: "png" });

  // 2. Scroll to skills/keyboard section
  console.log("Capturing skills section...");
  await page.evaluate(() => {
    const el = document.getElementById("skills");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: join(OUT_DIR, "skills.png"), type: "png" });

  // 3. Scroll to projects section
  console.log("Capturing projects section...");
  await page.evaluate(() => {
    const el = document.getElementById("projects");
    if (el) el.scrollIntoView({ behavior: "instant", block: "start" });
  });
  await page.waitForTimeout(2000);
  await page.screenshot({ path: join(OUT_DIR, "projects.png"), type: "png" });

  // 4. Scroll a bit more to show a project card close-up
  console.log("Capturing project card area...");
  await page.evaluate(() => window.scrollBy(0, 300));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: join(OUT_DIR, "project.png"), type: "png" });

  console.log("Done! All section screenshots captured.");
  await browser.close();
})();
