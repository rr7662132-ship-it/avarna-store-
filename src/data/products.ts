import { Product, CategoryId } from '../types';

export const products: Product[] = [
  // ─── INDOOR PLANTS ────────────────────────────────────────────────
  {
    id: 'monstera-deliciosa',
    name: 'Monstera Deliciosa',
    price: 899,
    originalPrice: 1199,
    description:
      'The iconic Swiss Cheese Plant with dramatic split leaves. A statement piece that brings tropical vibes to any indoor space. Thrives in bright, indirect light.',
    longDescription:
      'The Monstera Deliciosa, commonly known as the Swiss Cheese Plant, is one of the most popular houseplants worldwide. Its large, glossy, heart-shaped leaves develop unique perforations as the plant matures, creating an eye-catching tropical aesthetic. Native to Central American rainforests, this climbing plant adapts beautifully to indoor environments. It prefers bright, indirect light but tolerates lower light conditions. Water when the top inch of soil feels dry and provide a moss pole for climbing support. With proper care, it can grow several feet tall indoors.',
    category: 'indoor',
    image:
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 25,
    sunlight: 'Bright Indirect',
    watering: 'Water when top inch of soil is dry, approximately once a week',
    difficulty: 'Easy',
    size: 'Medium (30-45 cm)',
    petFriendly: false,
    airPurifying: true,
    tags: ['tropical', 'statement', 'trending', 'beginner-friendly'],
    rating: 4.8,
    reviewCount: 186,
    featured: true,
    bestSeller: true,
    newArrival: false,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'fiddle-leaf-fig',
    name: 'Fiddle Leaf Fig',
    price: 1299,
    originalPrice: 1599,
    description:
      'Elegant tree-like houseplant with large, violin-shaped leaves. A designer favourite that adds instant sophistication to living rooms and offices.',
    longDescription:
      'The Fiddle Leaf Fig (Ficus lyrata) is the darling of interior designers and plant enthusiasts alike. Its large, deeply veined, violin-shaped leaves create a bold architectural statement in any room. Native to West African rainforests, this plant loves consistency — stable temperatures, consistent watering, and plenty of bright, indirect light. Avoid moving it frequently as it can be sensitive to environmental changes. Wipe its broad leaves regularly to keep them dust-free and photosynthesizing efficiently. With patience and proper care, it can grow into a stunning indoor tree reaching up to 6 feet tall.',
    category: 'indoor',
    image:
      'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 12,
    sunlight: 'Bright Indirect',
    watering: 'Water thoroughly when top 2 inches of soil are dry',
    difficulty: 'Moderate',
    size: 'Large (60-90 cm)',
    petFriendly: false,
    airPurifying: true,
    tags: ['designer-favourite', 'statement', 'tree'],
    rating: 4.5,
    reviewCount: 124,
    featured: true,
    bestSeller: false,
    newArrival: false,
    createdAt: '2024-02-10T10:00:00Z',
  },
  {
    id: 'pothos-money-plant',
    name: 'Pothos (Money Plant)',
    price: 299,
    description:
      'The ultimate beginner-friendly trailing plant with heart-shaped leaves. Nearly indestructible and perfect for shelves, hanging baskets, or water propagation.',
    longDescription:
      'Pothos, widely known as Money Plant in India, is arguably the easiest houseplant to grow. Its cascading vines of heart-shaped, variegated green and gold leaves look stunning trailing from shelves or hanging planters. This versatile plant grows equally well in soil or water, making it a fantastic choice for beginners. It thrives in a wide range of light conditions, from low light to bright indirect light. Pothos is also a champion air purifier, known to remove common indoor pollutants like formaldehyde and benzene. Simply trim the vines to encourage bushier growth.',
    category: 'indoor',
    image:
      'https://images.unsplash.com/photo-1534726955665-2cb2d145f2ad?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1534726955665-2cb2d145f2ad?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 80,
    sunlight: 'Low Light',
    watering: 'Water when soil feels dry, tolerates some neglect',
    difficulty: 'Easy',
    size: 'Small (15-25 cm)',
    petFriendly: false,
    airPurifying: true,
    tags: ['beginner', 'trailing', 'air-purifier', 'low-light'],
    rating: 4.9,
    reviewCount: 203,
    featured: false,
    bestSeller: true,
    newArrival: false,
    createdAt: '2024-01-05T10:00:00Z',
  },
  {
    id: 'rubber-plant',
    name: 'Rubber Plant',
    price: 549,
    originalPrice: 699,
    description:
      'A bold, architectural plant with thick, glossy, dark green leaves. Easy to care for and grows into a stunning indoor tree over time.',
    longDescription:
      'The Rubber Plant (Ficus elastica) is a robust and visually striking houseplant prized for its thick, leathery, dark green leaves that have a beautiful glossy sheen. Originally from Southeast Asia, this plant was once commercially grown for its latex sap. As a houseplant, it is remarkably forgiving and adapts well to various indoor conditions. It appreciates bright, indirect light but handles medium light gracefully. Water when the top inch of soil is dry, and reduce watering in winter. The Rubber Plant is an effective air purifier and can grow into a handsome indoor tree up to 8 feet tall with regular pruning.',
    category: 'indoor',
    image:
      'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 30,
    sunlight: 'Indirect Light',
    watering: 'Water when top inch of soil is dry, mist occasionally',
    difficulty: 'Easy',
    size: 'Medium (40-60 cm)',
    petFriendly: false,
    airPurifying: true,
    tags: ['architectural', 'glossy', 'tree', 'hardy'],
    rating: 4.6,
    reviewCount: 98,
    featured: false,
    bestSeller: true,
    newArrival: false,
    createdAt: '2024-03-01T10:00:00Z',
  },
  {
    id: 'zz-plant',
    name: 'ZZ Plant',
    price: 699,
    description:
      'Ultra low-maintenance plant with waxy, dark green leaflets on graceful arching stems. Thrives on neglect — ideal for offices and busy lifestyles.',
    longDescription:
      'The ZZ Plant (Zamioculcas zamiifolia) is the ultimate houseplant for those who forget to water. Native to Eastern Africa, it has evolved thick, potato-like rhizomes that store water underground, making it incredibly drought-tolerant. Its glossy, dark green leaflets line gracefully arching stems, creating an elegant architectural look. The ZZ Plant thrives in low to bright indirect light and only needs watering every 2-3 weeks. It is also one of the best air-purifying plants according to NASA studies. Its sleek appearance makes it a popular choice for modern offices and minimalist interiors.',
    category: 'indoor',
    image:
      'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 20,
    sunlight: 'Low Light',
    watering: 'Water every 2-3 weeks, drought tolerant',
    difficulty: 'Easy',
    size: 'Medium (30-50 cm)',
    petFriendly: false,
    airPurifying: true,
    tags: ['low-maintenance', 'office', 'modern', 'drought-tolerant'],
    rating: 4.7,
    reviewCount: 145,
    featured: true,
    bestSeller: false,
    newArrival: false,
    createdAt: '2024-02-20T10:00:00Z',
  },

  // ─── OUTDOOR PLANTS ───────────────────────────────────────────────
  {
    id: 'bougainvillea',
    name: 'Bougainvillea',
    price: 449,
    description:
      'Vibrant, cascading blooms in brilliant magenta and pink hues. This sun-loving climber transforms gardens, balconies, and trellises into colourful displays.',
    longDescription:
      'Bougainvillea is a spectacular flowering vine that paints gardens in vivid shades of magenta, pink, purple, orange, and white. What appear to be flowers are actually colourful papery bracts surrounding tiny white blooms. This hardy, drought-tolerant plant thrives in full sun and hot climates, making it perfect for Indian gardens and balconies. It can be trained on trellises, pergolas, or grown in large pots. Bougainvillea blooms most profusely when slightly stressed — so less water and occasional pruning will reward you with more flowers. A mature plant can bloom almost year-round in tropical conditions.',
    category: 'outdoor',
    image:
      'https://images.unsplash.com/photo-1588628566587-dbd176de94b4?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1588628566587-dbd176de94b4?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 35,
    sunlight: 'Direct Sunlight',
    watering: 'Water deeply but infrequently, allow soil to dry between waterings',
    difficulty: 'Easy',
    size: 'Large (60-90 cm)',
    petFriendly: true,
    airPurifying: false,
    tags: ['flowering', 'climber', 'colourful', 'balcony'],
    rating: 4.6,
    reviewCount: 112,
    featured: true,
    bestSeller: true,
    newArrival: false,
    createdAt: '2024-03-15T10:00:00Z',
  },
  {
    id: 'hibiscus',
    name: 'Hibiscus',
    price: 399,
    description:
      'Tropical beauty with large, trumpet-shaped flowers in stunning reds and pinks. A garden favourite that attracts butterflies and hummingbirds.',
    longDescription:
      'Hibiscus (Hibiscus rosa-sinensis) is a beloved tropical shrub that produces large, showy, trumpet-shaped flowers in vibrant reds, pinks, oranges, and yellows. Each flower lasts only a day, but healthy plants produce blooms continuously throughout the growing season. Hibiscus thrives in full sun and warm temperatures, making it ideal for Indian gardens. Plant in well-draining soil and water regularly during hot months. Feed with a balanced fertiliser every two weeks during the blooming season for maximum flower production. Hibiscus flowers are also used in traditional Indian recipes for making tea and hair oil.',
    category: 'outdoor',
    image:
      'https://images.unsplash.com/photo-1550950158-d0d960dff51b?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1550950158-d0d960dff51b?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 40,
    sunlight: 'Direct Sunlight',
    watering: 'Keep soil consistently moist, water daily in summer',
    difficulty: 'Moderate',
    size: 'Medium (40-60 cm)',
    petFriendly: true,
    airPurifying: false,
    tags: ['tropical', 'flowering', 'garden', 'traditional'],
    rating: 4.4,
    reviewCount: 89,
    featured: false,
    bestSeller: true,
    newArrival: false,
    createdAt: '2024-04-01T10:00:00Z',
  },
  {
    id: 'jasmine',
    name: 'Jasmine',
    price: 349,
    description:
      'Fragrant white blossoms that fill your garden with an intoxicating sweet scent, especially in the evenings. A cultural favourite across India.',
    longDescription:
      'Jasmine (Jasminum) is an enchanting flowering plant treasured for its intensely fragrant white blossoms. The sweet, heady scent is strongest in the evening, making it a wonderful addition near patios, windows, and seating areas. Jasmine holds deep cultural significance in India, used in religious offerings, wedding decorations, and traditional hair adornment. This vigorous climber or shrub thrives in full sun to partial shade and prefers consistently moist, well-drained soil. It blooms most prolifically in warm months and benefits from regular pruning after flowering. Jasmine can be trained on trellises, arches, or grown in containers on balconies.',
    category: 'outdoor',
    image:
      'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 45,
    sunlight: 'Direct Sunlight',
    watering: 'Keep soil moist but not waterlogged, water regularly',
    difficulty: 'Moderate',
    size: 'Medium (30-50 cm)',
    petFriendly: true,
    airPurifying: false,
    tags: ['fragrant', 'traditional', 'climber', 'cultural'],
    rating: 4.7,
    reviewCount: 156,
    featured: false,
    bestSeller: true,
    newArrival: false,
    createdAt: '2024-02-14T10:00:00Z',
  },
  {
    id: 'tulsi-holy-basil',
    name: 'Tulsi (Holy Basil)',
    price: 149,
    description:
      'Sacred herb revered in Indian households for its medicinal and spiritual properties. Easy to grow and perfect for balconies, kitchens, and prayer rooms.',
    longDescription:
      'Tulsi, or Holy Basil (Ocimum tenuiflorum), is one of the most sacred plants in Indian culture, often found in the courtyards of Hindu households. Beyond its spiritual significance, Tulsi is a powerhouse of medicinal benefits — its leaves are used in traditional Ayurvedic remedies for colds, coughs, digestion, and stress relief. This aromatic herb thrives in warm, sunny conditions and is remarkably easy to grow in pots or garden beds. It prefers well-drained soil and regular watering. Pinch off flower buds to encourage bushier leaf growth. Tulsi also acts as a natural insect repellent, keeping mosquitoes at bay.',
    category: 'outdoor',
    image:
      'https://images.unsplash.com/photo-1665479754958-1a8bdc47cc0d?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1665479754958-1a8bdc47cc0d?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 100,
    sunlight: 'Direct Sunlight',
    watering: 'Water regularly, keep soil moist but not soggy',
    difficulty: 'Easy',
    size: 'Small (20-30 cm)',
    petFriendly: true,
    airPurifying: true,
    tags: ['medicinal', 'sacred', 'herb', 'ayurvedic', 'kitchen'],
    rating: 4.8,
    reviewCount: 198,
    featured: false,
    bestSeller: true,
    newArrival: false,
    createdAt: '2024-01-20T10:00:00Z',
  },
  {
    id: 'curry-leaf-plant',
    name: 'Curry Leaf Plant',
    price: 249,
    description:
      'Essential Indian kitchen herb with aromatic leaves used in tempering and cooking. Freshly plucked curry leaves elevate the flavour of any South Indian dish.',
    longDescription:
      'The Curry Leaf Plant (Murraya koenigii) is a must-have for every Indian kitchen garden. Its aromatic, pinnate leaves are a cornerstone ingredient in South Indian, Sri Lankan, and Southeast Asian cuisine, lending a distinctive flavour when used in tempering (tadka). Fresh curry leaves are far superior to dried ones in both aroma and taste. This small tree thrives in full sun and warm climates, making it ideal for Indian gardens and large balcony pots. It prefers well-drained, slightly acidic soil and moderate watering. Regular harvesting encourages new growth. The plant also has medicinal properties and is used in traditional remedies.',
    category: 'outdoor',
    image:
      'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 55,
    sunlight: 'Direct Sunlight',
    watering: 'Moderate watering, let topsoil dry between waterings',
    difficulty: 'Easy',
    size: 'Medium (30-45 cm)',
    petFriendly: true,
    airPurifying: false,
    tags: ['culinary', 'herb', 'kitchen-garden', 'south-indian'],
    rating: 4.5,
    reviewCount: 134,
    featured: false,
    bestSeller: false,
    newArrival: true,
    createdAt: '2024-06-10T10:00:00Z',
  },

  // ─── FLOWERING PLANTS ─────────────────────────────────────────────
  {
    id: 'peace-lily',
    name: 'Peace Lily',
    price: 599,
    description:
      'Elegant white spathe flowers rising above lush, dark green foliage. One of the best indoor air purifiers that thrives in low-light conditions.',
    longDescription:
      'The Peace Lily (Spathiphyllum) is a graceful indoor plant that produces stunning white spathe flowers contrasting beautifully against its rich, dark green leaves. Ranked among NASA\'s top air-purifying plants, it effectively removes formaldehyde, benzene, and trichloroethylene from indoor air. Unlike many flowering plants, Peace Lilies bloom reliably even in low-light conditions, making them perfect for offices and bedrooms. They prefer consistently moist soil and high humidity. The plant will dramatically wilt when thirsty but bounces back quickly after watering. Its lush, tropical appearance adds a serene, calming ambiance to any space.',
    category: 'flowering',
    image:
      'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1593691509543-c55fb32d8de5?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 28,
    sunlight: 'Low Light',
    watering: 'Keep soil evenly moist, water when top inch is dry',
    difficulty: 'Easy',
    size: 'Medium (30-45 cm)',
    petFriendly: false,
    airPurifying: true,
    tags: ['air-purifier', 'flowering', 'low-light', 'office'],
    rating: 4.7,
    reviewCount: 167,
    featured: true,
    bestSeller: false,
    newArrival: false,
    createdAt: '2024-01-25T10:00:00Z',
  },
  {
    id: 'orchid-phalaenopsis',
    name: 'Orchid (Phalaenopsis)',
    price: 799,
    originalPrice: 999,
    description:
      'Exquisite moth orchid with cascading blooms that last for months. An elegant gift plant that adds a touch of luxury to any interior.',
    longDescription:
      'The Phalaenopsis Orchid, commonly called the Moth Orchid, is the most popular and beginner-friendly orchid variety. Its arching sprays of delicate, butterfly-shaped flowers can last 2-3 months, making it one of the longest-blooming houseplants available. Available in a stunning range of colours — from pristine whites and soft pinks to vibrant purples and spotted varieties. Place in bright, indirect light and water weekly by soaking the roots. Use orchid-specific bark mix rather than regular soil. After blooming, cut the spike above a node to encourage re-blooming. With minimal care, these elegant plants can bloom multiple times per year.',
    category: 'flowering',
    image:
      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 18,
    sunlight: 'Bright Indirect',
    watering: 'Water weekly by soaking roots, allow to drain completely',
    difficulty: 'Moderate',
    size: 'Small (25-35 cm)',
    petFriendly: true,
    airPurifying: false,
    tags: ['elegant', 'gift', 'long-blooming', 'luxury'],
    rating: 4.6,
    reviewCount: 142,
    featured: true,
    bestSeller: false,
    newArrival: true,
    createdAt: '2024-07-05T10:00:00Z',
  },
  {
    id: 'anthurium',
    name: 'Anthurium',
    price: 649,
    description:
      'Striking heart-shaped red flowers with a glossy, lacquered finish. A long-lasting flowering houseplant that blooms nearly year-round.',
    longDescription:
      'Anthurium, also known as the Flamingo Flower, is a stunning tropical plant that produces glossy, heart-shaped flowers in vibrant reds, pinks, and whites. What makes it exceptional is its ability to bloom almost continuously — each "flower" (actually a colourful spathe) lasts 6-8 weeks. Native to Colombian rainforests, Anthurium thrives in warm, humid conditions with bright, indirect light. Plant in a well-draining, peat-based mix and keep the soil lightly moist. Mist regularly or place on a pebble tray to increase humidity. This elegant plant makes an outstanding gift and adds a pop of colour to modern interiors year-round.',
    category: 'flowering',
    image:
      'https://images.unsplash.com/photo-1542127186-6e67e7d5316f?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1542127186-6e67e7d5316f?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 15,
    sunlight: 'Bright Indirect',
    watering: 'Keep soil lightly moist, mist leaves regularly',
    difficulty: 'Moderate',
    size: 'Medium (30-40 cm)',
    petFriendly: false,
    airPurifying: true,
    tags: ['flowering', 'tropical', 'gift', 'colourful'],
    rating: 4.5,
    reviewCount: 78,
    featured: false,
    bestSeller: false,
    newArrival: true,
    createdAt: '2024-08-12T10:00:00Z',
  },
  {
    id: 'african-violet',
    name: 'African Violet',
    price: 349,
    description:
      'Charming compact plant with velvety leaves and delicate purple-blue flowers. Blooms repeatedly throughout the year when given proper care.',
    longDescription:
      'African Violets (Saintpaulia) are beloved compact flowering plants that produce clusters of delicate blooms in shades of purple, blue, pink, and white above a rosette of soft, velvety leaves. They are one of the few houseplants that bloom almost continuously under the right conditions. Place in bright, indirect light — an east-facing window is ideal. Water from the bottom to avoid leaf spots, using room-temperature water. African Violets prefer consistent warmth and moderate humidity. Feed with a specialised African Violet fertiliser every 2 weeks during the growing season. Their compact size makes them perfect for windowsills and desktops.',
    category: 'flowering',
    image:
      'https://images.unsplash.com/photo-1645286975285-61e710b35a87?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1645286975285-61e710b35a87?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 22,
    sunlight: 'Indirect Light',
    watering: 'Water from below, keep soil evenly moist',
    difficulty: 'Moderate',
    size: 'Small (10-20 cm)',
    petFriendly: true,
    airPurifying: false,
    tags: ['compact', 'flowering', 'windowsill', 'desktop'],
    rating: 4.3,
    reviewCount: 56,
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: '2024-04-18T10:00:00Z',
  },
  {
    id: 'marigold',
    name: 'Marigold',
    price: 99,
    description:
      'Bright golden-orange blooms that bring festive cheer to gardens and balconies. Easy to grow, fast flowering, and a natural pest repellent.',
    longDescription:
      'Marigolds (Tagetes) are cheerful, sun-loving annuals that produce abundant blooms in warm shades of gold, orange, and yellow. They are a staple in Indian gardens and hold cultural significance — marigold garlands are used in festivals, weddings, and religious ceremonies. Beyond their beauty, marigolds are excellent companion plants that naturally repel harmful insects and nematodes, protecting nearby vegetables and herbs. They thrive in full sun and well-drained soil, blooming prolifically from spring through autumn. Extremely easy to grow from seeds or seedlings, marigolds are perfect for beginners. Deadhead spent flowers regularly to encourage continuous blooming.',
    category: 'flowering',
    image:
      'https://images.unsplash.com/photo-1691886273161-8e27d3292144?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1691886273161-8e27d3292144?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 120,
    sunlight: 'Direct Sunlight',
    watering: 'Water regularly, do not overwater',
    difficulty: 'Easy',
    size: 'Small (20-30 cm)',
    petFriendly: true,
    airPurifying: false,
    tags: ['festive', 'beginner', 'pest-repellent', 'cultural', 'budget'],
    rating: 4.4,
    reviewCount: 87,
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: '2024-03-25T10:00:00Z',
  },

  // ─── SUCCULENTS & CACTI ───────────────────────────────────────────
  {
    id: 'echeveria',
    name: 'Echeveria',
    price: 249,
    description:
      'Beautiful rosette-shaped succulent with plump, pastel-coloured leaves. Perfect for sunny windowsills, rock gardens, and terrariums.',
    longDescription:
      'Echeveria is a stunning rosette-forming succulent native to Mexico and Central America. Its fleshy, spoon-shaped leaves come in a mesmerising palette of greens, blues, pinks, and purples, often with a powdery coating called farina. These compact plants are perfect for bright windowsills, succulent arrangements, and rock gardens. Echeveria requires full sun to maintain its compact shape and vibrant colours — insufficient light causes stretching (etiolation). Water deeply but infrequently using the "soak and dry" method. Plant in well-draining succulent or cactus mix. They occasionally produce delicate bell-shaped flowers on tall stalks. Easy to propagate from leaf cuttings.',
    category: 'succulents',
    image:
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1520302630591-fd1c66edc19d?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 60,
    sunlight: 'Direct Sunlight',
    watering: 'Soak and dry method — water deeply, then let soil dry completely',
    difficulty: 'Easy',
    size: 'Small (8-15 cm)',
    petFriendly: true,
    airPurifying: false,
    tags: ['succulent', 'compact', 'colourful', 'windowsill', 'terrarium'],
    rating: 4.5,
    reviewCount: 93,
    featured: false,
    bestSeller: false,
    newArrival: true,
    createdAt: '2024-09-01T10:00:00Z',
  },
  {
    id: 'aloe-vera',
    name: 'Aloe Vera',
    price: 199,
    description:
      'Medicinal succulent with thick, gel-filled leaves renowned for healing burns and skin care. A practical and beautiful addition to every home.',
    longDescription:
      'Aloe Vera is the quintessential household succulent, valued for thousands of years for its remarkable medicinal properties. Its thick, fleshy leaves contain a soothing gel widely used for treating minor burns, sunburn, skin irritations, and in beauty routines. Beyond its healing properties, Aloe Vera is an attractive, low-maintenance houseplant that thrives on sunny windowsills. It stores water in its leaves, making it extremely drought-tolerant — water only when the soil is completely dry. Plant in a well-draining cactus mix in a pot with drainage holes. Aloe produces offsets (pups) that can be separated and repotted, giving you free plants to share.',
    category: 'succulents',
    image:
      'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 75,
    sunlight: 'Bright Indirect',
    watering: 'Water when soil is completely dry, every 2-3 weeks',
    difficulty: 'Easy',
    size: 'Small (20-30 cm)',
    petFriendly: false,
    airPurifying: true,
    tags: ['medicinal', 'succulent', 'healing', 'skincare', 'practical'],
    rating: 4.8,
    reviewCount: 178,
    featured: false,
    bestSeller: true,
    newArrival: false,
    createdAt: '2024-01-10T10:00:00Z',
  },
  {
    id: 'jade-plant',
    name: 'Jade Plant',
    price: 349,
    description:
      'Auspicious money tree with thick, oval, jade-green leaves on woody stems. Symbolises prosperity and good luck in many cultures.',
    longDescription:
      'The Jade Plant (Crassula ovata) is a popular succulent shrub known as the "Money Tree" or "Lucky Plant" — traditionally believed to attract wealth and prosperity. Its thick, glossy, oval leaves grow on sturdy woody stems, and with age, it develops a tree-like silhouette that resembles a miniature bonsai. Jade Plants can live for decades, often becoming cherished family heirlooms. They prefer bright light and infrequent watering — allow the soil to dry out completely between waterings. Feed sparingly during the growing season. These resilient plants are perfect for sunny windowsills and make thoughtful housewarming gifts symbolising good fortune.',
    category: 'succulents',
    image:
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 32,
    sunlight: 'Bright Indirect',
    watering: 'Water sparingly, let soil dry completely between waterings',
    difficulty: 'Easy',
    size: 'Small (15-25 cm)',
    petFriendly: false,
    airPurifying: false,
    tags: ['lucky', 'prosperity', 'bonsai-like', 'gift', 'long-lived'],
    rating: 4.6,
    reviewCount: 109,
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: '2024-05-15T10:00:00Z',
  },
  {
    id: 'string-of-pearls',
    name: 'String of Pearls',
    price: 449,
    originalPrice: 549,
    description:
      'Unique trailing succulent with cascading strands of bead-like leaves. An eye-catching conversation starter perfect for hanging planters.',
    longDescription:
      'String of Pearls (Senecio rowleyanus) is a captivating trailing succulent that features cascading strands of small, spherical, pea-like leaves — resembling a beaded necklace. Native to Southwest Africa, this unique plant has adapted its round leaf shape to minimise water loss while maximising water storage. It looks absolutely spectacular in hanging planters, high shelves, or trailing from macramé hangers. Provide bright, indirect light and water sparingly — the pearl-like leaves will shrivel slightly when thirsty, signalling it\'s time to water. Use well-draining succulent mix and be careful not to overwater, as this is the most common cause of failure.',
    category: 'succulents',
    image:
      'https://images.unsplash.com/photo-1648070024548-b0ccc1e6fc1e?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1648070024548-b0ccc1e6fc1e?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 14,
    sunlight: 'Bright Indirect',
    watering: 'Water sparingly when pearls begin to shrivel slightly',
    difficulty: 'Moderate',
    size: 'Small (15-25 cm trailing)',
    petFriendly: false,
    airPurifying: false,
    tags: ['trailing', 'unique', 'hanging', 'conversation-starter'],
    rating: 4.4,
    reviewCount: 67,
    featured: false,
    bestSeller: false,
    newArrival: true,
    createdAt: '2024-08-20T10:00:00Z',
  },
  {
    id: 'barrel-cactus',
    name: 'Barrel Cactus',
    price: 299,
    description:
      'Compact, round cactus with striking ribbed texture and golden spines. Extremely low maintenance — perfect for minimalist and desert-themed decor.',
    longDescription:
      'The Barrel Cactus (Echinocactus grusonii), also known as the Golden Barrel Cactus or Mother-in-Law\'s Cushion, is a stunning globular cactus covered in rows of golden-yellow spines. Its symmetrical ribbed shape and vibrant spines make it a living sculpture, perfect for minimalist and contemporary interiors. Native to Mexican deserts, this cactus is supremely drought-tolerant and requires very little attention. Place in a bright, sunny spot and water only once a month during the growing season, even less in winter. Use cactus-specific soil mix with excellent drainage. Barrel cacti are extremely long-lived and slow-growing, adding character to your collection for years.',
    category: 'succulents',
    image:
      'https://images.unsplash.com/photo-1551893478-d726eaf0442c?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1551893478-d726eaf0442c?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 18,
    sunlight: 'Direct Sunlight',
    watering: 'Water once a month, reduce in winter',
    difficulty: 'Easy',
    size: 'Small (10-20 cm)',
    petFriendly: false,
    airPurifying: false,
    tags: ['cactus', 'desert', 'minimalist', 'low-maintenance', 'sculptural'],
    rating: 4.3,
    reviewCount: 45,
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: '2024-05-01T10:00:00Z',
  },

  // ─── AIR-PURIFYING ────────────────────────────────────────────────
  {
    id: 'snake-plant',
    name: 'Snake Plant',
    price: 399,
    description:
      'Architectural sword-shaped leaves with striking yellow-green variegation. One of the best air purifiers that releases oxygen at night — ideal for bedrooms.',
    longDescription:
      'The Snake Plant (Sansevieria trifasciata), also known as Mother-in-Law\'s Tongue, is an extraordinarily resilient houseplant with striking, upright, sword-shaped leaves. Its bold architectural form and dramatic yellow-green variegation make it a favourite for modern interiors. What sets the Snake Plant apart is its unique ability to convert CO2 to oxygen at night (CAM photosynthesis), making it an ideal bedroom plant. NASA studies rank it among the top air-purifying plants, capable of removing formaldehyde, benzene, xylene, and trichloroethylene. It thrives on neglect — tolerating low light, infrequent watering, and varying temperatures. Water only when soil is bone dry.',
    category: 'air-purifying',
    image:
      'https://images.unsplash.com/photo-1563769874043-9eac75ae0049?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1563769874043-9eac75ae0049?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 50,
    sunlight: 'Low Light',
    watering: 'Water every 2-3 weeks, let soil dry completely',
    difficulty: 'Easy',
    size: 'Medium (30-45 cm)',
    petFriendly: false,
    airPurifying: true,
    tags: ['air-purifier', 'bedroom', 'low-maintenance', 'architectural', 'nasa'],
    rating: 4.8,
    reviewCount: 192,
    featured: true,
    bestSeller: true,
    newArrival: false,
    createdAt: '2024-01-08T10:00:00Z',
  },
  {
    id: 'spider-plant',
    name: 'Spider Plant',
    price: 299,
    description:
      'Cheerful arching plant that produces adorable "baby" plantlets on trailing runners. Excellent air purifier, easy to grow, and safe for pets.',
    longDescription:
      'The Spider Plant (Chlorophytum comosum) is a classic, fast-growing houseplant known for its gracefully arching, variegated green and white striped leaves. As it matures, it produces long runners with small "baby" plants (spiderettes) dangling at their tips — these can be easily propagated by placing them in water or soil. Spider Plants are ranked among NASA\'s top air-purifying plants, effectively removing carbon monoxide, formaldehyde, and xylene. They are one of the few popular houseplants that are completely non-toxic to cats and dogs. Thriving in a wide range of conditions, they prefer bright indirect light but tolerate lower light levels gracefully.',
    category: 'air-purifying',
    image:
      'https://images.unsplash.com/photo-1753900526196-11c005bddd8b?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1753900526196-11c005bddd8b?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 42,
    sunlight: 'Indirect Light',
    watering: 'Water when top inch of soil is dry, weekly in summer',
    difficulty: 'Easy',
    size: 'Medium (25-40 cm)',
    petFriendly: true,
    airPurifying: true,
    tags: ['pet-safe', 'air-purifier', 'propagation', 'hanging', 'family-friendly'],
    rating: 4.7,
    reviewCount: 165,
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: '2024-02-05T10:00:00Z',
  },
  {
    id: 'boston-fern',
    name: 'Boston Fern',
    price: 449,
    description:
      'Lush, cascading fronds that add a wild, natural beauty to any space. Superb air purifier and humidifier — thrives in bathrooms and shaded areas.',
    longDescription:
      'The Boston Fern (Nephrolepis exaltata) is a timeless classic with arching, feathery fronds that cascade beautifully from hanging baskets and pedestals. It has been a popular houseplant since the Victorian era, prized for its lush, graceful appearance. Boston Ferns are exceptional air purifiers and natural humidifiers — they remove formaldehyde and add moisture to dry indoor air, making them perfect for bathrooms and kitchens. They thrive in indirect light and high humidity, so mist regularly or place on a pebble tray. Keep the soil consistently moist but not waterlogged. While they require a bit more attention than some plants, their stunning beauty is well worth the effort.',
    category: 'air-purifying',
    image:
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 20,
    sunlight: 'Indirect Light',
    watering: 'Keep soil consistently moist, mist daily in dry weather',
    difficulty: 'Moderate',
    size: 'Medium (30-50 cm)',
    petFriendly: true,
    airPurifying: true,
    tags: ['fern', 'hanging', 'bathroom', 'humidity-loving', 'classic'],
    rating: 4.4,
    reviewCount: 83,
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: '2024-03-10T10:00:00Z',
  },
  {
    id: 'areca-palm',
    name: 'Areca Palm',
    price: 799,
    originalPrice: 999,
    description:
      'Elegant tropical palm with feathery, arching fronds. Acts as a natural humidifier and air purifier — perfect for living rooms and office lobbies.',
    longDescription:
      'The Areca Palm (Dypsis lutescens), also known as the Butterfly Palm, is one of the most popular indoor palms, bringing a lush tropical ambiance to any space. Its graceful, feathery fronds arch elegantly from multiple stems, creating a full, lush canopy. Areca Palms are outstanding natural humidifiers, releasing moisture into dry indoor air, and are highly effective at removing indoor pollutants including formaldehyde, xylene, and toluene. They thrive in bright, indirect light and prefer consistently moist soil during the growing season. Position away from direct sun which can scorch the fronds. Areca Palms can grow up to 6-7 feet indoors, making them striking floor plants.',
    category: 'air-purifying',
    image:
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 15,
    sunlight: 'Bright Indirect',
    watering: 'Keep soil moist but not soggy, water 2-3 times per week',
    difficulty: 'Moderate',
    size: 'Large (90-120 cm)',
    petFriendly: true,
    airPurifying: true,
    tags: ['palm', 'tropical', 'humidifier', 'floor-plant', 'lobby'],
    rating: 4.6,
    reviewCount: 119,
    featured: true,
    bestSeller: false,
    newArrival: true,
    createdAt: '2024-07-20T10:00:00Z',
  },
  {
    id: 'english-ivy',
    name: 'English Ivy',
    price: 349,
    description:
      'Classic trailing vine with elegant lobed leaves. Excellent at filtering airborne mould and allergens — ideal for improving indoor air quality.',
    longDescription:
      'English Ivy (Hedera helix) is a versatile, evergreen climbing and trailing plant with distinctive lobed leaves. It is particularly effective at reducing airborne mould particles and allergens, making it a top choice for improving indoor air quality, especially in bathrooms and damp areas. English Ivy looks stunning trailing from shelves and hanging baskets, or trained up a moss pole or trellis. It prefers cool to moderate temperatures and indirect light, though it adapts to various conditions. Keep soil evenly moist and mist occasionally to maintain humidity. Available in numerous attractive varieties with variegated, ruffled, or miniature leaves for diverse decorating options.',
    category: 'air-purifying',
    image:
      'https://images.unsplash.com/photo-1519393085459-be21f89585f1?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1519393085459-be21f89585f1?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 30,
    sunlight: 'Indirect Light',
    watering: 'Keep soil evenly moist, mist regularly',
    difficulty: 'Easy',
    size: 'Small (20-30 cm trailing)',
    petFriendly: false,
    airPurifying: true,
    tags: ['trailing', 'air-purifier', 'mould-fighter', 'versatile', 'classic'],
    rating: 4.3,
    reviewCount: 72,
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: '2024-04-05T10:00:00Z',
  },

  // ─── LOW-MAINTENANCE ──────────────────────────────────────────────
  {
    id: 'bamboo-palm',
    name: 'Bamboo Palm',
    price: 599,
    description:
      'Graceful palm with bamboo-like stems and lush, feathery fronds. Filters indoor air effectively and thrives in low-light conditions.',
    longDescription:
      'The Bamboo Palm (Chamaedorea seifrizii) is an elegant, clump-forming palm named for its slender, bamboo-like stems topped with soft, feathery fronds. It is one of the best indoor palms for low to moderate light conditions, making it versatile for various room placements. NASA research highlights its effectiveness at removing formaldehyde, benzene, and carbon monoxide from indoor air. The Bamboo Palm prefers consistently moist soil and appreciates occasional misting to boost humidity. It is non-toxic to pets, making it a safe choice for households with cats and dogs. Grows steadily to 4-6 feet indoors, providing a lush, tropical focal point in living rooms and offices.',
    category: 'low-maintenance',
    image:
      'https://images.unsplash.com/photo-1679407509869-95d525d7caed?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1679407509869-95d525d7caed?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 12,
    sunlight: 'Partial Shade',
    watering: 'Keep soil moist, water when top inch feels dry',
    difficulty: 'Easy',
    size: 'Large (60-90 cm)',
    petFriendly: true,
    airPurifying: true,
    tags: ['palm', 'low-light', 'pet-safe', 'floor-plant', 'air-purifier'],
    rating: 4.5,
    reviewCount: 76,
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: '2024-04-22T10:00:00Z',
  },
  {
    id: 'lucky-bamboo',
    name: 'Lucky Bamboo',
    price: 199,
    description:
      'Auspicious feng shui plant that brings good luck and positive energy. Grows in water or soil — incredibly easy to care for.',
    longDescription:
      'Lucky Bamboo (Dracaena sanderiana) is not actually a bamboo but a member of the Dracaena family. It is one of the most popular feng shui plants, believed to bring good luck, prosperity, and positive energy. The number of stalks carries different meanings — three for happiness, five for health, and eight for wealth. Lucky Bamboo is exceptionally easy to care for and can grow in just water with pebbles for support, requiring no soil at all. Change the water every 1-2 weeks and keep it in indirect light. Avoid direct sunlight and chlorinated water. Its elegant, often artistically twisted stalks make it a wonderful gift for housewarmings and celebrations.',
    category: 'low-maintenance',
    image:
      'https://images.unsplash.com/photo-1524222928538-afb4409a0d70?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1524222928538-afb4409a0d70?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 90,
    sunlight: 'Indirect Light',
    watering: 'Change water every 1-2 weeks if in water, or keep soil moist',
    difficulty: 'Easy',
    size: 'Small (15-30 cm)',
    petFriendly: false,
    airPurifying: false,
    tags: ['lucky', 'feng-shui', 'gift', 'water-plant', 'budget'],
    rating: 4.4,
    reviewCount: 132,
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: '2024-02-28T10:00:00Z',
  },
  {
    id: 'philodendron',
    name: 'Philodendron',
    price: 499,
    description:
      'Heart-shaped, deep green leaves on an easy-going tropical vine. Adapts to various light conditions and adds lush greenery to any corner.',
    longDescription:
      'The Heartleaf Philodendron (Philodendron hederaceum) is a beloved tropical vine prized for its glossy, heart-shaped leaves and incredibly forgiving nature. It is one of the most adaptable houseplants, thriving in a wide range of light conditions from low light to bright indirect. Its cascading vines look beautiful trailing from shelves, climbing a moss pole, or spilling from hanging baskets. Philodendrons prefer to dry slightly between waterings and appreciate occasional misting. They are fast growers and can be easily propagated by snipping a stem below a node and placing it in water. An excellent air purifier, it helps remove indoor toxins while adding vibrant greenery.',
    category: 'low-maintenance',
    image:
      'https://images.unsplash.com/photo-1757060454219-a58195dc2178?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1757060454219-a58195dc2178?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 35,
    sunlight: 'Indirect Light',
    watering: 'Water when top inch of soil is dry, every 7-10 days',
    difficulty: 'Easy',
    size: 'Medium (25-40 cm)',
    petFriendly: false,
    airPurifying: true,
    tags: ['trailing', 'tropical', 'adaptable', 'beginner', 'propagation'],
    rating: 4.6,
    reviewCount: 105,
    featured: false,
    bestSeller: false,
    newArrival: true,
    createdAt: '2024-09-15T10:00:00Z',
  },
  {
    id: 'chinese-evergreen',
    name: 'Chinese Evergreen',
    price: 549,
    description:
      'Striking patterned leaves in shades of green, silver, and pink. One of the most tolerant indoor plants that thrives even in low-light offices.',
    longDescription:
      'Chinese Evergreen (Aglaonema) is a stunning foliage plant celebrated for its beautifully patterned leaves that come in combinations of green, silver, pink, and red. Native to tropical Asian forests, it has adapted to thrive in low light, making it one of the best choices for dimly lit offices, bedrooms, and north-facing rooms. Chinese Evergreens are remarkably tolerant of neglect — they handle irregular watering, low humidity, and temperature fluctuations with grace. Water when the top inch of soil is dry and avoid cold drafts. Newer hybrid varieties feature spectacular pink and red variegation. An effective air purifier, it removes formaldehyde and benzene from indoor environments.',
    category: 'low-maintenance',
    image:
      'https://images.unsplash.com/photo-1751445384288-232ff85ef5ff?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1751445384288-232ff85ef5ff?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 22,
    sunlight: 'Low Light',
    watering: 'Water when top inch of soil is dry, every 7-14 days',
    difficulty: 'Easy',
    size: 'Medium (30-45 cm)',
    petFriendly: false,
    airPurifying: true,
    tags: ['variegated', 'low-light', 'office', 'colourful-foliage', 'tolerant'],
    rating: 4.5,
    reviewCount: 88,
    featured: false,
    bestSeller: false,
    newArrival: true,
    createdAt: '2024-10-01T10:00:00Z',
  },
  {
    id: 'cast-iron-plant',
    name: 'Cast Iron Plant',
    price: 699,
    description:
      'Virtually indestructible plant with elegant, dark green, lance-shaped leaves. Thrives in deep shade and withstands extreme neglect.',
    longDescription:
      'The Cast Iron Plant (Aspidistra elatior) earns its name through its near-indestructible nature. This Victorian-era favourite features elegant, upright, dark green lance-shaped leaves that can grow up to 2 feet long. It is one of the very few houseplants that genuinely thrives in deep shade, making it ideal for hallways, corners, and rooms with minimal natural light. It tolerates temperature fluctuations, low humidity, irregular watering, and even poor air quality. Water only when the soil is dry and avoid overwatering, which is the only thing that can truly harm it. The Cast Iron Plant grows slowly but steadily, requiring very little fertilisation. A truly set-it-and-forget-it plant for the busiest lifestyles.',
    category: 'low-maintenance',
    image:
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 10,
    sunlight: 'Low Light',
    watering: 'Water when soil is dry, very drought tolerant',
    difficulty: 'Easy',
    size: 'Medium (40-60 cm)',
    petFriendly: true,
    airPurifying: false,
    tags: ['indestructible', 'deep-shade', 'neglect-proof', 'hallway', 'classic'],
    rating: 4.4,
    reviewCount: 54,
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: '2024-05-20T10:00:00Z',
  },

  // ─── POTS & ACCESSORIES ───────────────────────────────────────────
  {
    id: 'ceramic-planter-set',
    name: 'Ceramic Planter Set (3 pcs)',
    price: 1499,
    originalPrice: 1899,
    description:
      'Elegant set of three matte-finish ceramic planters in graduated sizes. Features drainage holes and matching saucers in a contemporary white design.',
    longDescription:
      'This premium Ceramic Planter Set includes three beautifully crafted pots in graduated sizes (small, medium, and large) with a modern matte white finish. Each planter features a drainage hole with a matching ceramic saucer to protect your surfaces. The clean, minimalist design complements any interior style — from Scandinavian to bohemian. Made from high-quality, kiln-fired ceramic that is durable and frost-resistant. The smooth finish makes them easy to clean, and the neutral colour lets your plants take centre stage. Perfect for creating a cohesive, curated plant display on shelves, windowsills, or tabletops. Also makes a wonderful gift set for plant enthusiasts.',
    category: 'pots-accessories',
    image:
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 25,
    sunlight: 'Low Light',
    watering: 'N/A — Accessory',
    difficulty: 'Easy',
    size: 'Small: 10cm, Medium: 15cm, Large: 20cm',
    tags: ['ceramic', 'set', 'modern', 'gift', 'drainage'],
    rating: 4.7,
    reviewCount: 94,
    featured: true,
    bestSeller: true,
    newArrival: false,
    createdAt: '2024-03-05T10:00:00Z',
  },
  {
    id: 'terracotta-pot',
    name: 'Terracotta Pot',
    price: 199,
    description:
      'Classic handmade terracotta pot with excellent breathability for healthy root growth. Timeless design that ages beautifully with a natural patina.',
    longDescription:
      'This classic Terracotta Pot is handcrafted from natural clay and kiln-fired to create a porous, breathable planter that promotes healthy root growth. Terracotta\'s natural porosity allows air and water to pass through the walls, preventing root rot — making it ideal for plants that prefer well-drained soil like succulents, herbs, and Mediterranean plants. The warm, earthy tone of terracotta complements both indoor and outdoor settings and develops a beautiful aged patina over time with mineral deposits and moss. Each pot features a drainage hole for proper water management. Available in the traditional bell shape that has been used by gardeners for centuries.',
    category: 'pots-accessories',
    image:
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 100,
    sunlight: 'Low Light',
    watering: 'N/A — Accessory',
    difficulty: 'Easy',
    size: '15cm diameter',
    tags: ['terracotta', 'classic', 'breathable', 'handmade', 'budget'],
    rating: 4.5,
    reviewCount: 156,
    featured: false,
    bestSeller: true,
    newArrival: false,
    createdAt: '2024-01-01T10:00:00Z',
  },
  {
    id: 'macrame-plant-hanger',
    name: 'Macramé Plant Hanger',
    price: 599,
    description:
      'Hand-knotted bohemian macramé hanger crafted from 100% natural cotton. Adds a boho-chic touch while displaying trailing plants beautifully.',
    longDescription:
      'This gorgeous Macramé Plant Hanger is hand-knotted from 100% natural, unbleached cotton rope in an intricate bohemian pattern. It transforms any trailing plant into a stunning hanging display, adding texture and visual interest at eye level. The macramé design includes a sturdy hanging loop and a secure basket cradle that holds pots up to 18cm in diameter. Perfect for displaying Pothos, String of Pearls, Spider Plants, and Boston Ferns. Hang from ceiling hooks, curtain rods, or wall brackets to maximise vertical space and create a lush, boho-chic ambiance. Each piece is handcrafted, making every hanger subtly unique. Measures approximately 90cm in total length.',
    category: 'pots-accessories',
    image:
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 30,
    sunlight: 'Low Light',
    watering: 'N/A — Accessory',
    difficulty: 'Easy',
    size: '90cm length',
    tags: ['macrame', 'bohemian', 'hanging', 'handmade', 'cotton'],
    rating: 4.6,
    reviewCount: 78,
    featured: false,
    bestSeller: false,
    newArrival: true,
    createdAt: '2024-08-01T10:00:00Z',
  },
  {
    id: 'garden-tool-set',
    name: 'Garden Tool Set',
    price: 899,
    originalPrice: 1099,
    description:
      'Complete 5-piece gardening tool set with ergonomic wooden handles. Includes trowel, transplanter, weeder, fork, and pruning shears in a canvas bag.',
    longDescription:
      'This comprehensive Garden Tool Set includes five essential gardening tools crafted from rust-resistant stainless steel with comfortable, ergonomic wooden handles. The set includes: a hand trowel for digging and planting, a transplanter for moving seedlings, a weeder for removing pesky weeds, a hand fork for loosening and aerating soil, and sharp bypass pruning shears for trimming and shaping plants. All tools come neatly organised in a durable canvas carry bag with individual pockets. The wooden handles are sanded smooth and treated for moisture resistance. Whether you are tending to a small balcony garden or a full backyard, this versatile set covers all your basic gardening needs.',
    category: 'pots-accessories',
    image:
      'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 18,
    sunlight: 'Low Light',
    watering: 'N/A — Accessory',
    difficulty: 'Easy',
    size: 'Standard',
    tags: ['tools', 'gardening', 'gift-set', 'stainless-steel', 'ergonomic'],
    rating: 4.4,
    reviewCount: 63,
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: '2024-06-15T10:00:00Z',
  },
  {
    id: 'organic-potting-mix',
    name: 'Organic Potting Mix (5kg)',
    price: 349,
    description:
      'Premium organic potting soil enriched with vermicompost, cocopeat, and perlite. Provides excellent drainage, aeration, and nutrition for all houseplants.',
    longDescription:
      'This premium Organic Potting Mix is a carefully formulated blend of natural ingredients designed to give your plants the best growing medium. It combines nutrient-rich vermicompost for slow-release organic nutrition, cocopeat for moisture retention and aeration, perlite for improved drainage and root oxygenation, and neem cake for natural pest protection. The result is a light, fluffy, well-draining soil that suits a wide range of houseplants, from tropical foliage to flowering plants. Free from synthetic chemicals and pesticides, it is safe for edible plants, children, and pets. Each 5kg bag is sufficient for repotting 8-10 medium-sized plants. Store in a cool, dry place.',
    category: 'pots-accessories',
    image:
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 65,
    sunlight: 'Low Light',
    watering: 'N/A — Accessory',
    difficulty: 'Easy',
    size: '5kg bag',
    tags: ['organic', 'soil', 'potting-mix', 'essential', 'chemical-free'],
    rating: 4.6,
    reviewCount: 112,
    featured: false,
    bestSeller: false,
    newArrival: false,
    createdAt: '2024-04-10T10:00:00Z',
  },
  {
    id: 'self-watering-pot',
    name: 'Self-Watering Pot',
    price: 799,
    description:
      'Innovative self-watering planter with a built-in water reservoir. Keeps plants hydrated for up to 2 weeks — perfect for travellers and busy plant parents.',
    longDescription:
      'This innovative Self-Watering Pot features a clever built-in water reservoir system that automatically delivers moisture to your plant\'s roots through capillary action. Simply fill the reservoir through the side opening, and the wicking system draws water up to the soil as needed, keeping your plant consistently hydrated for up to 2 weeks. This eliminates the guesswork of watering and is a lifesaver for frequent travellers, busy professionals, and forgetful plant owners. The sleek, modern design features a matte finish in contemporary white with a transparent water level indicator. Made from durable, UV-resistant polypropylene. Available in medium size (20cm), suitable for most popular houseplants.',
    category: 'pots-accessories',
    image:
      'https://images.unsplash.com/photo-1497990571654-77aa8ec36038?w=800&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1497990571654-77aa8ec36038?w=800&auto=format&fit=crop&q=80',
    ],
    inStock: true,
    stockCount: 20,
    sunlight: 'Low Light',
    watering: 'N/A — Self-watering accessory',
    difficulty: 'Easy',
    size: '20cm diameter',
    tags: ['self-watering', 'travel', 'innovative', 'modern', 'convenient'],
    rating: 4.5,
    reviewCount: 87,
    featured: false,
    bestSeller: false,
    newArrival: true,
    createdAt: '2024-09-20T10:00:00Z',
  },
];

// ─── HELPER FUNCTIONS ─────────────────────────────────────────────────────────

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (category: CategoryId): Product[] => {
  return products.filter((product) => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getBestSellers = (): Product[] => {
  return products.filter((product) => product.bestSeller);
};

export const getNewArrivals = (): Product[] => {
  return products.filter((product) => product.newArrival);
};

export const searchProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};
