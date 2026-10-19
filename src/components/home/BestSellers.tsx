import React from 'react';
import { TrendingUp } from 'lucide-react';
import { Product } from '../../types';
import ProductCard from '../common/ProductCard';

interface BestSellersProps {
  products: Product[];
}

const BestSellers: React.FC<BestSellersProps> = ({ products }) => {
  const displayProducts = products.slice(0, 6);

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-20 lg:py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 rounded-full px-4 py-2 mb-4">
            <TrendingUp className="w-5 h-5" />
            <span className="font-semibold text-sm">Trending</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-800 mb-4">
            Bestsellers
          </h2>
          <p className="text-forest-600 text-lg max-w-md mx-auto">
            Our most popular plants that customers can't stop buying
          </p>
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="lg:hidden flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {displayProducts.map((product, index) => (
            <div key={product.id} className="relative flex-shrink-0 w-72 snap-start">
              {/* Ranking Badge */}
              <div className="absolute -top-2 -left-2 z-10 w-10 h-10 bg-forest-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                {index + 1}
              </div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid grid-cols-3 gap-8">
          {displayProducts.map((product, index) => (
            <div key={product.id} className="relative">
              {/* Ranking Badge */}
              <div className={`absolute -top-3 -left-3 z-10 w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg shadow-lg ${
                index === 0
                  ? 'bg-yellow-400 text-yellow-900'
                  : index === 1
                  ? 'bg-gray-300 text-gray-700'
                  : index === 2
                  ? 'bg-amber-600 text-white'
                  : 'bg-forest-600 text-white'
              }`}>
                {index + 1}
              </div>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellers;
