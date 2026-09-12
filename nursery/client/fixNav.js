const fs = require('fs');
const path = require('path');

function processFile(fullPath) {
    let content = fs.readFileSync(fullPath, 'utf8');
    let original = content;
    
    // Fix router hook
    content = content.replace(/const navigate = useRouter\(\);/g, "const router = useRouter();");
    
    // Fix navigation calls
    content = content.replace(/navigate\(-1\)/g, "router.back()");
    content = content.replace(/navigate\(/g, "router.push(");
    
    // Fix context imports
    content = content.replace(/import\s+\{([^}]*?useCart[^}]*?)\}\s+from\s+['"]\.\.\/context\/CartContext['"];?/g, 'import { $1 } from "@/context/CartContext";');
    content = content.replace(/import\s+\{([^}]*?useCart[^}]*?)\}\s+from\s+['"]\.\.\/\.\.\/context\/CartContext['"];?/g, 'import { $1 } from "@/context/CartContext";');
    
    // Fix PlantCard imports (named to default)
    content = content.replace(/import\s+\{\s*PlantCard\s*\}\s+from\s+['"](.*?)components\/PlantCard['"];?/g, 'import PlantCard from "@/components/PlantCard";');
    
    // Ensure 'use client' for components using hooks
    if ((content.includes('useRouter') || content.includes('useParams') || content.includes('useCart') || content.includes('useState')) && !content.includes("'use client'")) {
        content = "'use client';\n" + content;
    }

    if (content !== original) {
        fs.writeFileSync(fullPath, content);
    }
}

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      processFile(fullPath);
    }
  }
}

processDir('d:/antigravity/tipp/nursery/client/src/app');
processDir('d:/antigravity/tipp/nursery/client/src/components');
console.log('Fixed router navigations');
