import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Leaf, Droplets, Sun } from 'lucide-react';

const HeroBanner: React.FC = () => {
  return (
    <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop"
          alt="Beautiful plants"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex-1 max-w-2xl animate-fade-in">
            {/* Badge */}
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full mb-6 border border-white/20">
              🌿 Welcome to AVARNA
            </span>

            {/* Headline */}
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Bring Nature{' '}
              <span className="text-forest-400">Home</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-cream-100 mb-10 leading-relaxed max-w-xl">
              Discover beautiful plants to make every space greener. Hand-picked,
              delivered with care.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 bg-forest-500 hover:bg-forest-600 text-white rounded-full px-8 py-4 font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-forest-500/25 hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-5 h-5" />
                Shop Now
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white rounded-full px-8 py-4 font-semibold text-lg transition-all duration-300 hover:bg-white hover:text-forest-800 hover:-translate-y-0.5"
              >
                Explore Collections
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Floating Plant Card (Desktop only) */}
          <div className="hidden lg:block flex-shrink-0 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Main floating card */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl transform hover:scale-105 transition-transform duration-500 animate-float">
                <div className="w-64 h-72 rounded-2xl overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500&h=600&fit=crop"
                    alt="Monstera Deliciosa"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-white">
                  <p className="text-sm text-cream-200 mb-1">Trending Now</p>
                  <h3 className="font-display text-xl font-semibold">Monstera Deliciosa</h3>
                  <p className="text-forest-300 font-bold mt-1">₹899</p>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-forest-500 text-white rounded-full p-3 shadow-lg animate-bounce-slow">
                <Leaf className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-3 -left-3 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20 flex items-center gap-2 text-white text-sm">
                <Droplets className="w-4 h-4 text-blue-300" />
                Easy Care
              </div>
              <div className="absolute top-1/2 -right-8 bg-white/15 backdrop-blur-sm rounded-2xl px-4 py-2 border border-white/20 flex items-center gap-2 text-white text-sm">
                <Sun className="w-4 h-4 text-yellow-300" />
                Low Light
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-cream-50 to-transparent" />
    </section>
  );
};

export default HeroBanner;
