'use client';
import Link from "next/link";
import { ShoppingCart, Search, Menu, Leaf, User, Heart, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {  useCart  } from "@/context/CartContext";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
const logoImage = "/logo.png";

export function Header() {
  const { totalItems } = useCart();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/plants?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <p className="flex items-center gap-2">
            <Leaf className="h-4 w-4" />
            Free shipping on orders above $50
          </p>
          <div className="flex items-center gap-4">
            <Link href="/orders" className="hover:underline flex items-center gap-1">
              <PackageOpen className="h-4 w-4" />
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          {/* Logo and Mobile Cart/Menu */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <img src={logoImage} alt="Thottam Logo" className="h-12 md:h-16 w-auto" />
            </Link>
            
            <div className="flex md:hidden items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => router.push("/cart")}
              >
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                    {totalItems}
                  </Badge>
                )}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="w-full md:flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for plants..."
                className="pl-10 bg-input-background border-border rounded-full w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/orders")}>
                  <PackageOpen className="mr-2 h-4 w-4" />
                  My Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/coupons")}>
                  <Heart className="mr-2 h-4 w-4" />
                  My Coupons
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => router.push("/cart")}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`${isMobileMenuOpen ? "flex flex-col animate-in slide-in-from-top duration-300" : "hidden"} md:flex md:flex-row mt-4 items-center gap-4 md:gap-6 border-t pt-4`}>
          <Link href="/plants" onClick={() => setIsMobileMenuOpen(false)} className="text-foreground hover:text-primary transition-colors text-center w-full md:w-auto py-2 md:py-0">
            All Plants
          </Link>
          <Link
            href="/plants/Indoor Plants"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-foreground hover:text-primary transition-colors text-center w-full md:w-auto py-2 md:py-0"
          >
            Indoor Plants
          </Link>
          <Link
            href="/plants/Outdoor Plants"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-foreground hover:text-primary transition-colors text-center w-full md:w-auto py-2 md:py-0"
          >
            Outdoor Plants
          </Link>
          <Link
            href="/plants/Flowering Plants"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-foreground hover:text-primary transition-colors text-center w-full md:w-auto py-2 md:py-0"
          >
            Flowering Plants
          </Link>
          <Link
            href="/plants/Air Purifying Plants"
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-foreground hover:text-primary transition-colors text-center w-full md:w-auto py-2 md:py-0"
          >
            Air Purifying
          </Link>
        </nav>
      </div>
    </header>
  );
}
