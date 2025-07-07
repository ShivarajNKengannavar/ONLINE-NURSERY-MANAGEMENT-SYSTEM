
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-300 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="font-playfair text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
                Bring Nature
                <span className="text-gradient block">Home</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Discover our curated collection of premium plants, seeds, and gardening essentials. 
                Transform your space into a green sanctuary with expert guidance and quality products.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/plants">
                <Button className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 w-full sm:w-auto">
                  Shop Plants
                </Button>
              </Link>
              <Link to="/plants">
                <Button variant="outline" className="text-base md:text-lg px-6 md:px-8 py-3 md:py-4 border-primary text-primary hover:bg-primary hover:text-white w-full sm:w-auto">
                  Browse Collection
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 md:gap-8 pt-6 md:pt-8 border-t border-muted">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">500+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Plant Varieties</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">50k+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">99%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Survival Rate</div>
              </div>
            </div>
          </div>

          {/* Right content - Image */}
          <div className="relative animate-slide-in">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=700&fit=crop&crop=center"
                alt="Beautiful indoor plants"
                className="rounded-3xl shadow-2xl w-full h-[400px] md:h-[600px] object-cover"
              />
              
              {/* Floating cards */}
              <div className="absolute -top-2 -left-2 md:-top-4 md:-left-4 bg-white p-3 md:p-4 rounded-2xl shadow-lg animate-fade-in delay-500">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
                  <span className="text-xs md:text-sm font-medium">Free Shipping</span>
                </div>
              </div>
              
              <div className="absolute -bottom-2 -right-2 md:-bottom-4 md:-right-4 bg-white p-3 md:p-4 rounded-2xl shadow-lg animate-fade-in delay-700">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="w-2 h-2 md:w-3 md:h-3 bg-emerald-500 rounded-full"></div>
                  <span className="text-xs md:text-sm font-medium">Expert Care Guide</span>
                </div>
              </div>
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-primary/10 rounded-3xl transform rotate-6 -z-10"></div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-5 h-5 md:w-6 md:h-6 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
