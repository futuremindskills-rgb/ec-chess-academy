const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');

async function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) {
    return { skipped: true };
  }

  const originalBuffer = fs.readFileSync(filePath);
  const originalSize = originalBuffer.length;

  let pipeline = sharp(originalBuffer);
  let compressedBuffer;

  try {
    if (ext === '.jpg' || ext === '.jpeg') {
      compressedBuffer = await pipeline
        .jpeg({ quality: 82, mozjpeg: true, progressive: true })
        .toBuffer();
    } else if (ext === '.png') {
      compressedBuffer = await pipeline
        .png({ quality: 85, compressionLevel: 9, effort: 8 })
        .toBuffer();
    } else if (ext === '.webp') {
      compressedBuffer = await pipeline
        .webp({ quality: 82, effort: 6 })
        .toBuffer();
    }

    if (compressedBuffer && compressedBuffer.length < originalSize) {
      fs.writeFileSync(filePath, compressedBuffer);
      const saved = originalSize - compressedBuffer.length;
      console.log(`✓ ${path.basename(filePath)}: ${(originalSize/1024).toFixed(1)}KB -> ${(compressedBuffer.length/1024).toFixed(1)}KB (saved ${(saved/1024).toFixed(1)}KB)`);
      return { originalSize, newSize: compressedBuffer.length, saved };
    } else {
      console.log(`- ${path.basename(filePath)}: Already optimal (${(originalSize/1024).toFixed(1)}KB)`);
      return { originalSize, newSize: originalSize, saved: 0 };
    }
  } catch (err) {
    console.error(`✗ Error processing ${path.basename(filePath)}:`, err.message);
    return { originalSize, newSize: originalSize, saved: 0 };
  }
}

async function run() {
  console.log('Starting lossless & high-efficiency compression of public assets...');
  const files = fs.readdirSync(publicDir);
  let totalOrig = 0;
  let totalNew = 0;

  for (const file of files) {
    const fullPath = path.join(publicDir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isFile()) {
      const res = await processFile(fullPath);
      if (!res.skipped) {
        totalOrig += res.originalSize;
        totalNew += res.newSize;
      }
    }
  }

  const totalSaved = totalOrig - totalNew;
  console.log('\n=============================================');
  console.log(`Total Initial Size: ${(totalOrig / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total Compressed Size: ${(totalNew / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`Total Saved: ${(totalSaved / (1024 * 1024)).toFixed(2)} MB (${((totalSaved / totalOrig) * 100).toFixed(1)}% reduction)`);
  console.log('=============================================');
}

run();
