import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../contexts/CartContext';
import { useWishlist } from '../../contexts/WishlistContext';
import { formatPrice } from '../../utils/format';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const wishlisted = isInWishlist(product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.inStock) {
      addToCart(product);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-xl bg-white shadow-sm transition-all duration-300 hover:shadow-lg ${className}`}
    >
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="relative block aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />

        {/* Quick View Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-forest-800 shadow-lg backdrop-blur-sm">
            <Eye className="h-4 w-4" />
            Quick View
          </span>
        </div>

        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {product.category && (
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-forest-700 backdrop-blur-sm">
              {product.category}
            </span>
          )}
          {product.newArrival && (
            <span className="rounded-full bg-forest-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
              New
            </span>
          )}
          {hasDiscount && (
            <span className="rounded-full bg-rose-500 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px]">
            <span className="rounded-full bg-gray-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
              Out of Stock
            </span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full shadow-md transition-all duration-200 ${
            wishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-white/90 text-gray-600 hover:bg-white hover:text-rose-500'
          }`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`h-4 w-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-sm font-semibold text-gray-900 transition-colors hover:text-forest-700 line-clamp-1 sm:text-base">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating !== undefined && (
          <div className="mt-1.5">
            <StarRating
              rating={product.rating}
              size="sm"
              showCount={!!product.reviewCount}
              count={product.reviewCount}
            />
          </div>
        )}

        {/* Price + Cart */}
        <div className="mt-3 flex items-end justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-forest-800">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.originalPrice!)}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
              product.inStock
                ? 'bg-forest-600 text-white shadow-sm hover:bg-forest-700 hover:shadow-md active:scale-95'
                : 'cursor-not-allowed bg-gray-200 text-gray-400'
            }`}
            aria-label="Add to cart"
          >
            <ShoppingBag className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
