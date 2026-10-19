import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '../types';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../utils/storage';
import { generateId } from '../utils/format';
import { products as defaultProducts } from '../data/products';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ProductContextValue {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  getProductsByCategory: (category: string) => Product[];
  searchProducts: (query: string) => Product[];
  getFeaturedProducts: () => Product[];
  getBestSellers: () => Product[];
  getNewArrivals: () => Product[];
}

/* ------------------------------------------------------------------ */
/*  Context & Provider                                                 */
/* ------------------------------------------------------------------ */

const ProductContext = createContext<ProductContextValue | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize products from localStorage, falling back to default data
  useEffect(() => {
    const stored = loadFromStorage<Product[] | null>(STORAGE_KEYS.PRODUCTS, null);
    if (stored && stored.length > 0) {
      setProducts(stored);
    } else {
      setProducts(defaultProducts);
      saveToStorage(STORAGE_KEYS.PRODUCTS, defaultProducts);
    }
    setLoading(false);
  }, []);

  // Persist whenever products change (skip initial empty state)
  useEffect(() => {
    if (!loading && products.length > 0) {
      saveToStorage(STORAGE_KEYS.PRODUCTS, products);
    }
  }, [products, loading]);

  /* ---- Actions ---- */

  const addProduct = useCallback(
    (product: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => {
      const newProduct: Product = {
        ...product,
        id: generateId(),
        createdAt: new Date().toISOString(),
        rating: 0,
        reviewCount: 0,
      };
      setProducts((prev) => [...prev, newProduct]);
    },
    [],
  );

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p)),
    );
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
      return updated;
    });
  }, []);

  const getProduct = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products],
  );

  const getProductsByCategory = useCallback(
    (category: string) =>
      products.filter((p) => p.category.toLowerCase() === category.toLowerCase()),
    [products],
  );

  const searchProducts = useCallback(
    (query: string) => {
      const q = query.toLowerCase().trim();
      if (!q) return products;
      return products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.tags && p.tags.some((tag) => tag.toLowerCase().includes(q))),
      );
    },
    [products],
  );

  const getFeaturedProducts = useCallback(
    () => products.filter((p) => p.featured),
    [products],
  );

  const getBestSellers = useCallback(
    () => products.filter((p) => p.bestSeller),
    [products],
  );

  const getNewArrivals = useCallback(
    () =>
      [...products]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 8),
    [products],
  );

  const value: ProductContextValue = {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    getProduct,
    getProductsByCategory,
    searchProducts,
    getFeaturedProducts,
    getBestSellers,
    getNewArrivals,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

/**
 * Custom hook to access the ProductContext.
 * Throws if used outside of a ProductProvider.
 */
export function useProducts(): ProductContextValue {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
