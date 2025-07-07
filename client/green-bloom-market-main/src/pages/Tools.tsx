// src/pages/Tools.tsx

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductGrid from '../components/ProductGrid';

const Tools = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Tools & Supplies</h1>
          <ProductGrid filterCategory="Tools & Supplies" />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tools;
