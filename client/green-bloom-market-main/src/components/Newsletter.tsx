
/*import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const Newsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
    // Newsletter functionality will be implemented later
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-emerald-50 to-green-50">
      <div className="container mx-auto px-4">
        <Card className="max-w-4xl mx-auto p-12 bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <div className="text-center space-y-6">
            <div className="space-y-4">
              <h2 className="font-playfair text-4xl lg:text-5xl font-bold text-foreground">
                Stay in the Loop
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get the latest plant care tips, seasonal guides, and exclusive offers 
                delivered straight to your inbox. Join our community of plant enthusiasts!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
                  required
                />
                <Button type="submit" className="btn-primary whitespace-nowrap">
                  Subscribe Now
                </Button>
              </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-muted">
              <div className="text-center">
                <div className="text-2xl mb-2">📧</div>
                <h4 className="font-semibold text-foreground">Weekly Tips</h4>
                <p className="text-sm text-muted-foreground">Plant care guides and tutorials</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🎁</div>
                <h4 className="font-semibold text-foreground">Exclusive Offers</h4>
                <p className="text-sm text-muted-foreground">Subscriber-only discounts</p>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🌿</div>
                <h4 className="font-semibold text-foreground">New Arrivals</h4>
                <p className="text-sm text-muted-foreground">Be first to know about new plants</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default Newsletter;*/
