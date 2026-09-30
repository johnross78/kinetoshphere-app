import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const mobileShell = path.join(root, 'www', 'mobile-shell.css');
const indexFile = path.join(root, 'www', 'index.html');

const patches = [
  {
    name: 'RC27',
    file: path.join(root, 'www', 'rc27-player-layout.css'),
    start: '/* >>> RC27 PLAYER LAYOUT OVERRIDES >>> */',
    end: '/* <<< RC27 PLAYER LAYOUT OVERRIDES <<< */',
  },
  {
    name: 'RC28',
    file: path.join(root, 'www', 'rc28-player-layout.css'),
    start: '/* >>> RC28 PLAYER LAYOUT OVERRIDES >>> */',
    end: '/* <<< RC28 PLAYER LAYOUT OVERRIDES <<< */',
  },
];

if (!fs.existsSync(mobileShell)) {
  console.log('Player layout patch skipped: www/mobile-shell.css is not present.');
  process.exit(0);
}

const escapeRegExp = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
let shell = fs.readFileSync(mobileShell, 'utf8');

for (const patch of patches) {
  if (!fs.existsSync(patch.file)) {
    console.log(`${patch.name} patch skipped: ${path.relative(root, patch.file)} is not present.`);
    continue;
  }

  const css = fs.readFileSync(patch.file, 'utf8').trim();
  const block = `${patch.start}\n${css}\n${patch.end}`;
  const existing = new RegExp(`${escapeRegExp(patch.start)}[\\s\\S]*?${escapeRegExp(patch.end)}`, 'm');

  if (existing.test(shell)) {
    shell = shell.replace(existing, block);
  } else {
    shell = `${shell.trimEnd()}\n\n${block}\n`;
  }
}

fs.writeFileSync(mobileShell, shell);

if (fs.existsSync(indexFile)) {
  let html = fs.readFileSync(indexFile, 'utf8');
  html = html.replaceAll('v6.10.32', 'v6.10.34');
  html = html.replaceAll('6.10.32', '6.10.34');
  html = html.replaceAll('v6.10.33', 'v6.10.34');
  html = html.replaceAll('6.10.33', '6.10.34');
  fs.writeFileSync(indexFile, html);
}

console.log('Applied Kinetosphere RC27 baseline plus RC28 / v6.10.34 Player refinements.');
