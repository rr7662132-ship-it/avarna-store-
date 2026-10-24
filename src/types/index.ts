export interface Product {
  id: string;
  name: string;
  scientificName?: string;
  price: number;
  originalPrice?: number;
  salePrice?: number;
  description: string;
  shortDescription?: string;
  longDescription?: string;
  category: CategoryId;
  image: string;
  images?: string[];
  inStock: boolean;
  stockCount: number;
  sunlight: 'Low Light' | 'Indirect Light' | 'Bright Indirect' | 'Direct Sunlight' | 'Partial Shade';
  watering: string;
  difficulty: 'Easy' | 'Moderate' | 'Expert';
  size?: string;
  petFriendly?: boolean;
  airPurifying?: boolean;
  tags?: string[];
  rating: number;
  reviewCount: number;
  featured?: boolean;
  bestSeller?: boolean;
  newArrival?: boolean;
  createdAt: string;
}

export type CategoryId =
  | 'indoor'
  | 'outdoor'
  | 'flowering'
  | 'succulents'
  | 'air-purifying'
  | 'low-maintenance'
  | 'pots-accessories'
  | (string & {});

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image: string;
  productCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  // Convenience properties matching product for legacy component access
  id?: string;
  productId?: string;
  name?: string;
  price?: number;
  image?: string;
  maxQuantity?: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

export interface Address {
  id: string;
  userId: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface OrderTimelineStep {
  status: string;
  label: string;
  timestamp: string;
  completed: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  address: Address;
  shippingAddress?: Address;
  subtotal: number;
  shipping: number;
  shippingCost?: number;
  discount?: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded' | 'paid';
  estimatedDelivery?: string;
  timeline?: OrderTimelineStep[];
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'out-for-delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  id?: string;
  name?: string;
  image?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  review: string;
  text?: string;
  location?: string;
  product?: string;
  isDemo: boolean;
}

export interface PlantCareTip {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
}
