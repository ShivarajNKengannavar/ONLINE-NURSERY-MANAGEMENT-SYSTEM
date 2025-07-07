
import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();

  const handleAddToCart = (item: any) => {
    addToCart(item);
    console.log('Added to cart from wishlist:', item.name);
  };

  if (!isAuthenticated || isAdmin) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container mx-auto px-4 text-center py-20">
            <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
            <p className="text-muted-foreground mb-8">Please log in as a user to view your wishlist.</p>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-8">My Wishlist</h1>
            
            {wishlistItems.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">💚</div>
                <h2 className="text-2xl font-semibold mb-4">Your wishlist is empty</h2>
                <p className="text-muted-foreground mb-8">Start adding plants you love to your wishlist!</p>
                <Link to="/plants">
                  <Button className="btn-primary">Browse Plants</Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {wishlistItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-48 object-cover"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-red-500"
                        onClick={() => removeFromWishlist(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="p-4 space-y-3">
                      <span className="text-xs text-primary font-medium uppercase tracking-wide">
                        {item.category}
                      </span>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <div className="text-2xl font-bold text-primary">₹{item.price}</div>
                      <Button 
                        onClick={() => handleAddToCart(item)}
                        className="w-full btn-primary"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
