import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Product } from '../types';

function isValidUrl(url: string): boolean {
  return Boolean(
    url &&
    url.startsWith('https://') &&
    !url.includes('placeholder') &&
    !url.includes('your-project-id')
  );
}

export function getActiveSupabaseCredentials(): { url: string; key: string } {
  const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
  const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();
  if (isValidUrl(envUrl) && envKey) {
    return { url: envUrl, key: envKey };
  }

  try {
    const localUrl = (localStorage.getItem('avarna_supabase_url') || '').trim();
    const localKey = (localStorage.getItem('avarna_supabase_key') || '').trim();
    if (isValidUrl(localUrl) && localKey) {
      return { url: localUrl, key: localKey };
    }
  } catch {
    // localStorage not available
  }

  return { url: '', key: '' };
}

let activeClient: SupabaseClient | null = null;

function initClient(): SupabaseClient | null {
  const creds = getActiveSupabaseCredentials();
  if (isValidUrl(creds.url) && creds.key) {
    try {
      return createClient(creds.url, creds.key);
    } catch (err) {
      console.error('Failed to init Supabase client:', err);
      return null;
    }
  }
  return null;
}

activeClient = initClient();

export const isSupabaseConfigured = (): boolean => {
  const creds = getActiveSupabaseCredentials();
  return isValidUrl(creds.url) && Boolean(creds.key);
};

export const getSupabaseClient = (): SupabaseClient | null => {
  if (!activeClient) {
    activeClient = initClient();
  }
  return activeClient;
};

export const supabase = activeClient;

export function saveSupabaseConfig(url: string, key: string): boolean {
  if (!isValidUrl(url) || !key.trim()) return false;
  try {
    localStorage.setItem('avarna_supabase_url', url.trim());
    localStorage.setItem('avarna_supabase_key', key.trim());
    activeClient = createClient(url.trim(), key.trim());
    return true;
  } catch (err) {
    console.error('Failed to save Supabase config:', err);
    return false;
  }
}

export function clearSupabaseConfig(): void {
  try {
    localStorage.removeItem('avarna_supabase_url');
    localStorage.removeItem('avarna_supabase_key');
    activeClient = null;
  } catch (err) {
    console.error('Failed to clear Supabase config:', err);
  }
}

export async function testSupabaseConnection(
  url: string,
  key: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (!isValidUrl(url)) {
      return { success: false, message: 'Invalid URL. Must start with https:// and be a valid project URL.' };
    }
    if (!key.trim()) {
      return { success: false, message: 'Anon Key cannot be blank.' };
    }
    const tempClient = createClient(url.trim(), key.trim());
    const { error } = await tempClient.from('products').select('id').limit(1);
    if (error) {
      return { success: false, message: `Database error: ${error.message}. Ensure table "products" exists.` };
    }
    return { success: true, message: 'Connected to Supabase successfully!' };
  } catch (err: any) {
    return { success: false, message: err.message || 'Connection failed.' };
  }
}

/**
 * Fetch all products from Supabase
 */
export async function getSupabaseProducts(): Promise<Product[] | null> {
  const client = getSupabaseClient();
  if (!client) return null;
  try {
    const { data, error } = await client
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
  const client = getSupabaseClient();
  if (!client) return false;
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

    const { error } = await client.from('products').upsert(row);
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
  const client = getSupabaseClient();
  if (!client) return false;
  try {
    const { error } = await client.from('products').delete().eq('id', id);
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

/**
 * Push all local products to Supabase in batch
 */
export async function syncAllProductsToSupabase(products: Product[]): Promise<{ success: boolean; count: number }> {
  const client = getSupabaseClient();
  if (!client || products.length === 0) return { success: false, count: 0 };
  let count = 0;
  for (const p of products) {
    const ok = await upsertSupabaseProduct(p);
    if (ok) count++;
  }
  return { success: count > 0, count };
}