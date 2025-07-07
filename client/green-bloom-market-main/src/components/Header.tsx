
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X, LogOut, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import SearchModal from './SearchModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const { user, isAuthenticated, logout, isAdmin } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-xs md:text-sm text-muted-foreground border-b">
          <div className="hidden md:block">
            Free shipping on orders over ₹2000 🌱
          </div>
          <div className="flex items-center space-x-2 md:space-x-4 text-xs md:text-sm">
            <span>📞 xxxxxxxxxx</span>
            <span className="hidden sm:block">📧 xxx123@gmail.com</span>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">🌿</span>
            </div>
            <div>
              <h1 className="font-playfair text-xl md:text-2xl font-bold text-primary">Green Bloom</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">Premium Plant Nursery</p>
            </div>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <input
                type="text"
                placeholder="Search plants, seeds, tools..."
                className="w-full pl-10 pr-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                onClick={() => setIsSearchOpen(true)}
                readOnly
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Search icon - Mobile */}
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsSearchOpen(true)}>
              <Search className="w-4 h-4 md:w-5 md:h-5" />
            </Button>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                {!isAdmin && (
                  <Link to="/profile">
                    <Button variant="ghost" size="sm" className="hidden sm:flex items-center space-x-1">
                      <User className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="hidden md:block">Profile</span>
                    </Button>
                  </Link>
                )}
                <span className="hidden lg:block text-sm">
                  {user?.name} {isAdmin && '(Admin)'}
                </span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                  <User className="w-4 h-4 md:w-5 md:h-5" />
                  <span className="hidden sm:block text-sm">Login</span>
                </Button>
              </Link>
            )}

            {/* Wishlist and Cart - Only show for regular users */}
            {!isAdmin && (
              <>
                <Link to="/wishlist">
                  <Button variant="ghost" size="sm" className="relative">
                    <Heart className="w-4 h-4 md:w-5 md:h-5" />
                    {wishlistItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                        {wishlistItems.length}
                      </span>
                    )}
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button variant="ghost" size="sm" className="relative">
                    <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Button>
                </Link>
              </>
            )}

            {/* Admin link */}
            {isAdmin && (
              <Link to="/admin">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
            )}

            {/* Mobile menu toggle */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={toggleMenu}>
              {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block pb-3 md:pb-4`}>
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6 lg:space-x-8 text-sm font-medium">
            <li><Link to="/" className="text-primary hover:text-primary/80 transition-colors block py-1">Home</Link></li>
            <li><Link to="/plants" className="hover:text-primary transition-colors block py-1">Plants</Link></li>
            <li><Link to="/seeds" className="hover:text-primary transition-colors block py-1">Seeds</Link></li>
            <li><Link to="/tools" className="hover:text-primary transition-colors block py-1">Tools & Supplies</Link></li>
            <li><Link to="/garden-care" className="hover:text-primary transition-colors block py-1">Garden Care</Link></li>
            {!isAuthenticated && (
              <>
                <li className="md:hidden">
                  <Link to="/login" className="hover:text-primary transition-colors block py-1">User Login</Link>
                </li>
                <li className="md:hidden">
                  <Link to="/register" className="hover:text-primary transition-colors block py-1">Register</Link>
                </li>
                <li className="md:hidden">
                  <Link to="/admin-login" className="hover:text-primary transition-colors block py-1">Admin Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;
