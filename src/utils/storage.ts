/**
 * localStorage utility functions for persistent data storage.
 * Provides type-safe wrappers around localStorage with JSON serialization.
 */

export const STORAGE_KEYS = {
  CART: 'avarna_cart',
  WISHLIST: 'avarna_wishlist',
  USER: 'avarna_user',
  ORDERS: 'avarna_orders',
  ADDRESSES: 'avarna_addresses',
  PRODUCTS: 'avarna_products',
  ADMIN_AUTH: 'avarna_admin_auth',
} as const;

/**
 * Save data to localStorage with JSON serialization.
 */
export function saveToStorage<T>(key: string, data: T): void {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(key, serialized);
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
}

/**
 * Load data from localStorage with JSON deserialization.
 * Returns the fallback value if the key doesn't exist or parsing fails.
 */
export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const serialized = localStorage.getItem(key);
    if (serialized === null) {
      return fallback;
    }
    return JSON.parse(serialized) as T;
  } catch (error) {
    console.error(`Error loading from localStorage key "${key}":`, error);
    return fallback;
  }
}

/**
 * Remove a key from localStorage.
 */
export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing localStorage key "${key}":`, error);
  }
}
