import { Category, CategoryId } from '../types';

export const categories: Category[] = [
  {
    id: 'indoor',
    name: 'Indoor Plants',
    description: 'Beautiful plants that thrive indoors, perfect for homes and offices.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
  },
  {
    id: 'outdoor',
    name: 'Outdoor Plants',
    description: 'Hardy plants that flourish in gardens, balconies, and patios.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=400&fit=crop',
  },
  {
    id: 'flowering',
    name: 'Flowering Plants',
    description: 'Add colour and fragrance to your space with our flowering collection.',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&h=400&fit=crop',
  },
  {
    id: 'succulents',
    name: 'Succulents & Cacti',
    description: 'Low-water, high-style plants for modern spaces.',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=400&fit=crop',
  },
  {
    id: 'air-purifying',
    name: 'Air-Purifying Plants',
    description: 'Clean your air naturally with these NASA-recommended plants.',
    image: 'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=600&h=400&fit=crop',
  },
  {
    id: 'low-maintenance',
    name: 'Low-Maintenance Plants',
    description: 'Perfect for beginners and busy plant parents.',
    image: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&h=400&fit=crop',
  },
  {
    id: 'pots-accessories',
    name: 'Pots & Accessories',
    description: 'Beautiful planters, tools, and care accessories.',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=400&fit=crop',
  },
];

export function getCategoryById(id: CategoryId): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getCategoryName(id: CategoryId): string {
  return getCategoryById(id)?.name || id;
}
