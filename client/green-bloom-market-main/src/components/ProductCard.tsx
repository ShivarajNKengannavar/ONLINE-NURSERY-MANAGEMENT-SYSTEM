import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating?: number; // Optional, default will be 4.5
  stock: number;
  description: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const { addToCart } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Please log in to add items to cart');
      return;
    }

    if (isAdmin) {
      alert('Admins cannot add items to cart');
      return;
    }

    addToCart(product);
    console.log('Added to cart:', product.name);
  };

  const handleWishlistToggle = () => {
    if (!isAuthenticated) {
      alert('Please log in to use wishlist');
      return;
    }

    if (isAdmin) {
      alert('Admins cannot use wishlist');
      return;
    }

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleReviewSubmit = () => {
    if (!isAuthenticated || isAdmin) {
      alert('Only users can submit reviews');
      return;
    }

    if (!selectedRating) {
      alert('Please select a rating');
      return;
    }

    console.log('Review Submitted:', {
      productId: product.id,
      rating: selectedRating,
      review: reviewText,
    });

    setSelectedRating(0);
    setReviewText('');
    alert('Review submitted!');
  };

  const isWishlisted = isInWishlist(product.id);
  const isAvailable = product.stock > 0;

  // Use product.rating or default to 4.5
  const displayedRating = product.rating ?? 4.5;

  return (
    <Card
      className="group overflow-hidden card-hover border-0 shadow-lg bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 md:h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div
          className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {!isAdmin && isAvailable && (
              <Button
                onClick={handleAddToCart}
                className="btn-primary transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            )}
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-2">
          {!isAvailable && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Out of Stock
            </span>
          )}
          {product.originalPrice && (
            <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
              Sale
            </span>
          )}
        </div>

        {/* Wishlist */}
        {!isAdmin && (
          <div className="absolute top-3 right-3">
            <Button
              variant="ghost"
              size="sm"
              className={`w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/80 hover:bg-white transition-colors ${
                isWishlisted ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
              }`}
              onClick={handleWishlistToggle}
            >
              {isWishlisted ? '❤️' : '♡'}
            </Button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 space-y-3 md:space-y-4">
        <span className="text-xs md:text-sm text-primary font-medium uppercase tracking-wide">
          {product.category}
        </span>

        <h3 className="font-semibold text-base md:text-lg text-foreground group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h3>

        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Rating stars */}
        <div className="flex space-x-1 text-yellow-500 text-sm">
          {[...Array(5)].map((_, i) => {
            const full = i < Math.floor(displayedRating);
            const half = i === Math.floor(displayedRating) && displayedRating % 1 !== 0;
            return (
              <span key={i} className="relative inline-block w-4 h-4">
                {full ? (
                  <span>★</span>
                ) : half ? (
                  <span className="absolute overflow-hidden w-2 h-full">★</span>
                ) : (
                  <span>☆</span>
                )}
              </span>
            );
          })}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg md:text-2xl font-bold text-primary">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm md:text-lg text-muted-foreground line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          <span
            className={`text-xs md:text-sm font-medium ${
              isAvailable ? 'text-green-600' : 'text-red-500'
            }`}
          >
            {isAvailable ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Review form */}
        {!isAdmin && (
          <div className="pt-4 border-t mt-4">
            <h4 className="text-sm font-semibold mb-1">Leave a Review</h4>

            {selectedRating > 0 && (
              <div className="flex space-x-1 text-yellow-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i}>{i < selectedRating ? '★' : '☆'}</span>
                ))}
              </div>
            )}

            <label className="text-sm font-medium">Rating:</label>
            <div className="flex space-x-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="text-xl focus:outline-none"
                  onClick={() => setSelectedRating(i + 1)}
                >
                  {i < selectedRating ? '★' : '☆'}
                </button>
              ))}
            </div>

            <textarea
              className="w-full border rounded p-2 text-sm mb-2"
              rows={2}
              placeholder="Write your review..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            <Button
              className="text-sm"
              onClick={handleReviewSubmit}
              disabled={!selectedRating || reviewText.trim() === ''}
            >
              Submit Review
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
