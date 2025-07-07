import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';

const Plants = () => {
  return (
    <div className="min-h-screen">
      <Header />

      {/* Completely removed padding/margin to shift content higher */}
      <div>
        <div className="container mx-auto px-4">
          <ProductGrid />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Plants;
