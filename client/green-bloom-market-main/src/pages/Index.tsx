import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductGrid from '../components/ProductGrid';
import Footer from '../components/Footer';
import PlantChatbot from '../components/PlantChatbot';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <ProductGrid />
      
    </div>
  );
};

export default Index;
