const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      let newContent = content.replace(/['"]@\/components\/ui\/Button['"]/g, "'@/components/ui/button'");
      newContent = newContent.replace(/['"]@\/components\/ui\/Input['"]/g, "'@/components/ui/input'");
      newContent = newContent.replace(/['"]@\/components\/ui\/Card['"]/g, "'@/components/ui/card'");
      newContent = newContent.replace(/['"]@\/components\/ui\/Modal['"]/g, "'@/components/ui/modal'");
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
      }
    }
  }
}

processDir('d:/antigravity/tipp/nursery/client/src/app');
processDir('d:/antigravity/tipp/nursery/client/src/components');
console.log('Done case fixing');
