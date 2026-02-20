import fs from 'fs';
import path from 'path';

const contentFolder = path.resolve('./content');
const manifestPath = path.resolve('./assets-manifest.json');

const getAllFiles = (dirPath: string, arrayOfFiles: string[] = []) => {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    if (fs.statSync(path.join(dirPath, file)).isDirectory() && file !== "thumbs") {
      arrayOfFiles = getAllFiles(path.join(dirPath, file), arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, file));
    }
  });
  return arrayOfFiles;
};

const allFiles = getAllFiles(contentFolder);
const manifest: Record<string, string> = {};

for (const file of allFiles) {
  const relativePath = path.relative(contentFolder, file);
  const fileName = path.basename(file);
  manifest[fileName] = relativePath;
}

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
console.log("✅ Asset manifest generated!");
