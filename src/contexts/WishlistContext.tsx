import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../utils/storage';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface WishlistContextValue {
  items: string[];
  itemCount: number;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

/* ------------------------------------------------------------------ */
/*  Context & Provider                                                 */
/* ------------------------------------------------------------------ */

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<string[]>(() =>
    loadFromStorage<string[]>(STORAGE_KEYS.WISHLIST, []),
  );

  // Persist to localStorage on every change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.WISHLIST, items);
  }, [items]);

  /* ---- Actions ---- */

  const addToWishlist = useCallback((productId: string) => {
    setItems((prev) => {
      if (prev.includes(productId)) return prev;
      return [...prev, productId];
    });
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setItems((prev) => prev.filter((id) => id !== productId));
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setItems((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  }, []);

  const isInWishlist = useCallback(
    (productId: string) => items.includes(productId),
    [items],
  );

  const value: WishlistContextValue = {
    items,
    itemCount: items.length,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

/**
 * Custom hook to access the WishlistContext.
 * Throws if used outside of a WishlistProvider.
 */
export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
