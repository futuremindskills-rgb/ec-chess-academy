const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const publicDir = path.join(__dirname, '..', 'public');

async function optimizeImages() {
  console.log('Optimizing key images identified in Lighthouse audit...');

  // 1. c-chess.png (display size 252x252, currently 1280x1280 181KB)
  const cChessPath = path.join(publicDir, 'c-chess.png');
  if (fs.existsSync(cChessPath)) {
    const raw = fs.readFileSync(cChessPath);
    const buf = await sharp(raw)
      .resize(500, 500, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9, effort: 8 })
      .toBuffer();
    fs.writeFileSync(cChessPath, buf);
    console.log(`c-chess.png resized to 500x500: ${(buf.length / 1024).toFixed(1)} KB`);
  }

  // 2. go.png (display size 321x252, currently 1280x1005 146KB)
  const goPath = path.join(publicDir, 'go.png');
  if (fs.existsSync(goPath)) {
    const raw = fs.readFileSync(goPath);
    const buf = await sharp(raw)
      .resize(500, 500, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9, effort: 8 })
      .toBuffer();
    fs.writeFileSync(goPath, buf);
    console.log(`go.png resized to 500x500: ${(buf.length / 1024).toFixed(1)} KB`);
  }

  // 3. chess.png (display size 252x252, currently 736x736 56KB)
  const chessPath = path.join(publicDir, 'chess.png');
  if (fs.existsSync(chessPath)) {
    const raw = fs.readFileSync(chessPath);
    const buf = await sharp(raw)
      .resize(500, 500, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9, effort: 8 })
      .toBuffer();
    fs.writeFileSync(chessPath, buf);
    console.log(`chess.png resized to 500x500: ${(buf.length / 1024).toFixed(1)} KB`);
  }

  // 4. eclogo.png (display size 228x98, currently 493x212 24.7KB)
  const eclogoPath = path.join(publicDir, 'eclogo.png');
  if (fs.existsSync(eclogoPath)) {
    const raw = fs.readFileSync(eclogoPath);
    const buf = await sharp(raw)
      .resize(400, null, { fit: 'inside', withoutEnlargement: true })
      .png({ quality: 80, compressionLevel: 9, effort: 8 })
      .toBuffer();
    fs.writeFileSync(eclogoPath, buf);
    console.log(`eclogo.png resized: ${(buf.length / 1024).toFixed(1)} KB`);
  }

  // 5. 3.webp (display size 709x532, currently 1438x1440 108KB)
  const webp3Path = path.join(publicDir, '3.webp');
  if (fs.existsSync(webp3Path)) {
    const raw = fs.readFileSync(webp3Path);
    const buf = await sharp(raw)
      .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toBuffer();
    fs.writeFileSync(webp3Path, buf);
    console.log(`3.webp resized to 800x800: ${(buf.length / 1024).toFixed(1)} KB`);
  }

  // 6. demo.png (hero poster & mobile image)
  const demoPath = path.join(publicDir, 'demo.png');
  if (fs.existsSync(demoPath)) {
    const raw = fs.readFileSync(demoPath);
    const buf = await sharp(raw)
      .resize(800, null, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toBuffer();
    fs.writeFileSync(path.join(publicDir, 'demo.webp'), buf);
    console.log(`demo.webp created: ${(buf.length / 1024).toFixed(1)} KB`);
  }

  console.log('All key images optimized successfully.');
}

optimizeImages();
