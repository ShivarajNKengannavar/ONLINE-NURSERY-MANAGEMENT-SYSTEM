
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';

const Seeds = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Seeds</h1>
          <ProductGrid filterCategory="Seeds" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Seeds;
