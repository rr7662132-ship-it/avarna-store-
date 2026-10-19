import { createClient } from '@supabase/supabase-js';
import { Product } from '../types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

/**
 * Checks whether user has provided valid Supabase credentials
 */
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('https://') &&
    !supabaseUrl.includes('placeholder') &&
    !supabaseUrl.includes('your-project-id')
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Fetch all products from Supabase
 */
export async function getSupabaseProducts(): Promise<Product[] | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('Supabase fetch error, fallback to local:', error.message);
      return null;
    }

    if (!data || data.length === 0) return null;

    return data.map((item) => ({
      id: item.id,
      name: item.name,
      scientificName: item.scientific_name || item.scientificName,
      price: Number(item.price),
      originalPrice: item.original_price ? Number(item.original_price) : (item.originalPrice ? Number(item.originalPrice) : undefined),
      salePrice: item.sale_price ? Number(item.sale_price) : (item.salePrice ? Number(item.salePrice) : undefined),
      description: item.description,
      shortDescription: item.short_description || item.shortDescription,
      longDescription: item.long_description || item.longDescription,
      category: item.category,
      image: item.image,
      images: item.images,
      inStock: Boolean(item.in_stock ?? item.inStock),
      stockCount: Number(item.stock_count ?? item.stockCount ?? 10),
      sunlight: item.sunlight || 'Indirect Light',
      watering: item.watering || 'Moderate watering',
      difficulty: item.difficulty || 'Easy',
      size: item.size,
      petFriendly: Boolean(item.pet_friendly ?? item.petFriendly),
      airPurifying: Boolean(item.air_purifying ?? item.airPurifying),
      tags: Array.isArray(item.tags) ? item.tags : undefined,
      rating: Number(item.rating || 4.5),
      reviewCount: Number(item.review_count ?? item.reviewCount ?? 0),
      featured: Boolean(item.featured),
      bestSeller: Boolean(item.best_seller ?? item.bestSeller),
      newArrival: Boolean(item.new_arrival ?? item.newArrival),
      createdAt: item.created_at || item.createdAt || new Date().toISOString(),
    }));
  } catch (err) {
    console.error('Error fetching Supabase products:', err);
    return null;
  }
}

/**
 * Upsert a product to Supabase
 */
export async function upsertSupabaseProduct(product: Product): Promise<boolean> {
  if (!supabase) return false;
  try {
    const row = {
      id: product.id,
      name: product.name,
      scientific_name: product.scientificName,
      price: product.price,
      original_price: product.originalPrice,
      sale_price: product.salePrice,
      description: product.description,
      short_description: product.shortDescription,
      long_description: product.longDescription,
      category: product.category,
      image: product.image,
      images: product.images,
      in_stock: product.inStock,
      stock_count: product.stockCount,
      sunlight: product.sunlight,
      watering: product.watering,
      difficulty: product.difficulty,
      size: product.size,
      pet_friendly: product.petFriendly,
      air_purifying: product.airPurifying,
      tags: product.tags,
      rating: product.rating,
      review_count: product.reviewCount,
      featured: product.featured,
      best_seller: product.bestSeller,
      new_arrival: product.newArrival,
      created_at: product.createdAt,
    };

    const { error } = await supabase.from('products').upsert(row);
    if (error) {
      console.error('Error saving to Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to upsert product:', err);
    return false;
  }
}

/**
 * Delete a product from Supabase
 */
export async function deleteSupabaseProduct(id: string): Promise<boolean> {
  if (!supabase) return false;
  try {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error('Error deleting from Supabase:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to delete product from Supabase:', err);
    return false;
  }
}
