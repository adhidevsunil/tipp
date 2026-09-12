import { Link } from "react-router";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Leaf } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";
import logoImage from "figma:asset/116b0eede78617ef06766707b77432474299b9a7.png";

export function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
    }
  };

  return (
    <footer className="bg-muted border-t border-border mt-16">
      {/* Newsletter Section */}
      <div className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl mb-2 flex items-center gap-2 justify-center md:justify-start">
                <Leaf className="h-6 w-6" />
                Join Our Plant Community
              </h3>
              <p className="text-primary-foreground/90">
                Subscribe to our newsletter for care tips, exclusive offers, and new arrivals
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 w-full md:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-foreground min-w-[300px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" variant="secondary">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <img src={logoImage} alt="Thottam Logo" className="h-16 w-auto mb-4" />
            <p className="text-muted-foreground mb-4">
              Bringing nature home, one plant at a time. Premium quality plants delivered to your
              doorstep with care.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-primary-foreground p-2 rounded-full hover:bg-primary/90 transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/plants" className="text-muted-foreground hover:text-primary transition-colors">
                  Shop All Plants
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-muted-foreground hover:text-primary transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/coupons" className="text-muted-foreground hover:text-primary transition-colors">
                  Offers & Coupons
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-muted-foreground hover:text-primary transition-colors">
                  Shopping Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-4 text-foreground">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/plants/Indoor Plants"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Indoor Plants
                </Link>
              </li>
              <li>
                <Link
                  to="/plants/Outdoor Plants"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Outdoor Plants
                </Link>
              </li>
              <li>
                <Link
                  to="/plants/Flowering Plants"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Flowering Plants
                </Link>
              </li>
              <li>
                <Link
                  to="/plants/Air Purifying Plants"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Air Purifying Plants
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-foreground">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5 text-primary" />
                <span>123 Garden Street, Green Valley, CA 94102</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                <span>hello@thottam.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; 2026 Thottam the plant Nursery. All rights reserved. Made with ♥ for plant lovers.</p>
        </div>
      </div>
    </footer>
  );
}
