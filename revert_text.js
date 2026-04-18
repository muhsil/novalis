const fs = require('fs');
const path = require('path');

const dirs = ['components', 'app'];

const replacements = [
  { from: /text-\[#742938\]/g, to: 'text-[#121212]' },
  { from: /border-\[#742938\]/g, to: 'border-[#121212]' }, // borders that were black should be black
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      replacements.forEach(r => {
        if (content.match(r.from)) {
          content = content.replace(r.from, r.to);
          modified = true;
        }
      });
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Reverted text/border in:', fullPath);
      }
    }
  }
}

dirs.forEach(d => processDir(d));
console.log('Done restoring dark text.');
