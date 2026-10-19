import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import ProductCard from '../common/ProductCard';

interface NewArrivalsProps {
  products: Product[];
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ products }) => {
  const displayProducts = products.slice(0, 6);

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-forest-50 via-sage-50 to-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-forest-100 text-forest-700 rounded-full px-4 py-2 mb-4">
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold text-sm">Just In</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-800 mb-4">
            New Arrivals
          </h2>
          <p className="text-forest-600 text-lg max-w-md mx-auto">
            Fresh additions to our green family — be the first to bring them home
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayProducts.map((product) => (
            <div key={product.id} className="relative">
              {/* NEW Badge */}
              <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-forest-500 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-md animate-pulse">
                ✨ NEW
              </div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-14">
          <Link
            to="/shop?sort=newest"
            className="inline-flex items-center gap-2 text-forest-700 hover:text-forest-900 font-semibold text-lg transition-colors duration-300 group"
          >
            See All New Arrivals
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewArrivals;
