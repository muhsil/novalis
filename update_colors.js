const fs = require('fs');
const path = require('path');

const dirs = ['components', 'app'];

const replacements = [
  { from: /#121212/g, to: '#742938' },  // Primary Noir -> Burgundy
  { from: /bg-\[#1A1A1A\]/g, to: 'bg-[#742938]' }, 
  { from: /text-\[#1A1A1A\]/g, to: 'text-[#742938]' }, 
  { from: /#C5A059/g, to: '#D4AFB9' },  // Accent Gold -> Blush/Rose Gold
  { from: /#C9A96E/g, to: '#D4AFB9' }
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
        console.log('Updated:', fullPath);
      }
    }
  }
}

dirs.forEach(d => processDir(d));
console.log('Done mapping colors.');
