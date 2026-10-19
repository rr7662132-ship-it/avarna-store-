import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, ChevronRight } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/common/ProductCard';
import Layout from '../components/layout/Layout';
import EmptyState from '../components/common/EmptyState';
import LoadingSpinner from '../components/common/LoadingSpinner';

const WishlistPage: React.FC = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { products, loading } = useProducts();

  // Resolve wishlist items to full product objects
  const wishlistProducts = products.filter((p) => items.includes(p.id));

  const handleMoveToCart = (product: (typeof wishlistProducts)[0]) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-sage-50 min-h-screen">
        {/* Breadcrumbs */}
        <div className="bg-white border-b border-gray-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-500">
              <Link
                to="/"
                className="hover:text-forest-600 transition-colors"
              >
                Home
              </Link>
              <ChevronRight size={14} />
              <span className="text-gray-900 font-medium">My Wishlist</span>
            </nav>
            <div className="mt-2 flex items-center justify-between">
              <h1 className="font-display text-3xl font-bold text-gray-900">
                My Wishlist
              </h1>
            </div>
            {wishlistProducts.length > 0 && (
              <p className="mt-1 text-gray-500">
                {wishlistProducts.length}{' '}
                {wishlistProducts.length === 1 ? 'item' : 'items'} saved
              </p>
            )}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {wishlistProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="group relative">
                  <ProductCard product={product} />

                  {/* Action overlay */}
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleMoveToCart(product)}
                      disabled={product.inStock === false}
                      className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-forest-600 px-3 py-2 text-xs font-semibold text-white hover:bg-forest-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ShoppingCart size={14} />
                      Move to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="flex items-center justify-center rounded-lg border border-red-300 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Heart size={14} className="fill-red-500" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="Your wishlist is empty"
              description="Save your favourite plants here so you never lose track of them. Browse our collection and tap the heart icon to get started!"
              icon={Heart}
              actionLabel="Browse Plants"
              onAction={() => window.location.assign('/shop')}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WishlistPage;
