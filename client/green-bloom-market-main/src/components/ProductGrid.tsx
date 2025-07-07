import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';

interface ProductGridProps {
  filterCategory?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ filterCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState(filterCategory || 'All');

  const categories = [
    'All',
    'Indoor Plants',
    'Outdoor Plants',
    'Seeds',
    'Tools & Supplies',
  ];

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['admin-products'],
    queryFn: async () => {
      const stored = localStorage.getItem('admin-products');
      if (stored) return JSON.parse(stored);

      const initialProducts = [
        {
          id: 1,
          name: 'Indoor Peace Lily',
          price: 799,
          image: 'https://images.unsplash.com/photo-1463154545680-d59320fd685d?w=400&h=400&fit=crop',
          category: 'Indoor Plants',
          description: 'Beautiful flowering indoor plant',
          stock: 20,
          rating: 4.6,
          inStock: true,
        },
        {
          id: 2,
          name: 'Tomato Seeds',
          price: 199,
          image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=400&h=400&fit=crop',
          category: 'Seeds',
          description: 'High-yield tomato seeds',
          stock: 100,
          rating: 4.5,
          inStock: true,
        },
        {
          id: 3,
          name: 'Garden Tool Set',
          price: 2499,
          image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop',
          category: 'Tools & Supplies',
          description: 'Complete tool set for garden work',
          stock: 10,
          rating: 4.8,
          inStock: true,
        },
        {
          id: 4,
          name: 'Organic Compost Pack',
          price: 499,
          image: 'https://images.unsplash.com/photo-1617806110874-fb6d7407a1a1?w=400&h=400&fit=crop',
          category: 'Garden Care',
          description: 'Natural compost for healthy plants',
          stock: 30,
          rating: 4.4,
          inStock: true,
        },
        {
          id: 5,
          name: 'Living Room Decor Pot',
          price: 899,
          image: 'https://images.unsplash.com/photo-1616627983130-2b03c9ffb963?w=400&h=400&fit=crop',
          category: 'Home',
          description: 'Aesthetic plant pot for interiors',
          stock: 50,
          rating: 4.7,
          inStock: true,
        },
        {
          id: 6,
          name: 'Snake Plant',
          price: 899,
          image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=400&h=400&fit=crop',
          category: 'Indoor Plants',
          description: 'Perfect low-maintenance indoor plant',
          stock: 25,
          rating: 4.9,
          inStock: true,
        },
        {
          id: 7,
          name: 'Bougainvillea',
          price: 499,
          image: 'https://images.unsplash.com/photo-1597304033589-ffbf3e93e58a?w=400&h=400&fit=crop',
          category: 'Outdoor Plants',
          description: 'Colorful flowering vine ideal for outdoors',
          stock: 18,
          rating: 4.5,
          inStock: true,
        },
        {
          id: 8,
          name: 'Hibiscus Plant',
          price: 599,
          image: 'https://images.unsplash.com/photo-1603133872876-771b8c37a0e7?w=400&h=400&fit=crop',
          category: 'Outdoor Plants',
          description: 'Hardy flowering plant for balconies and gardens',
          stock: 30,
          rating: 4.6,
          inStock: true,
        },
        {
          id: 9,
          name: 'Tomato Plant',
          price: 30,
          image: 'https://www.thespruce.com/thmb/S9QcicSHxYKNsI0fdfXgwbBSIP8=/5750x3827/filters:no_upscale():max_bytes(150000):strip_icc()/growing-tomatoes-1403296-01-e87fc6443b55423890448cabb12efeba.jpg',
          category: 'Outdoor Plants',
          description: 'Vegetable Plants',
          stock: 40,
          rating: 4.6,
          inStock: true,
        },
      ];

      localStorage.setItem('admin-products', JSON.stringify(initialProducts));
      return initialProducts;
    },
    refetchInterval: 1000,
  });

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  if (isLoading) {
    return (
      <section className="py-12 md:py-20 w-full bg-muted/30">
        <div className="px-4 w-full flex justify-center">
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 w-full bg-muted/30">
      <div className="w-full px-4">
        {!filterCategory && (
          <>
            <div className="text-center mb-12 md:mb-16 space-y-4">
              <h2 className="font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Explore Our Collection
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Premium plants and gardening tools curated for your home and garden
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 md:px-6 py-2 rounded-full text-sm md:text-base transition-all duration-200 ${
                    selectedCategory === category
                      ? 'bg-primary text-white'
                      : 'border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  {category}
                </Button>
              ))}
            </div>
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No products found in this category.
          </div>
        )}

        {!filterCategory && filteredProducts.length > 0 && (
          <div className="text-center mt-8 md:mb-12">
 
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
