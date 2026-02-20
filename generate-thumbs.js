import sharp from 'sharp'
import fs from 'fs-extra'
import path from 'path'

const SOURCE_DIR = 'content/assets/images';
const TARGET_DIR = 'content/assets/thumbs';

async function processImages(dir) {
  const files = await fs.readdir(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stats = await fs.stat(fullPath);

    if (stats.isDirectory()) {
      await processImages(fullPath); // Recursive call
    } else if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
      const relativePath = path.relative(SOURCE_DIR, fullPath);
      const destPath = path.join(TARGET_DIR, relativePath);

      await fs.ensureDir(path.dirname(destPath));

      await sharp(fullPath)
        .resize(800, null, { withoutEnlargement: true }) // Max width 800px
        .jpeg({ quality: 80 }) // Compression
        .toFile(destPath);
      
      console.log(`Generated thumb: ${destPath}`);
    }
  }
}

processImages(SOURCE_DIR).catch(console.error);
