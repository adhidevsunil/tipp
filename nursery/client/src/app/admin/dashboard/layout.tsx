'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';
import { Package, ShoppingBag, Tag, LogOut, LayoutDashboard, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { adminInfo, logout } = useUserStore();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    // Only redirect if mounted and not authed
    if (mounted && !adminInfo) {
      router.push('/admin');
    }
  }, [adminInfo, router, mounted]);

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  const navItems = [
    { label: 'Products', href: '/admin/dashboard/products', icon: <Package className="h-5 w-5" /> },
    { label: 'Orders', href: '/admin/dashboard/orders', icon: <ShoppingBag className="h-5 w-5" /> },
    { label: 'Coupons', href: '/admin/dashboard/coupons', icon: <Tag className="h-5 w-5" /> },
  ];

  if (!mounted || !adminInfo) return null; // prevent hydration mismatch

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      
      {/* Sidebar */}
      <aside className="w-64 glass border-r border-gray-100 flex-shrink-0 flex flex-col hidden md:flex min-h-screen sticky top-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-100">
           <Link href="/admin/dashboard" className="flex items-center gap-2 text-primary-dark font-bold text-xl">
             <Leaf className="h-6 w-6 text-primary" />
             EcoAdmin
           </Link>
        </div>
        
        <nav className="p-4 flex flex-col gap-2 relative flex-1">
           {navItems.map(item => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  pathname.includes(item.href) 
                     ? 'bg-primary text-white shadow-md shadow-primary/20' 
                     : 'text-gray-600 hover:bg-gray-100/50 hover:text-primary-dark'
                }`}
              >
                {item.icon} {item.label}
              </Link>
           ))}
        </nav>
        
        <div className="p-4 border-t border-gray-100 mt-auto">
           <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={handleLogout}>
             <LogOut className="mr-3 h-5 w-5" /> Log Out
           </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden pt-8 px-4 md:px-8 pb-12 w-full">
         <div className="max-w-6xl mx-auto">
            {children}
         </div>
      </main>
      
    </div>
  );
}
