'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Leaf, Menu, X, User } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const cartItems = useCartStore((state) => state.cartItems);
  
  const cartItemCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/shop' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-navbar">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 text-primary-dark transition-transform hover:scale-105">
          <Leaf className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight">EcoRoots</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === link.href ? 'text-primary border-b-2 border-primary' : 'text-gray-600'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side icons */}
        <div className="flex items-center space-x-4">
          <Link href="/admin" className="hidden md:flex text-gray-500 hover:text-primary transition-colors">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/cart" className="relative text-gray-700 hover:text-primary transition-colors">
            <ShoppingCart className="h-6 w-6" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                {cartItemCount}
              </span>
            )}
          </Link>
          
          {/* Mobile menu toggle */}
          <button 
            className="md:hidden text-gray-700 hover:text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-4 animate-slide-up">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-base font-medium text-gray-800 hover:text-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              href="/admin" 
              className="text-base font-medium text-gray-800 hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin Login
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
