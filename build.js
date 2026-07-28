const fs = require('fs');
const path = require('path');

const root = process.cwd();
const outDir = path.join(root, 'dist');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const filesToCopy = [
  'index.html',
  'App.js',
  'main.js',
  'manual-connect.js',
  'config.js',
  'src/style.css',
  'public',
  'WalletConnect.png',
  'web31.png',
  'V2.png',
  'Quip.png'
];

for (const item of filesToCopy) {
  const src = path.join(root, item);
  const dest = path.join(outDir, item);

  if (!fs.existsSync(src)) continue;

  if (fs.statSync(src).isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src)) {
    const srcPath = path.join(src, entry);
    const destPath = path.join(dest, entry);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
