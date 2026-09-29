import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const mobileShell = path.join(root, 'www', 'mobile-shell.css');
const overrideFile = path.join(root, 'www', 'rc27-player-layout.css');
const indexFile = path.join(root, 'www', 'index.html');

const START = '/* >>> RC27 PLAYER LAYOUT OVERRIDES >>> */';
const END = '/* <<< RC27 PLAYER LAYOUT OVERRIDES <<< */';

if (!fs.existsSync(mobileShell) || !fs.existsSync(overrideFile)) {
  console.log('RC27 patch skipped: expected www files are not present.');
  process.exit(0);
}

let shell = fs.readFileSync(mobileShell, 'utf8');
const override = fs.readFileSync(overrideFile, 'utf8').trim();
const block = `${START}\n${override}\n${END}`;

const existing = new RegExp(`${START.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?${END.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'm');
if (existing.test(shell)) {
  shell = shell.replace(existing, block);
} else {
  shell = `${shell.trimEnd()}\n\n${block}\n`;
}
fs.writeFileSync(mobileShell, shell);

if (fs.existsSync(indexFile)) {
  let html = fs.readFileSync(indexFile, 'utf8');
  html = html.replaceAll('v6.10.32', 'v6.10.33');
  html = html.replaceAll('6.10.32', '6.10.33');
  fs.writeFileSync(indexFile, html);
}

console.log('Applied Kinetosphere RC27 / v6.10.33 Player layout overrides.');
