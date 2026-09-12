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
      
      // Fix relative imports pointing outside to components/data/ui
      let newContent = content.replace(/['"](\.\.\/)+components([^'"]*)['"]/g, "'@/components$2'");
      newContent = newContent.replace(/['"](\.\.\/)+data([^'"]*)['"]/g, "'@/data$2'");
      newContent = newContent.replace(/['"](\.\.\/)+ui([^'"]*)['"]/g, "'@/components/ui$2'");
      newContent = newContent.replace(/['"]\.\/ui([^'"]*)['"]/g, "'@/components/ui$2'");
      newContent = newContent.replace(/export\s+function\s+PlantCard/g, "export default function PlantCard");
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
      }
    }
  }
}

processDir('d:/antigravity/tipp/nursery/client/src/app');
processDir('d:/antigravity/tipp/nursery/client/src/components');
console.log('Done fixing imports');
