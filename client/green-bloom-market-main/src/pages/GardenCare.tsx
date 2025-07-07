// src/pages/GardenCare.tsx

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const GardenCare = () => {
  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <Header />
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Garden Care</h1>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Plant Care Tips</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Water regularly but avoid overwatering.</li>
                  <li>Ensure pots have proper drainage holes.</li>
                  <li>Place in locations with adequate sunlight.</li>
                  <li>Use nutrient-rich soil and organic fertilizers.</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-4">Seasonal Care</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>Summer:</strong> Water frequently, protect from harsh sun.</li>
                  <li><strong>Winter:</strong> Reduce watering, move indoors if needed.</li>
                  <li><strong>Monsoon:</strong> Prevent water stagnation and fungal infections.</li>
                  <li><strong>Spring:</strong> Ideal for pruning and repotting.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GardenCare;
