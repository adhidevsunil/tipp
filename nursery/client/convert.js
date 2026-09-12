const fs = require('fs');
const path = require('path');

const tempDir = 'd:/antigravity/tipp/nursery/client/temp_ui/src';
const destApp = 'd:/antigravity/tipp/nursery/client/src/app';
const destData = 'd:/antigravity/tipp/nursery/client/src/data';

// Copy data
if (!fs.existsSync(destData)) fs.mkdirSync(destData, { recursive: true });
fs.copyFileSync(path.join(tempDir, 'app/data/plants.ts'), path.join(destData, 'plants.ts'));

// Helper to convert React Router to Next.js
function convertCode(content) {
  let c = content.replace(/import\s+\{([^}]*?)Link([^}]*?)\}\s+from\s+['"]react-router['"];?/g, 'import Link from "next/link";');
  c = c.replace(/import\s+\{.*?(useNavigate|useParams).*?\}\s+from\s+['"]react-router['"];?/g, 'import { useRouter, useParams } from "next/navigation";');
  c = c.replace(/to=(['"{])/g, 'href=$1');
  c = c.replace(/useNavigate\(\)/g, 'useRouter()');
  // Add 'use client' if needed
  if (!c.includes("'use client'")) {
    c = "'use client';\n" + c;
  }
  return c;
}

const pagesMap = {
  'HomePage.tsx': 'page.tsx',
  'ProductListingPage.tsx': 'shop/page.tsx',
  'ProductDetailPage.tsx': 'product/[id]/page.tsx',
  'CartPage.tsx': 'cart/page.tsx',
  'CheckoutPage.tsx': 'checkout/page.tsx',
  'OrdersPage.tsx': 'admin/dashboard/orders/page.tsx',
  'CouponsPage.tsx': 'admin/dashboard/coupons/page.tsx'
};

for (const [src, dest] of Object.entries(pagesMap)) {
  const srcPath = path.join(tempDir, 'app/pages', src);
  if (fs.existsSync(srcPath)) {
    let content = fs.readFileSync(srcPath, 'utf8');
    content = convertCode(content);
    // Fix imports for components/data
    content = content.replace(/\.\.\/components/g, '@/components');
    content = content.replace(/\.\.\/data/g, '@/data');
    
    // For pages, they should probably be default exported. Check if it's named export.
    content = content.replace(/export function (\w+)/, "export default function $1");
    // Some are `export const ...`
    
    const destPath = path.join(destApp, dest);
    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
    fs.writeFileSync(destPath, content);
  } else {
    console.log("Missing " + srcPath);
  }
}

// Convert Layout/Header/Footer
const layoutFiles = ['Header.tsx', 'Footer.tsx', 'PlantCard.tsx'];
for (const file of layoutFiles) {
  const srcPath = path.join(tempDir, 'app/components', file);
  if (fs.existsSync(srcPath)) {
    let content = fs.readFileSync(srcPath, 'utf8');
    content = convertCode(content);
    
    content = content.replace(/import\s+\{\s*NavLink\s*\}\s+from\s+["']react-router["'];?/g, 'import Link from "next/link";');
    content = content.replace(/<NavLink/g, '<Link');
    content = content.replace(/<\/NavLink/g, '</Link');
    content = content.replace(/isActive\s*\?\s*["'](.*?)["']\s*:\s*["'](.*?)["']/g, 'false ? "$1" : "$2"'); // Hacky fix for NavLink callback className
    
    content = content.replace(/\.\.\/data/g, '@/data');
    content = content.replace(/\.\/ui/g, '@/components/ui');
    
    if (file === "PlantCard.tsx") {
        content = content.replace("export function", "export default function");
    }

    const destPath = path.join('d:/antigravity/tipp/nursery/client/src/components', file);
    fs.writeFileSync(destPath, content);
  }
}

console.log('Migration complete');
