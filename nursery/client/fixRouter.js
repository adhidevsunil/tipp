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
      
      if (content.includes('useRouter()') && !content.includes('import { useRouter')) {
        let lines = content.split('\n');
        // Find the last import line
        let lastImportIdx = -1;
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('import ')) {
                lastImportIdx = i;
            }
        }
        if (lastImportIdx !== -1) {
            lines.splice(lastImportIdx + 1, 0, 'import { useRouter } from "next/navigation";');
        } else {
            lines.splice(0, 0, 'import { useRouter } from "next/navigation";');
        }
        
        let newContent = lines.join('\n');
        fs.writeFileSync(fullPath, newContent);
      }
    }
  }
}

processDir('d:/antigravity/tipp/nursery/client/src/app');
processDir('d:/antigravity/tipp/nursery/client/src/components');
console.log('Done adding missing useRouter imports');
