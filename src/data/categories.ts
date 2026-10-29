import { Category, CategoryId } from '../types';

export const categories: Category[] = [
  {
    id: 'indoor',
    name: 'Indoor Plants',
    description: 'Beautiful plants that thrive indoors, perfect for homes and offices.',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 'outdoor',
    name: 'Outdoor Plants',
    description: 'Hardy plants that flourish in gardens, balconies, and patios.',
    image: 'https://images.unsplash.com/photo-1588628566587-dbd176de94b4?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 'flowering',
    name: 'Flowering Plants',
    description: 'Add colour and fragrance to your space with our flowering collection.',
    image: 'https://images.unsplash.com/photo-1550950158-d0d960dff51b?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 'succulents',
    name: 'Succulents & Cacti',
    description: 'Low-water, high-style plants for modern spaces.',
    image: 'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 'air-purifying',
    name: 'Air-Purifying Plants',
    description: 'Clean your air naturally with these NASA-recommended plants.',
    image: 'https://images.unsplash.com/photo-1563769874043-9eac75ae0049?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 'low-maintenance',
    name: 'Low-Maintenance Plants',
    description: 'Perfect for beginners and busy plant parents.',
    image: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=800&h=600&fit=crop&q=80',
  },
  {
    id: 'pots-accessories',
    name: 'Pots & Accessories',
    description: 'Beautiful planters, tools, and care accessories.',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=600&fit=crop&q=80',
  },
];

export function getCategoryById(id: CategoryId): Category | undefined {
  return categories.find(c => c.id === id);
}

export function getCategoryName(id: CategoryId): string {
  return getCategoryById(id)?.name || id;
}
