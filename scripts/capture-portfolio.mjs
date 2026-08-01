/**
 * Capture the full portfolio by stitching viewport-sized screenshots.
 * Crops the sticky navbar from frames 2+ to avoid duplication.
 * Handles the last partial frame to avoid overlapping content.
 */
import { chromium } from "playwright";
import { join } from "path";
import { mkdirSync, rmSync, readdirSync } from "fs";

const URL = process.argv[2] || "http://localhost:3001";
const OUTPUT = process.argv[3] || join("public", "assets", "projects-screenshots", "portfolio", "landing.png");
const TEMP_DIR = join("scripts", "_temp_screenshots");

(async () => {
  rmSync(TEMP_DIR, { recursive: true, force: true });
  mkdirSync(TEMP_DIR, { recursive: true });

  const WIDTH = 1440;
  const HEIGHT = 900;
  const NAVBAR_HEIGHT = 56; // Height of sticky navbar to crop from subsequent frames

  const browser = await chromium.launch({
    headless: false,
    args: ["--use-gl=angle", "--enable-webgl"],
  });
  const page = await browser.newPage({ viewport: { width: WIDTH, height: HEIGHT } });

  console.log(`Navigating to ${URL}...`);
  await page.goto(URL, { waitUntil: "networkidle", timeout: 30000 });

  console.log("Waiting 10s for Spline 3D keyboard to load...");
  await page.waitForTimeout(10000);

  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  console.log(`Total page height: ${totalHeight}px`);

  // Calculate non-overlapping scroll positions
  // First frame: full viewport (0 to HEIGHT)
  // Subsequent frames: scroll by (HEIGHT - NAVBAR_HEIGHT) to account for navbar crop
  const scrollStep = HEIGHT;
  const positions = [];
  for (let y = 0; y < totalHeight; y += scrollStep) {
    positions.push(Math.min(y, totalHeight - HEIGHT));
  }
  // Deduplicate the last position if it equals the previous
  if (positions.length > 1 && positions[positions.length - 1] === positions[positions.length - 2]) {
    positions.pop();
  }

  console.log(`Taking ${positions.length} viewport screenshots...`);

  for (let i = 0; i < positions.length; i++) {
    const scrollY = positions[i];
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(800);

    const filename = join(TEMP_DIR, `frame_${String(i).padStart(3, "0")}.png`);
    await page.screenshot({ path: filename, type: "png" });
    console.log(`  Frame ${i + 1}/${positions.length} at scrollY=${scrollY}`);
  }

  await browser.close();

  // Stitch with sharp, cropping navbar from frames 2+
  console.log("Stitching screenshots (cropping duplicate navbars)...");
  const sharp = (await import("sharp")).default;

  const files = readdirSync(TEMP_DIR)
    .filter(f => f.endsWith(".png"))
    .sort()
    .map(f => join(TEMP_DIR, f));

  // Calculate final composite height:
  // Frame 0: full HEIGHT
  // Frames 1 to N-2: HEIGHT - NAVBAR_HEIGHT (navbar cropped)
  // Last frame: only the remaining pixels
  const lastScrollY = positions[positions.length - 1];
  const secondLastScrollY = positions.length > 1 ? positions[positions.length - 2] : 0;
  const lastFrameUsableHeight = totalHeight - lastScrollY;
  // But we need to account for the overlap with the previous frame
  const lastFrameOverlap = positions.length > 1 ? (secondLastScrollY + HEIGHT) - lastScrollY : 0;
  const lastFrameCropTop = lastFrameOverlap > 0 ? lastFrameOverlap : NAVBAR_HEIGHT;

  let compositeHeight = HEIGHT; // First frame
  for (let i = 1; i < files.length - 1; i++) {
    compositeHeight += HEIGHT - NAVBAR_HEIGHT;
  }
  if (files.length > 1) {
    compositeHeight += HEIGHT - lastFrameCropTop;
  }

  console.log(`Composite dimensions: ${WIDTH}x${compositeHeight}`);

  // Build composite inputs
  const compositeInputs = [];
  let currentY = 0;

  for (let i = 0; i < files.length; i++) {
    let cropTop = 0;
    let cropHeight = HEIGHT;

    if (i === 0) {
      // First frame: use full image
      cropTop = 0;
      cropHeight = HEIGHT;
    } else if (i === files.length - 1) {
      // Last frame: crop overlap from top
      cropTop = lastFrameCropTop;
      cropHeight = HEIGHT - lastFrameCropTop;
    } else {
      // Middle frames: crop navbar
      cropTop = NAVBAR_HEIGHT;
      cropHeight = HEIGHT - NAVBAR_HEIGHT;
    }

    const croppedBuffer = await sharp(files[i])
      .extract({ left: 0, top: cropTop, width: WIDTH, height: cropHeight })
      .toBuffer();

    compositeInputs.push({
      input: croppedBuffer,
      top: currentY,
      left: 0,
    });

    currentY += cropHeight;
  }

  await sharp({
    create: {
      width: WIDTH,
      height: compositeHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    },
  })
    .composite(compositeInputs)
    .png()
    .toFile(OUTPUT);

  console.log(`Done! Final image: ${WIDTH}x${compositeHeight} → ${OUTPUT}`);

  rmSync(TEMP_DIR, { recursive: true, force: true });
})();
