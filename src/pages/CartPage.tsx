import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../utils/format';
import Layout from '../components/layout/Layout';
import EmptyState from '../components/common/EmptyState';

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 99;
const TAX_RATE = 0.05;

const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, subtotal, shipping, tax, total } = useCart();
  const navigate = useNavigate();

  const freeShippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;

  if (items.length === 0) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Looks like you haven't added any plants to your cart yet. Explore our collection and find the perfect green companion!"
            actionLabel="Browse Plants"
            onAction={() => navigate('/shop')}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="mt-1 text-gray-500">
            {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header Row */}
              <div className="hidden sm:grid sm:grid-cols-12 gap-4 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                <div className="col-span-6">Product</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">Quantity</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {/* Items */}
              <ul className="divide-y divide-gray-100">
                {items.map((item) => {
                  const itemId = item.id || item.productId || item.product?.id || '';
                  const itemName = item.name || item.product?.name || 'Plant';
                  const itemImage = item.image || item.product?.image || '';
                  const itemPrice = item.price ?? item.product?.price ?? 0;

                  return (
                    <li key={itemId} className="px-4 sm:px-6 py-4 sm:py-5">
                      <div className="sm:grid sm:grid-cols-12 sm:gap-4 sm:items-center">
                        {/* Product Info */}
                        <div className="col-span-6 flex items-center gap-4">
                          <div className="flex-shrink-0">
                            <img
                              src={itemImage}
                              alt={itemName}
                              className="w-20 h-20 rounded-xl object-cover bg-gray-100"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <Link
                              to={`/product/${itemId}`}
                              className="text-sm font-semibold text-gray-900 hover:text-green-700 transition-colors line-clamp-2"
                            >
                              {itemName}
                            </Link>
                            <button
                              onClick={() => removeFromCart(itemId)}
                              className="mt-2 inline-flex items-center gap-1 text-xs text-red-500 hover:text-red-700 transition-colors group"
                            >
                              <Trash2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
                              Remove
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 mt-3 sm:mt-0 text-center">
                          <span className="sm:hidden text-xs text-gray-500 mr-2">Price:</span>
                          <span className="text-sm text-gray-700">{formatPrice(itemPrice)}</span>
                        </div>

                        {/* Quantity Controls */}
                        <div className="col-span-2 mt-3 sm:mt-0 flex items-center justify-center">
                          <div className="inline-flex items-center border border-gray-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => updateQuantity(itemId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-3 py-1 text-sm font-medium text-gray-900 min-w-[2rem] text-center bg-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(itemId, item.quantity + 1)}
                              disabled={item.quantity >= 10}
                              className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Line Total */}
                        <div className="col-span-2 mt-3 sm:mt-0 text-right">
                          <span className="sm:hidden text-xs text-gray-500 mr-2">Total:</span>
                          <span className="text-sm font-semibold text-gray-900">
                            {formatPrice(itemPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Continue Shopping Link */}
            <div className="mt-4">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-sm text-green-700 hover:text-green-800 font-medium transition-colors"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Order Summary</h2>

              {/* Free Shipping Progress */}
              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <div className="mb-5 p-3 bg-amber-50 rounded-xl border border-amber-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-medium text-amber-800">
                      Add {formatPrice(amountToFreeShipping)} more for free shipping!
                    </span>
                  </div>
                  <div className="w-full bg-amber-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-400 to-green-500 h-full rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>
              )}

              {subtotal >= FREE_SHIPPING_THRESHOLD && (
                <div className="mb-5 p-3 bg-green-50 rounded-xl border border-green-100">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-green-600" />
                    <span className="text-xs font-medium text-green-800">
                      🎉 You've unlocked free shipping!
                    </span>
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="font-medium text-green-600">FREE</span>
                  ) : (
                    <span className="font-medium text-gray-900">{formatPrice(shipping)}</span>
                  )}
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax (5%)</span>
                  <span className="font-medium text-gray-900">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-bold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-green-800">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="mt-6 w-full bg-green-800 hover:bg-green-900 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-green-800/20 hover:shadow-green-800/30 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Continue Shopping */}
              <Link
                to="/shop"
                className="mt-3 w-full block text-center text-sm text-gray-500 hover:text-green-700 transition-colors py-2"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
