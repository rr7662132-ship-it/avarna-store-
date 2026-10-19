import { Testimonial, PlantCareTip } from '../types';

export const testimonials: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Ananya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
    review:
      'AVARNA completely transformed my apartment in Bengaluru! The Monstera arrived impeccably packaged, lush green, and even healthier than local nursery plants. Outstanding service!',
    product: 'Monstera Deliciosa',
    isDemo: true,
  },
  {
    id: 'test-2',
    name: 'Vikramaditya Roy',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
    review:
      'As a beginner plant parent, the detailed care instructions for the Snake Plant and ZZ Plant were lifesavers. 3 months in and both are growing vigorous new shoots.',
    product: 'Snake Plant Laurentii',
    isDemo: true,
  },
  {
    id: 'test-3',
    name: 'Priyanka Patel',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
    rating: 5,
    review:
      'The ceramic planter sets are gorgeous and elevate my living room aesthetic. Fast delivery to Mumbai and zero transit damage. AVARNA is my go-to plant boutique now.',
    product: 'Ceramic Planter Set',
    isDemo: true,
  },
  {
    id: 'test-4',
    name: 'Rohan Mehra',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    rating: 4,
    review:
      'Great selection of air-purifying varieties. The Peace Lily blooms beautifully on my study desk. Really appreciate the transparent pricing in rupees and genuine customer support.',
    product: 'Peace Lily',
    isDemo: true,
  },
  {
    id: 'test-5',
    name: 'Dr. Sneha Kulkarni',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    rating: 5,
    review:
      'Ordered 8 succulents for my clinic balcony. Each one was securely nested with soil moist and healthy root systems intact. Highly recommended for botanical lovers.',
    product: 'Echeveria Elegans',
    isDemo: true,
  },
  {
    id: 'test-6',
    name: 'Arjun Das',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop',
    rating: 5,
    review:
      'Top-notch botanical store. The Fiddle Leaf Fig is the crown jewel of our drawing room. Pristine foliage and very sturdy pot.',
    product: 'Fiddle Leaf Fig',
    isDemo: true,
  },
];

export const plantCareTips: PlantCareTip[] = [
  {
    id: 'tip-1',
    title: 'Mastering the Finger Test: How to Avoid Overwatering',
    excerpt:
      'Overwatering is the #1 killer of indoor houseplants. Learn how to test soil moisture 2 inches down and read your plants thirst signals accurately.',
    image:
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
    category: 'Watering & Moisture',
  },
  {
    id: 'tip-2',
    title: 'Decoding Sunlight: Bright Indirect vs Direct Light',
    excerpt:
      'Discover the sweet spot for your tropical flora. Why harsh afternoon rays scorch leaves and how sheer curtains create ideal forest-canopy diffusion.',
    image:
      'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?w=600&h=400&fit=crop',
    category: 'Light Requirements',
  },
  {
    id: 'tip-3',
    title: 'Natural Air Purifiers for Urban Indian Apartments',
    excerpt:
      'NASA clean air study highlights: How Snake Plants, Areca Palms, and Spider Plants filter benzene, formaldehyde, and dust from metropolitan homes.',
    image:
      'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=600&h=400&fit=crop',
    category: 'Wellness & Living',
  },
  {
    id: 'tip-4',
    title: 'Potting & Drainage Essentials for Indian Climates',
    excerpt:
      'Why drainage holes are non-negotiable and how to blend perlite, cocopeat, and compost for tropical monsoons and dry summers alike.',
    image:
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=600&h=400&fit=crop',
    category: 'Repotting Guide',
  },
  {
    id: 'tip-5',
    title: 'Fertilizing During Spring & Summer Growth Spurts',
    excerpt:
      'Feed your leafy companions organically during active growth cycles with seaweed extract and vermicompost for vibrant green foliage.',
    image:
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=400&fit=crop',
    category: 'Plant Nutrition',
  },
  {
    id: 'tip-6',
    title: 'Pet-Safe Plant Selection: Keeping Furry Friends Safe',
    excerpt:
      'A comprehensive guide to non-toxic houseplants including Calatheas, Boston Ferns, and Spider Plants safe for cats and dogs.',
    image:
      'https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&h=400&fit=crop',
    category: 'Pet Friendly',
  },
];
