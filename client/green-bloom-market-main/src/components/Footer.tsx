import React from 'react';
import { Facebook, Instagram, Youtube, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">🌿</span>
              </div>
              <div>
                <h3 className="font-playfair text-xl font-bold">Green Bloom</h3>
                <p className="text-sm text-gray-400">Premium Plant Nursery</p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Bringing nature closer to you with premium plants, expert care guides, 
              and sustainable gardening solutions. Growing communities, one plant at a time.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Join Our Newsletter</h4>
            <p className="text-gray-300 text-sm">
              Get plant care tips, exclusive offers, and updates delivered straight to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <Input type="email" placeholder="Enter your email" className="bg-white text-black" />
              <Button className="w-full sm:w-auto">Subscribe</Button>
            </div>
          </div>

          {/* Gardening Tips */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Gardening Tips</h4>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>🪴 Water early in the morning for best absorption.</li>
              <li>🌱 Use compost to naturally boost soil health.</li>
              <li>🌞 Rotate plants weekly for even sunlight exposure.</li>
              <li>🐞 Encourage ladybugs to help with pests.</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Get in Touch</h4>
            <div className="space-y-4">
              <div>
                <p className="text-gray-300">📍 Main Road</p>
                <p className="text-gray-300">Bangalore, Karnataka</p>
              </div>
              <div>
                <p className="text-gray-300">📞 xxxxxxxxxx</p>
                <p className="text-gray-300">📧 xxx@gmail.com</p>
              </div>
              <div>
                <p className="text-gray-300 font-medium">Store Hours:</p>
                <p className="text-gray-300">Mon-Fri: 9AM-7PM</p>
                <p className="text-gray-300">Sat-Sun: 10AM-6PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Green Bloom Nursery. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
