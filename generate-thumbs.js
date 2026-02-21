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

      const exists = await fs.pathExists(destPath);
      if (exists) {
        console.log(`Skipping: ${destPath} (already exists)`);
        continue;
      }

      await fs.ensureDir(path.dirname(destPath));

      await sharp(fullPath)
        .resize(800, null, { withoutEnlargement: true })
        .jpeg({ quality: 80 })
        .toFile(destPath);
      
      console.log(`Generated thumb: ${destPath}`);
    }
  }
}

processImages(SOURCE_DIR).catch(console.error);
