const fs = require('fs');
const path = require('path');
const root = __dirname;

for (const filename of fs.readdirSync(root).filter((name) => name.endsWith('.html'))) {
  const file = path.join(root, filename);
  const source = fs.readFileSync(file, 'utf8');
  if (!source.includes('site-header')) continue;
  const updated = source.replace(/[ \t]+(?=\r?\n)/g, '');
  if (updated !== source) fs.writeFileSync(file, updated, 'utf8');
}
