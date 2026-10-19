import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf } from 'lucide-react';
import { Product } from '../../types';
import ProductCard from '../common/ProductCard';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const displayProducts = products.slice(0, 8);

  if (displayProducts.length === 0) return null;

  return (
    <section className="py-20 lg:py-24 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-800 mb-4">
            Featured Plants
          </h2>
          {/* Decorative leaf underline */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-forest-300" />
            <Leaf className="w-5 h-5 text-forest-500" />
            <div className="h-px w-12 bg-forest-300" />
          </div>
          <p className="text-forest-600 text-lg max-w-md mx-auto">
            Handpicked favourites loved by our customers
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-14">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 bg-forest-500 hover:bg-forest-600 text-white rounded-full px-8 py-4 font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-forest-500/25 hover:-translate-y-0.5"
          >
            View All Plants
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
