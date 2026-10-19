import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ChevronRight,
  Heart,
  ShoppingCart,
  Minus,
  Plus,
  Sun,
  Droplets,
  Leaf,
  ArrowLeft,
  Check,
  XCircle,
  PawPrint,
  Wind,
  Ruler,
  Star,
} from 'lucide-react';
import { useProducts } from '../contexts/ProductContext';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { Product } from '../types';
import { categories } from '../data/categories';
import { formatPrice } from '../utils/format';
import ProductCard from '../components/common/ProductCard';
import StarRating from '../components/common/StarRating';
import Layout from '../components/layout/Layout';
import LoadingSpinner from '../components/common/LoadingSpinner';

type TabId = 'description' | 'care' | 'info';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products, loading } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<TabId>('description');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const product = useMemo(
    () => products.find((p) => p.id === id),
    [products, id]
  );

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [products, product]);

  const categoryInfo = useMemo(
    () => categories.find((c) => c.id === product?.category),
    [product]
  );

  const images: string[] = useMemo(() => {
    if (!product) return [];
    if (product.images && product.images.length > 0) return product.images;
    return product.image ? [product.image] : [];
  }, [product]);

  const currentImage = images[selectedImageIndex] ?? '';

  const wishlisted = product ? isInWishlist(product.id) : false;

  // Handlers
  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + delta, 99)));
  };

  const handleAddToCart = () => {
    if (product && product.inStock !== false) {
      addToCart(product, quantity);
    }
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    if (wishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      </Layout>
    );
  }

  // 404 state
  if (!product) {
    return (
      <Layout>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="mx-auto max-w-md">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-sage-100">
              <Leaf size={40} className="text-sage-400" />
            </div>
            <h1 className="font-display text-3xl font-bold text-gray-900">
              Plant Not Found
            </h1>
            <p className="mt-3 text-gray-500">
              Sorry, we couldn't find the plant you're looking for. It may have
              been removed or the link might be incorrect.
            </p>
            <Link
              to="/shop"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-forest-600 px-6 py-3 text-sm font-semibold text-white hover:bg-forest-700 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Shop
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const effectivePrice = product.salePrice ?? product.price;
  const hasDiscount =
    product.salePrice != null && product.salePrice < product.price;
  const discountPercent = hasDiscount
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  const tabs: { id: TabId; label: string }[] = [
    { id: 'description', label: 'Description' },
    { id: 'care', label: 'Plant Care' },
    { id: 'info', label: 'Additional Info' },
  ];

  return (
    <Layout>
      <div className="bg-white">
        {/* Breadcrumbs */}
        <div className="border-b border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center gap-2 text-sm text-gray-500 flex-wrap">
              <Link
                to="/"
                className="hover:text-forest-600 transition-colors"
              >
                Home
              </Link>
              <ChevronRight size={14} />
              <Link
                to="/shop"
                className="hover:text-forest-600 transition-colors"
              >
                Shop
              </Link>
              {categoryInfo && (
                <>
                  <ChevronRight size={14} />
                  <Link
                    to={`/shop?category=${product.category}`}
                    className="hover:text-forest-600 transition-colors"
                  >
                    {categoryInfo.name}
                  </Link>
                </>
              )}
              <ChevronRight size={14} />
              <span className="text-gray-900 font-medium truncate max-w-[200px]">
                {product.name}
              </span>
            </nav>
          </div>
        </div>

        {/* Main product section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* ---- Image column ---- */}
            <div>
              {/* Main image with zoom */}
              <div
                className="relative overflow-hidden rounded-2xl bg-sage-50 aspect-square cursor-crosshair"
                onMouseEnter={() => setIsZooming(true)}
                onMouseLeave={() => setIsZooming(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={currentImage}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-300"
                  style={
                    isZooming
                      ? {
                          transform: 'scale(2)',
                          transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                        }
                      : undefined
                  }
                />
                {hasDiscount && (
                  <span className="absolute top-4 left-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    -{discountPercent}%
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`flex-shrink-0 h-20 w-20 rounded-lg overflow-hidden border-2 transition-colors ${
                        idx === selectedImageIndex
                          ? 'border-forest-600 ring-2 ring-forest-200'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ---- Details column ---- */}
            <div className="flex flex-col">
              {/* Name */}
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Scientific name */}
              {product.scientificName && (
                <p className="mt-1 text-sm italic text-gray-400">
                  {product.scientificName}
                </p>
              )}

              {/* Rating */}
              {product.rating != null && (
                <div className="mt-3 flex items-center gap-2">
                  <StarRating rating={product.rating} />
                  {product.reviewCount != null && (
                    <span className="text-sm text-gray-500">
                      ({product.reviewCount}{' '}
                      {product.reviewCount === 1 ? 'review' : 'reviews'})
                    </span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="mt-5 flex items-end gap-3">
                <span className="text-3xl font-bold text-forest-700">
                  {formatPrice(effectivePrice)}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Stock badge */}
              <div className="mt-4">
                {product.inStock !== false ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 border border-green-200">
                    <Check size={14} />
                    In Stock
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700 border border-red-200">
                    <XCircle size={14} />
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Short description */}
              {product.shortDescription && (
                <p className="mt-5 text-gray-600 leading-relaxed">
                  {product.shortDescription}
                </p>
              )}
              {!product.shortDescription && product.description && (
                <p className="mt-5 text-gray-600 leading-relaxed line-clamp-3">
                  {product.description}
                </p>
              )}

              {/* Divider */}
              <hr className="my-6 border-gray-200" />

              {/* Quantity & Add to Cart */}
              <div className="space-y-4">
                {/* Quantity */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <div className="inline-flex items-center rounded-lg border border-gray-300 overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="flex h-10 w-10 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(
                          Math.max(
                            1,
                            Math.min(99, parseInt(e.target.value) || 1)
                          )
                        )
                      }
                      className="h-10 w-14 border-x border-gray-300 text-center text-sm font-medium focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 99}
                      className="flex h-10 w-10 items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Action buttons */}
                <button
                  onClick={handleAddToCart}
                  disabled={product.inStock === false}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-forest-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-forest-700 active:bg-forest-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ShoppingCart size={20} />
                  {product.inStock === false
                    ? 'Out of Stock'
                    : 'Add to Cart'}
                </button>

                <button
                  onClick={handleToggleWishlist}
                  className={`flex w-full items-center justify-center gap-2 rounded-xl border-2 px-6 py-3 text-base font-semibold transition-colors ${
                    wishlisted
                      ? 'border-red-300 bg-red-50 text-red-600 hover:bg-red-100'
                      : 'border-gray-300 text-gray-700 hover:border-forest-400 hover:text-forest-700'
                  }`}
                >
                  <Heart
                    size={20}
                    className={wishlisted ? 'fill-red-500' : ''}
                  />
                  {wishlisted
                    ? 'Remove from Wishlist'
                    : 'Add to Wishlist'}
                </button>
              </div>

              {/* Quick feature badges */}
              <div className="mt-6 flex flex-wrap gap-3">
                {product.petFriendly && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 border border-emerald-200">
                    <PawPrint size={14} />
                    Pet Friendly
                  </span>
                )}
                {product.airPurifying && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 border border-sky-200">
                    <Wind size={14} />
                    Air Purifying
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* ---- Tabs ---- */}
          <div className="mt-16">
            <div className="border-b border-gray-200">
              <nav className="flex gap-0 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative whitespace-nowrap px-6 py-3 text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-forest-700'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-forest-600 rounded-full" />
                    )}
                  </button>
                ))}
              </nav>
            </div>

            <div className="py-8">
              {/* Description */}
              {activeTab === 'description' && (
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {product.longDescription ?? product.description}
                  </p>
                </div>
              )}

              {/* Plant Care */}
              {activeTab === 'care' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {/* Sunlight */}
                  <div className="rounded-xl bg-amber-50 border border-amber-200 p-6 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
                      <Sun size={24} className="text-amber-600" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800">
                      Sunlight
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {product.sunlight ?? 'Not specified'}
                    </p>
                  </div>

                  {/* Watering */}
                  <div className="rounded-xl bg-blue-50 border border-blue-200 p-6 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                      <Droplets size={24} className="text-blue-600" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800">
                      Watering
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {product.watering ?? 'Not specified'}
                    </p>
                  </div>

                  {/* Difficulty */}
                  <div className="rounded-xl bg-green-50 border border-green-200 p-6 text-center">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                      <Leaf size={24} className="text-green-600" />
                    </div>
                    <h3 className="text-sm font-semibold text-gray-800">
                      Difficulty
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {product.difficulty ?? 'Not specified'}
                    </p>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              {activeTab === 'info' && (
                <div className="overflow-hidden rounded-xl border border-gray-200">
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-gray-200">
                      {product.size && (
                        <tr>
                          <td className="flex items-center gap-2 bg-gray-50 px-5 py-3 font-medium text-gray-700 w-48">
                            <Ruler size={16} className="text-gray-400" />
                            Size
                          </td>
                          <td className="px-5 py-3 text-gray-600">
                            {product.size}
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td className="flex items-center gap-2 bg-gray-50 px-5 py-3 font-medium text-gray-700 w-48">
                          <PawPrint size={16} className="text-gray-400" />
                          Pet Friendly
                        </td>
                        <td className="px-5 py-3 text-gray-600">
                          {product.petFriendly ? (
                            <span className="text-green-600 font-medium">
                              Yes — safe for pets
                            </span>
                          ) : (
                            <span className="text-red-600 font-medium">
                              No — keep away from pets
                            </span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="flex items-center gap-2 bg-gray-50 px-5 py-3 font-medium text-gray-700 w-48">
                          <Wind size={16} className="text-gray-400" />
                          Air Purifying
                        </td>
                        <td className="px-5 py-3 text-gray-600">
                          {product.airPurifying ? (
                            <span className="text-green-600 font-medium">
                              Yes
                            </span>
                          ) : (
                            <span className="text-gray-500">No</span>
                          )}
                        </td>
                      </tr>
                      {categoryInfo && (
                        <tr>
                          <td className="flex items-center gap-2 bg-gray-50 px-5 py-3 font-medium text-gray-700 w-48">
                            <Leaf size={16} className="text-gray-400" />
                            Category
                          </td>
                          <td className="px-5 py-3 text-gray-600">
                            {categoryInfo.name}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* ---- Related Products ---- */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 border-t border-gray-200 pt-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-display text-2xl font-bold text-gray-900">
                  You May Also Like
                </h2>
                <Link
                  to={`/shop?category=${product.category}`}
                  className="text-sm font-medium text-forest-600 hover:text-forest-700 transition-colors"
                >
                  View All →
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rp) => (
                  <ProductCard key={rp.id} product={rp} />
                ))}
              </div>
            </div>
          )}

          {/* Back to shop */}
          <div className="mt-12 text-center">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-medium text-forest-600 hover:text-forest-700 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
