/**
 * Generate PNG favicons from the SVG source.
 * Run: node scripts/generate-favicons.mjs
 * 
 * Uses the canvas built into modern Node.js or falls back to a pure-SVG
 * approach. For simplicity, we'll create the PNGs using sharp if available,
 * otherwise we output the SVG-based favicons.
 */
import { readFileSync, writeFileSync, copyFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');

// SVG source
const svgSource = readFileSync(join(publicDir, 'favicon.svg'), 'utf-8');

/**
 * Create a sized SVG string (viewBox stays 0 0 32 32, but width/height change)
 */
function sizedSvg(size) {
  return svgSource
    .replace(/width="32"/, `width="${size}"`)
    .replace(/height="32"/, `height="${size}"`);
}

// Generate .ico from the SVG using a minimal ICO encoder
// ICO format: ICONDIR + ICONDIRENTRY + PNG data for each size
async function generateFavicons() {
  let sharp;
  try {
    sharp = (await import('sharp')).default;
  } catch {
    console.log('sharp not available - creating SVG-only favicons');
    // Write sized SVGs as fallbacks
    writeFileSync(join(publicDir, 'favicon-16x16.svg'), sizedSvg(16));
    writeFileSync(join(publicDir, 'favicon-32x32.svg'), sizedSvg(32));
    console.log('Written SVG favicons. Install sharp for PNG generation.');
    return;
  }

  const svgBuffer = Buffer.from(sizedSvg(512)); // Render from high-res

  // Generate PNGs at various sizes
  const sizes = [
    { name: 'favicon-16x16.png', size: 16 },
    { name: 'favicon-32x32.png', size: 32 },
    { name: 'apple-touch-icon.png', size: 180 },
    { name: 'favicon-192x192.png', size: 192 },
    { name: 'favicon-512x512.png', size: 512 },
  ];

  for (const { name, size } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(join(publicDir, name));
    console.log(`Generated ${name}`);
  }

  // Generate ICO (contains 16x16 + 32x32 PNGs)
  const png16 = await sharp(svgBuffer).resize(16, 16).png().toBuffer();
  const png32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();

  const ico = createIco([png16, png32]);
  writeFileSync(join(publicDir, 'favicon.ico'), ico);
  console.log('Generated favicon.ico');
}

/**
 * Create a minimal ICO file from PNG buffers
 */
function createIco(pngBuffers) {
  const count = pngBuffers.length;
  const headerSize = 6;
  const entrySize = 16;
  const dataOffset = headerSize + count * entrySize;

  // Calculate total size
  let totalDataSize = 0;
  for (const buf of pngBuffers) totalDataSize += buf.length;

  const ico = Buffer.alloc(dataOffset + totalDataSize);

  // ICONDIR header
  ico.writeUInt16LE(0, 0);      // Reserved
  ico.writeUInt16LE(1, 2);      // Type: 1 = ICO
  ico.writeUInt16LE(count, 4);  // Number of images

  let currentOffset = dataOffset;
  const sizes = [16, 32]; // Must match pngBuffers order

  for (let i = 0; i < count; i++) {
    const buf = pngBuffers[i];
    const size = sizes[i];
    const entryStart = headerSize + i * entrySize;

    ico.writeUInt8(size === 256 ? 0 : size, entryStart);      // Width
    ico.writeUInt8(size === 256 ? 0 : size, entryStart + 1);  // Height
    ico.writeUInt8(0, entryStart + 2);                         // Color palette
    ico.writeUInt8(0, entryStart + 3);                         // Reserved
    ico.writeUInt16LE(1, entryStart + 4);                      // Color planes
    ico.writeUInt16LE(32, entryStart + 6);                     // Bits per pixel
    ico.writeUInt32LE(buf.length, entryStart + 8);             // Size of PNG data
    ico.writeUInt32LE(currentOffset, entryStart + 12);         // Offset to PNG data

    buf.copy(ico, currentOffset);
    currentOffset += buf.length;
  }

  return ico;
}

generateFavicons().catch(console.error);
