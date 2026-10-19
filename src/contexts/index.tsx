import React from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { ProductProvider, useProducts } from './ProductContext';
import { CartProvider, useCart } from './CartContext';
import { WishlistProvider, useWishlist } from './WishlistContext';
import { OrderProvider, useOrders } from './OrderContext';

import { ToastProvider, useToast } from '../components/common/Toast';

/* ------------------------------------------------------------------ */
/*  AppProviders – wraps the entire app with all context providers      */
/*  Order: Toast > Auth > Product > Cart > Wishlist > Order            */
/* ------------------------------------------------------------------ */

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ToastProvider>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <WishlistProvider>
              <OrderProvider>
                {children}
              </OrderProvider>
            </WishlistProvider>
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </ToastProvider>
  );
};

/* ------------------------------------------------------------------ */
/*  Re-export all context hooks for convenient single-file imports     */
/* ------------------------------------------------------------------ */

export { useAuth } from './AuthContext';
export { useCart } from './CartContext';
export { useWishlist } from './WishlistContext';
export { useProducts } from './ProductContext';
export { useOrders } from './OrderContext';
export { useToast } from '../components/common/Toast';

export { AuthProvider } from './AuthContext';
export { CartProvider } from './CartContext';
export { WishlistProvider } from './WishlistContext';
export { ProductProvider } from './ProductContext';
export { OrderProvider } from './OrderContext';
