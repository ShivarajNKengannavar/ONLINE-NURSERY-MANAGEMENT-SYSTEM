
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const storedWishlist = localStorage.getItem(`wishlist-${user.id}`);
      if (storedWishlist) {
        setWishlistItems(JSON.parse(storedWishlist));
      }
    } else {
      setWishlistItems([]);
    }
  }, [user]);

  const addToWishlist = (item: WishlistItem) => {
    if (!user) return;
    
    const updatedWishlist = [...wishlistItems, item];
    setWishlistItems(updatedWishlist);
    localStorage.setItem(`wishlist-${user.id}`, JSON.stringify(updatedWishlist));
  };

  const removeFromWishlist = (id: number) => {
    if (!user) return;
    
    const updatedWishlist = wishlistItems.filter(item => item.id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem(`wishlist-${user.id}`, JSON.stringify(updatedWishlist));
  };

  const isInWishlist = (id: number) => {
    return wishlistItems.some(item => item.id === id);
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
