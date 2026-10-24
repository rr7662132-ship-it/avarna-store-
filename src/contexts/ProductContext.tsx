import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, Category } from '../types';
import { saveToStorage, loadFromStorage, STORAGE_KEYS } from '../utils/storage';
import { generateId } from '../utils/format';
import { products as defaultProducts } from '../data/products';
import { categories as defaultCategories } from '../data/categories';
import {
  isSupabaseConfigured,
  supabase,
  getSupabaseProducts,
  upsertSupabaseProduct,
  deleteSupabaseProduct,
} from '../services/supabase';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ProductContextValue {
  products: Product[];
  categories: Category[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addCategory: (category: Omit<Category, 'productCount'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
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
  const [categories, setCategories] = useState<Category[]>(() => {
    return loadFromStorage<Category[]>('avarna_categories', defaultCategories);
  });
  const [loading, setLoading] = useState(true);

  // Persist categories whenever updated
  useEffect(() => {
    if (categories && categories.length > 0) {
      saveToStorage('avarna_categories', categories);
    }
  }, [categories]);

  // Initialize products from Supabase (if configured) or localStorage
  useEffect(() => {
    let isMounted = true;

    async function initProducts() {
      if (isSupabaseConfigured()) {
        const cloudProducts = await getSupabaseProducts();
        if (cloudProducts && cloudProducts.length > 0 && isMounted) {
          setProducts(cloudProducts);
          saveToStorage(STORAGE_KEYS.PRODUCTS, cloudProducts);
          setLoading(false);
          return;
        } else if (isMounted && defaultProducts.length > 0) {
          // Seed initial products to Supabase if table is empty
          for (const p of defaultProducts) {
            await upsertSupabaseProduct(p);
          }
        }
      }

      // Fallback to local storage or defaults
      const stored = loadFromStorage<Product[] | null>(STORAGE_KEYS.PRODUCTS, null);
      if (stored && stored.length > 0) {
        if (isMounted) setProducts(stored);
      } else {
        if (isMounted) {
          setProducts(defaultProducts);
          saveToStorage(STORAGE_KEYS.PRODUCTS, defaultProducts);
        }
      }
      if (isMounted) setLoading(false);
    }

    initProducts();

    // Setup Realtime subscription if Supabase is connected
    const client = supabase;
    if (isSupabaseConfigured() && client) {
      const channel = client
        .channel('public:products')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'products' },
          async () => {
            const updated = await getSupabaseProducts();
            if (updated && isMounted) {
              setProducts(updated);
              saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
            }
          }
        )
        .subscribe();

      return () => {
        isMounted = false;
        client.removeChannel(channel);
      };
    }

    return () => {
      isMounted = false;
    };
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
      if (isSupabaseConfigured()) {
        upsertSupabaseProduct(newProduct);
      }
    },
    [],
  );

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) => {
      const updated = prev.map((p) => {
        if (p.id === id) {
          const merged = { ...p, ...updates };
          if (isSupabaseConfigured()) {
            upsertSupabaseProduct(merged);
          }
          return merged;
        }
        return p;
      });
      return updated;
    });
  }, []);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => {
      const updated = prev.filter((p) => p.id !== id);
      saveToStorage(STORAGE_KEYS.PRODUCTS, updated);
      if (isSupabaseConfigured()) {
        deleteSupabaseProduct(id);
      }
      return updated;
    });
  }, []);

  const addCategory = useCallback((newCat: Omit<Category, 'productCount'>) => {
    const rawId = newCat.id && newCat.id.trim() ? newCat.id : newCat.name;
    const slug = rawId.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');

    const categoryItem: Category = {
      id: slug || generateId(),
      name: newCat.name.trim(),
      description: newCat.description.trim(),
      image: newCat.image.trim() || 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&h=400&fit=crop',
    };

    setCategories((prev) => {
      const existsIndex = prev.findIndex((c) => c.id === categoryItem.id);
      const updated = existsIndex !== -1
        ? prev.map((c) => (c.id === categoryItem.id ? categoryItem : c))
        : [...prev, categoryItem];
      saveToStorage('avarna_categories', updated);
      return updated;
    });
  }, []);

  const updateCategory = useCallback((id: string, updates: Partial<Category>) => {
    setCategories((prev) => {
      const updated = prev.map((c) => (c.id === id ? { ...c, ...updates } : c));
      saveToStorage('avarna_categories', updated);
      return updated;
    });
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      saveToStorage('avarna_categories', updated);
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
    categories,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    addCategory,
    updateCategory,
    deleteCategory,
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
