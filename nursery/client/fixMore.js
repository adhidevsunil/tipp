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
      
      let newContent = content.replace(/import\s+\{\s*PlantCard\s*\}\s+from\s+['"]@\/components\/PlantCard['"]/g, 'import PlantCard from "@/components/PlantCard"');
      newContent = newContent.replace(/import\s+\{\s*PlantCard\s*\}\s+from\s+['"]\.\.\/components\/PlantCard['"]/g, 'import PlantCard from "@/components/PlantCard"');
      
      newContent = newContent.replace(/['"](\.\.\/)*context\/CartContext['"]/g, "'@/context/CartContext'");
      newContent = newContent.replace(/['"](\.\.\/)*context\/authContext['"]/g, "'@/context/AuthContext'"); // Assuming authContext might exist
      
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
      }
    }
  }
}

processDir('d:/antigravity/tipp/nursery/client/src/app');
processDir('d:/antigravity/tipp/nursery/client/src/components');
console.log('Done fixing remaining imports');
