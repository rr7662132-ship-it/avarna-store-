import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';

const CategoryGrid: React.FC = () => {
  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-forest-800 mb-4">
            Shop by Category
          </h2>
          <p className="text-forest-600 text-lg max-w-md mx-auto">
            Find the perfect plant for every corner of your home
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/shop?category=${category.id}`}
              className="group relative rounded-2xl overflow-hidden h-64 lg:h-72 shadow-md hover:shadow-xl transition-all duration-500 transform hover:scale-[1.03]"
            >
              {/* Category Image */}
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-display text-2xl font-bold text-white mb-1 transform transition-transform duration-300 group-hover:-translate-y-1">
                  {category.name}
                </h3>
                <p className="text-cream-200 text-sm">
                  {category.productCount || 'Browse'} {category.productCount ? 'Products' : 'Collection'}
                </p>
                <div className="mt-3 inline-flex items-center gap-1 text-forest-300 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Explore →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
