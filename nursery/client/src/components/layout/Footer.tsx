import Link from 'next/link';
import { Leaf, Instagram, Twitter, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary-dark text-accent py-12 px-4 md:px-6 relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-light/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
        
        <div className="space-y-4 md:col-span-1">
          <Link href="/" className="flex items-center space-x-2 text-white">
            <Leaf className="h-6 w-6" />
            <span className="text-xl font-bold">EcoRoots</span>
          </Link>
          <p className="text-sm text-accent/80">
            Bringing nature to your doorstep. Eco-friendly plants for a greener tomorrow.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm text-accent/80">
            <li><Link href="/shop" className="hover:text-white transition">Shop Plants</Link></li>
            <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
            <li><Link href="/care" className="hover:text-white transition">Plant Care</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Customer Service</h3>
          <ul className="space-y-2 text-sm text-accent/80">
            <li><Link href="/contact" className="hover:text-white transition">Contact Us</Link></li>
            <li><Link href="/faq" className="hover:text-white transition">FAQs</Link></li>
            <li><Link href="/returns" className="hover:text-white transition">Returns & Refunds</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition text-white">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition text-white">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="h-10 w-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-primary transition text-white">
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
        
      </div>
      
      <div className="container mx-auto mt-12 pt-8 border-t border-white/10 text-center text-sm text-accent/60 relative z-10">
        &copy; {new Date().getFullYear()} EcoRoots Nursery. All rights reserved.
      </div>
    </footer>
  );
}
