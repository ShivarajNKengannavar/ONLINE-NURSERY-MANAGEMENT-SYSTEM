
import React from 'react';
import { Card } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: '🚚',
      title: 'Free Shipping',
      description: 'Free delivery on orders over $50. Fast and secure shipping nationwide.',
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      icon: '🌱',
      title: 'Plant Care Guide',
      description: 'Expert care instructions with every plant. 24/7 support from our botanists.',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: '💯',
      title: 'Quality Guarantee',
      description: '30-day money-back guarantee. We ensure every plant arrives healthy.',
      color: 'bg-teal-100 text-teal-600'
    },
    {
      icon: '🔄',
      title: 'Easy Returns',
      description: 'Hassle-free returns within 30 days. Customer satisfaction is our priority.',
      color: 'bg-cyan-100 text-cyan-600'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground">
            Why Choose Green Bloom?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best experience for plant lovers everywhere
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white">
              <div className={`w-16 h-16 rounded-full ${feature.color} flex items-center justify-center mx-auto mb-6 text-2xl`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
