import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { Product, CartItem } from '../types';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../utils/storage';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

interface CartContextValue extends CartState {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  getCartItem: (productId: string) => CartItem | undefined;
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const FREE_SHIPPING_THRESHOLD = 999;
const SHIPPING_COST = 99;
const TAX_RATE = 0.05; // 5%

/* ------------------------------------------------------------------ */
/*  Context & Provider                                                 */
/* ------------------------------------------------------------------ */

const CartContext = createContext<CartContextValue | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() =>
    loadFromStorage<CartItem[]>(STORAGE_KEYS.CART, []),
  );

  // Persist to localStorage on every change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CART, items);
  }, [items]);

  // Derived totals – recalculated whenever items change
  const { itemCount, subtotal, shipping, tax, total } = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const sub = items.reduce(
      (sum, item) => sum + (item.price ?? item.product?.price ?? 0) * item.quantity,
      0
    );
    const ship = sub >= FREE_SHIPPING_THRESHOLD || sub === 0 ? 0 : SHIPPING_COST;
    const t = Math.round(sub * TAX_RATE);
    return {
      itemCount: count,
      subtotal: sub,
      shipping: ship,
      tax: t,
      total: sub + ship + t,
    };
  }, [items]);

  /* ---- Actions ---- */

  const addToCart = useCallback((product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => (item.id || item.productId || item.product?.id) === product.id
      );
      if (existing) {
        return prev.map((item) =>
          (item.id || item.productId || item.product?.id) === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      const newItem: CartItem = {
        product,
        quantity,
        id: product.id,
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        maxQuantity: product.stockCount,
      };
      return [...prev, newItem];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => (item.id || item.productId || item.product?.id) !== productId
      )
    );
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) =>
        prev.filter(
          (item) => (item.id || item.productId || item.product?.id) !== productId
        )
      );
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        (item.id || item.productId || item.product?.id) === productId
          ? { ...item, quantity }
          : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback(
    (productId: string) =>
      items.some(
        (item) => (item.id || item.productId || item.product?.id) === productId
      ),
    [items]
  );

  const getCartItem = useCallback(
    (productId: string) =>
      items.find(
        (item) => (item.id || item.productId || item.product?.id) === productId
      ),
    [items]
  );

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    shipping,
    tax,
    total,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * Custom hook to access the CartContext.
 * Throws if used outside of a CartProvider.
 */
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
