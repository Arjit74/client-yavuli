import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Heart, ShoppingCart, User, Menu, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const cart = useCart();

  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero transition-transform group-hover:scale-105">
              <span className="text-lg font-bold text-white">Y</span>
            </div>
            <span className="text-xl font-bold text-primary">Yavuli</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search products, books, services..."
                className="pl-10 bg-muted/50 border-border focus:ring-accent"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/explore" 
              className={`text-sm font-medium transition-colors hover:text-accent ${isActive('/explore') ? 'text-accent' : 'text-foreground'}`}
            >
              Explore
            </Link>
            <Link 
              to="/sell" 
              className={`text-sm font-medium transition-colors hover:text-accent ${isActive('/sell') ? 'text-accent' : 'text-foreground'}`}
            >
              Sell
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-accent ${isActive('/about') ? 'text-accent' : 'text-foreground'}`}
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className={`text-sm font-medium transition-colors hover:text-accent ${isActive('/contact') ? 'text-accent' : 'text-foreground'}`}
            >
              Contact
            </Link>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative hidden md:flex hover:bg-accent/10 hover:text-accent">
              <Heart className="h-5 w-5" />
            </Button>
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative hover:bg-accent/10 hover:text-accent">
                <ShoppingCart className="h-5 w-5" />
                {useCart().cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-white">
                    {useCart().cartCount}
                  </span>
                )}
              </Button>
            </Link>
            
            {/* Profile Menu */}
            <div className="relative hidden md:block">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-accent/10"
                onMouseEnter={() => setProfileMenuOpen(true)}
                onMouseLeave={() => setProfileMenuOpen(false)}
              >
                <User className="h-5 w-5" />
              </Button>
              
              {profileMenuOpen && (
                <div
                  className="absolute right-0 mt-2 w-56 animate-fade-in rounded-lg border border-border bg-card shadow-lg"
                  onMouseEnter={() => setProfileMenuOpen(true)}
                  onMouseLeave={() => setProfileMenuOpen(false)}
                >
                  <div className="p-4 border-b border-border">
                    <p className="text-sm font-semibold">Guest User</p>
                    <p className="text-xs text-muted-foreground">guest@yavuli.com</p>
                  </div>
                  <div className="py-2">
                    <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                      My Profile
                    </Link>
                    <Link to="/profile?tab=listings" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                      My Listings
                    </Link>
                    <Link to="/profile?tab=favorites" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                      Favourites
                    </Link>
                    <Link to="/profile?tab=settings" className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                      Settings
                    </Link>
                  </div>
                  <div className="border-t border-border p-2">
                    <Link to="/login" className="block px-4 py-2 text-sm text-destructive hover:bg-muted transition-colors">
                      Sign Out
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-10 bg-muted/50"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link to="/explore" className="block py-2 text-sm font-medium hover:text-accent transition-colors">
              Explore
            </Link>
            <Link to="/sell" className="block py-2 text-sm font-medium hover:text-accent transition-colors">
              Sell
            </Link>
            <Link to="/about" className="block py-2 text-sm font-medium hover:text-accent transition-colors">
              About
            </Link>
            <Link to="/contact" className="block py-2 text-sm font-medium hover:text-accent transition-colors">
              Contact
            </Link>
            <div className="border-t border-border pt-3 space-y-2">
              <Link to="/profile" className="block py-2 text-sm hover:text-accent transition-colors">
                My Profile
              </Link>
              <Link to="/login" className="block py-2 text-sm text-destructive hover:text-accent transition-colors">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
