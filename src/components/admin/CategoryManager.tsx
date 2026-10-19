import React from 'react';
import { categories } from '../../data/categories';
import { useProducts } from '../../contexts/ProductContext';
import { FolderTree, Package, Sparkles } from 'lucide-react';

const CategoryManager: React.FC = () => {
  const { products } = useProducts();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Manage Categories</h1>
          <p className="text-sm text-gray-500 mt-1">
            Store collections and botanical departments configured for customer browsing
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-forest-50 text-forest-700 rounded-lg text-sm font-medium border border-forest-200">
          <Sparkles className="w-4 h-4 text-forest-600" />
          <span>7 Active Categories</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => {
          const count = products.filter((p) => p.category === category.id).length;

          return (
            <div
              key={category.id}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="h-44 relative overflow-hidden bg-gray-100">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <span className="font-semibold text-lg drop-shadow-sm">{category.name}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-full font-medium">
                    <Package className="w-3.5 h-3.5" />
                    {count} products
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-3">
                <p className="text-sm text-gray-600 leading-relaxed">
                  {category.description}
                </p>
                <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                  <span>ID: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono">{category.id}</code></span>
                  <span className="text-emerald-700 font-medium">Active in Catalog</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryManager;
