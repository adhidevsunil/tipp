import { Link, useNavigate } from "react-router";
import { ShoppingCart, Search, Menu, Leaf, User, Heart, PackageOpen } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCart } from "../context/CartContext";
import { Badge } from "./ui/badge";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import logoImage from "figma:asset/116b0eede78617ef06766707b77432474299b9a7.png";

export function Header() {
  const { totalItems } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/plants?search=${encodeURIComponent(searchQuery)}`);
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
            <Link to="/orders" className="hover:underline flex items-center gap-1">
              <PackageOpen className="h-4 w-4" />
              Track Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0">
            <img src={logoImage} alt="Thottam Logo" className="h-16 w-auto" />
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for plants..."
                className="pl-10 bg-input-background border-border rounded-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/orders")}>
                  <PackageOpen className="mr-2 h-4 w-4" />
                  My Orders
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/coupons")}>
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
              onClick={() => navigate("/cart")}
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
        <nav className="mt-4 flex items-center gap-6 border-t pt-4">
          <Link to="/plants" className="text-foreground hover:text-primary transition-colors">
            All Plants
          </Link>
          <Link
            to="/plants/Indoor Plants"
            className="text-foreground hover:text-primary transition-colors"
          >
            Indoor Plants
          </Link>
          <Link
            to="/plants/Outdoor Plants"
            className="text-foreground hover:text-primary transition-colors"
          >
            Outdoor Plants
          </Link>
          <Link
            to="/plants/Flowering Plants"
            className="text-foreground hover:text-primary transition-colors"
          >
            Flowering Plants
          </Link>
          <Link
            to="/plants/Air Purifying Plants"
            className="text-foreground hover:text-primary transition-colors"
          >
            Air Purifying
          </Link>
        </nav>
      </div>
    </header>
  );
}
