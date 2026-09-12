export interface Plant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  sunlight: string;
  watering: string;
  size: string;
  indoor: boolean;
  airPurifying: boolean;
  inStock: boolean;
  stock: number;
  careInstructions: {
    watering: string;
    sunlight: string;
    temperature: string;
    humidity: string;
    fertilizing: string;
  };
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  image?: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  minOrder?: number;
  expiryDate: string;
  description: string;
  active: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    plantId: string;
    plantName: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
}

export const plants: Plant[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    price: 45.99,
    originalPrice: 59.99,
    image: 'https://images.unsplash.com/photo-1653404809389-f370ea4310dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb25zdGVyYSUyMHBsYW50JTIwcG90fGVufDF8fHx8MTc3MzQ2NTY5OHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Indoor Plants',
    rating: 4.8,
    reviews: 124,
    description: 'The Monstera Deliciosa, also known as the Swiss Cheese Plant, is a tropical plant native to Central America. Its distinctive split leaves make it a stunning addition to any indoor space.',
    sunlight: 'Indirect Light',
    watering: 'Weekly',
    size: 'Large',
    indoor: true,
    airPurifying: true,
    inStock: true,
    stock: 15,
    careInstructions: {
      watering: 'Water when top 2 inches of soil are dry, typically once a week. Reduce watering in winter.',
      sunlight: 'Bright, indirect light is ideal. Can tolerate some shade but grows best with plenty of indirect sunlight.',
      temperature: 'Thrives in temperatures between 65-85°F (18-29°C). Avoid cold drafts.',
      humidity: 'Prefers high humidity (60%+). Mist leaves regularly or use a humidifier.',
      fertilizing: 'Feed monthly during spring and summer with a balanced liquid fertilizer.'
    }
  },
  {
    id: '2',
    name: 'Snake Plant',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1759579476393-750aff47c7da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFrZSUyMHBsYW50JTIwc3VjY3VsZW50fGVufDF8fHx8MTc3MzQ0MTgwMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Air Purifying Plants',
    rating: 4.9,
    reviews: 203,
    description: 'Snake Plants are one of the easiest houseplants to care for. They tolerate low light and irregular watering, making them perfect for beginners.',
    sunlight: 'Low to Bright Light',
    watering: 'Bi-weekly',
    size: 'Medium',
    indoor: true,
    airPurifying: true,
    inStock: true,
    stock: 28,
    careInstructions: {
      watering: 'Water every 2-3 weeks, allowing soil to dry completely between waterings. Overwatering is the most common mistake.',
      sunlight: 'Tolerates a wide range of light conditions from low light to bright indirect light.',
      temperature: 'Comfortable in normal room temperatures, 60-85°F (15-29°C).',
      humidity: 'Tolerates dry air well. No special humidity requirements.',
      fertilizing: 'Feed once during spring and once during summer with diluted cactus fertilizer.'
    }
  },
  {
    id: '3',
    name: 'Fiddle Leaf Fig',
    price: 79.99,
    originalPrice: 99.99,
    image: 'https://images.unsplash.com/photo-1673297352939-e308a901b5f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaWRkbGUlMjBsZWFmJTIwZmlnJTIwdHJlZXxlbnwxfHx8fDE3NzM0NDE4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Indoor Plants',
    rating: 4.6,
    reviews: 87,
    description: 'The Fiddle Leaf Fig is a popular indoor tree with large, violin-shaped leaves. It makes a dramatic statement in any room.',
    sunlight: 'Bright Indirect Light',
    watering: 'Weekly',
    size: 'Large',
    indoor: true,
    airPurifying: false,
    inStock: true,
    stock: 8,
    careInstructions: {
      watering: 'Water thoroughly when top inch of soil is dry, usually once per week. Ensure good drainage.',
      sunlight: 'Needs bright, filtered light. Rotate plant weekly for even growth.',
      temperature: 'Prefers consistent temperatures between 65-75°F (18-24°C).',
      humidity: 'Appreciates moderate to high humidity. Wipe leaves regularly to remove dust.',
      fertilizing: 'Feed monthly during growing season (spring-summer) with diluted liquid fertilizer.'
    }
  },
  {
    id: '4',
    name: 'Golden Pothos',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1595524147656-eb5d0a63e9a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3Rob3MlMjBoYW5naW5nJTIwcGxhbnR8ZW58MXx8fHwxNzczNDAyNTYxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Air Purifying Plants',
    rating: 4.9,
    reviews: 312,
    description: 'Pothos is one of the most popular and easiest houseplants to grow. Its trailing vines with heart-shaped leaves look beautiful in hanging baskets.',
    sunlight: 'Low to Medium Light',
    watering: 'Weekly',
    size: 'Small',
    indoor: true,
    airPurifying: true,
    inStock: true,
    stock: 42,
    careInstructions: {
      watering: 'Water when soil feels dry to the touch, typically every 7-10 days.',
      sunlight: 'Thrives in low to bright indirect light. Avoid direct sunlight.',
      temperature: 'Comfortable in normal room temperatures, 65-85°F (18-29°C).',
      humidity: 'Adapts to normal household humidity levels.',
      fertilizing: 'Feed every 4-6 weeks during spring and summer with balanced houseplant fertilizer.'
    }
  },
  {
    id: '5',
    name: 'Peace Lily',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1706944590915-120cf3bf7ccd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZSUyMGxpbHklMjBmbG93ZXJ8ZW58MXx8fHwxNzczNDQxODAxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Flowering Plants',
    rating: 4.7,
    reviews: 156,
    description: 'Peace Lilies are elegant plants with glossy leaves and beautiful white flowers. They are excellent air purifiers and thrive in low light.',
    sunlight: 'Low to Medium Light',
    watering: 'Weekly',
    size: 'Medium',
    indoor: true,
    airPurifying: true,
    inStock: true,
    stock: 19,
    careInstructions: {
      watering: 'Keep soil consistently moist but not soggy. Water when top inch feels dry.',
      sunlight: 'Prefers low to medium indirect light. Too much light can scorch leaves.',
      temperature: 'Thrives in temperatures between 65-80°F (18-27°C).',
      humidity: 'Loves high humidity. Mist leaves regularly or use a pebble tray.',
      fertilizing: 'Feed every 6 weeks during growing season with a balanced fertilizer.'
    }
  },
  {
    id: '6',
    name: 'Rubber Plant',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1623032693199-e9abd35e0a98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydWJiZXIlMjBwbGFudCUyMGZpY3VzfGVufDF8fHx8MTc3MzQ3OTU4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Indoor Plants',
    rating: 4.5,
    reviews: 98,
    description: 'The Rubber Plant features thick, glossy leaves and can grow into an impressive indoor tree with proper care.',
    sunlight: 'Bright Indirect Light',
    watering: 'Weekly',
    size: 'Large',
    indoor: true,
    airPurifying: true,
    inStock: true,
    stock: 12,
    careInstructions: {
      watering: 'Water when top 2 inches of soil are dry. Reduce watering in winter.',
      sunlight: 'Prefers bright, indirect light but can tolerate medium light.',
      temperature: 'Ideal temperature range is 60-75°F (15-24°C).',
      humidity: 'Enjoys moderate humidity. Wipe leaves to keep them shiny and dust-free.',
      fertilizing: 'Feed monthly during growing season with diluted liquid fertilizer.'
    }
  },
  {
    id: '7',
    name: 'Aloe Vera',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1643717101835-ea24088aef16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbG9lJTIwdmVyYSUyMHN1Y2N1bGVudHxlbnwxfHx8fDE3NzMzNjYwMjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Outdoor Plants',
    rating: 4.8,
    reviews: 267,
    description: 'Aloe Vera is a succulent plant with medicinal properties. Its gel can be used to soothe burns and skin irritations.',
    sunlight: 'Bright Direct Light',
    watering: 'Bi-weekly',
    size: 'Small',
    indoor: false,
    airPurifying: true,
    inStock: true,
    stock: 35,
    careInstructions: {
      watering: 'Water deeply but infrequently. Allow soil to dry completely between waterings.',
      sunlight: 'Needs bright, direct sunlight. A south or west-facing window is ideal.',
      temperature: 'Prefers warm temperatures, 55-80°F (13-27°C).',
      humidity: 'Tolerates dry air well. No special humidity requirements.',
      fertilizing: 'Feed sparingly, once or twice per year with diluted succulent fertilizer.'
    }
  },
  {
    id: '8',
    name: 'Spider Plant',
    price: 22.99,
    image: 'https://images.unsplash.com/photo-1689004396413-c738357d1a06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlkZXIlMjBwbGFudCUyMGdyZWVufGVufDF8fHx8MTc3MzQ3OTU4M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Air Purifying Plants',
    rating: 4.7,
    reviews: 189,
    description: 'Spider Plants are hardy, adaptable houseplants with arching leaves. They produce baby plantlets that can be propagated easily.',
    sunlight: 'Medium Light',
    watering: 'Twice Weekly',
    size: 'Small',
    indoor: true,
    airPurifying: true,
    inStock: true,
    stock: 31,
    careInstructions: {
      watering: 'Water regularly, keeping soil lightly moist. Avoid overwatering.',
      sunlight: 'Prefers bright, indirect light but tolerates lower light conditions.',
      temperature: 'Comfortable in temperatures between 65-75°F (18-24°C).',
      humidity: 'Appreciates higher humidity but adapts to average household levels.',
      fertilizing: 'Feed twice a month during spring and summer with diluted fertilizer.'
    }
  },
  {
    id: '9',
    name: 'Desert Cactus',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1643717094992-5ab09ef07263?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWN0dXMlMjBkZXNlcnQlMjBwbGFudHxlbnwxfHx8fDE3NzM0MTU4MTR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Outdoor Plants',
    rating: 4.6,
    reviews: 145,
    description: 'This desert cactus is a low-maintenance plant that adds a unique architectural element to your space.',
    sunlight: 'Bright Direct Light',
    watering: 'Monthly',
    size: 'Small',
    indoor: false,
    airPurifying: false,
    inStock: true,
    stock: 24,
    careInstructions: {
      watering: 'Water sparingly during growing season, even less in winter. Let soil dry completely.',
      sunlight: 'Requires full sun. Place in the brightest spot available.',
      temperature: 'Tolerates hot temperatures. Protect from frost.',
      humidity: 'Thrives in low humidity environments.',
      fertilizing: 'Feed monthly during spring and summer with cactus fertilizer.'
    }
  },
  {
    id: '10',
    name: 'Bamboo Palm',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1771871259374-51affc38c885?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBwYWxtJTIwaW5kb29yfGVufDF8fHx8MTc3MzQ3OTU4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Indoor Plants',
    rating: 4.8,
    reviews: 112,
    description: 'The Bamboo Palm is an elegant indoor palm that adds a tropical feel to any room. It is also an excellent air purifier.',
    sunlight: 'Medium to Bright Light',
    watering: 'Twice Weekly',
    size: 'Large',
    indoor: true,
    airPurifying: true,
    inStock: true,
    stock: 9,
    careInstructions: {
      watering: 'Keep soil consistently moist during growing season. Water less in winter.',
      sunlight: 'Prefers bright, indirect light but tolerates lower light levels.',
      temperature: 'Thrives in temperatures between 65-80°F (18-27°C).',
      humidity: 'Loves high humidity. Mist regularly or use a humidifier.',
      fertilizing: 'Feed monthly during spring and summer with palm fertilizer.'
    }
  },
  {
    id: '11',
    name: 'ZZ Plant',
    price: 32.99,
    image: 'https://images.unsplash.com/photo-1563419837758-e48ef1b731dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBwb3R0ZWQlMjBwbGFudHN8ZW58MXx8fHwxNzczNDYxMTAyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Indoor Plants',
    rating: 4.9,
    reviews: 234,
    description: 'The ZZ Plant is nearly indestructible. Its glossy leaves and low maintenance requirements make it perfect for busy plant parents.',
    sunlight: 'Low to Bright Light',
    watering: 'Bi-weekly',
    size: 'Medium',
    indoor: true,
    airPurifying: true,
    inStock: true,
    stock: 21,
    careInstructions: {
      watering: 'Water when soil is completely dry. Can tolerate drought conditions.',
      sunlight: 'Adaptable to various light conditions from low to bright indirect light.',
      temperature: 'Comfortable in normal room temperatures, 60-75°F (15-24°C).',
      humidity: 'Tolerates dry air. No special humidity requirements.',
      fertilizing: 'Feed once or twice during growing season with diluted fertilizer.'
    }
  },
  {
    id: '12',
    name: 'Lavender',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1611909023032-2d6b3134ecba?w=1080',
    category: 'Flowering Plants',
    rating: 4.5,
    reviews: 178,
    description: 'Lavender is an aromatic flowering plant known for its soothing fragrance and beautiful purple blooms.',
    sunlight: 'Bright Direct Light',
    watering: 'Weekly',
    size: 'Small',
    indoor: false,
    airPurifying: false,
    inStock: true,
    stock: 27,
    careInstructions: {
      watering: 'Water when soil is dry. Lavender prefers drier conditions.',
      sunlight: 'Needs full sun, at least 6-8 hours of direct sunlight daily.',
      temperature: 'Hardy plant that tolerates a range of temperatures.',
      humidity: 'Prefers low to moderate humidity.',
      fertilizing: 'Light feeding in spring with a low-nitrogen fertilizer.'
    }
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    rating: 5,
    date: '2026-03-10',
    comment: 'Absolutely love my Monstera! It arrived in perfect condition and has been thriving in my living room. The packaging was excellent too.',
    image: 'https://randomuser.me/api/portraits/women/1.jpg'
  },
  {
    id: '2',
    author: 'Michael Chen',
    rating: 5,
    date: '2026-03-08',
    comment: 'Great quality plants and fast shipping! The Snake Plant is exactly what I needed for my office. Highly recommend Thottam!',
    image: 'https://randomuser.me/api/portraits/men/2.jpg'
  },
  {
    id: '3',
    author: 'Emma Davis',
    rating: 4,
    date: '2026-03-05',
    comment: 'Beautiful plants and excellent customer service. My only suggestion would be more care instructions included with the delivery.',
    image: 'https://randomuser.me/api/portraits/women/3.jpg'
  },
  {
    id: '4',
    author: 'James Wilson',
    rating: 5,
    date: '2026-03-01',
    comment: 'The Fiddle Leaf Fig is stunning! It has become the centerpiece of my home. Thank you for such a healthy, beautiful plant.',
    image: 'https://randomuser.me/api/portraits/men/4.jpg'
  }
];

export const coupons: Coupon[] = [
  {
    id: '1',
    code: 'WELCOME20',
    discount: 20,
    type: 'percentage',
    minOrder: 50,
    expiryDate: '2026-12-31',
    description: 'Get 20% off on orders above $50',
    active: true
  },
  {
    id: '2',
    code: 'SPRING15',
    discount: 15,
    type: 'percentage',
    minOrder: 30,
    expiryDate: '2026-06-30',
    description: 'Spring special - 15% off on orders above $30',
    active: true
  },
  {
    id: '3',
    code: 'FREESHIP',
    discount: 10,
    type: 'fixed',
    expiryDate: '2026-12-31',
    description: 'Free shipping on all orders',
    active: true
  },
  {
    id: '4',
    code: 'NEWPLANT',
    discount: 25,
    type: 'percentage',
    minOrder: 100,
    expiryDate: '2026-09-30',
    description: 'Save 25% on orders above $100',
    active: true
  },
  {
    id: '5',
    code: 'EXPIRED10',
    discount: 10,
    type: 'percentage',
    expiryDate: '2026-01-31',
    description: 'This coupon has expired',
    active: false
  }
];

export const orders: Order[] = [
  {
    id: 'ORD001',
    date: '2026-03-10',
    status: 'delivered',
    total: 124.97,
    items: [
      {
        plantId: '1',
        plantName: 'Monstera Deliciosa',
        quantity: 2,
        price: 45.99,
        image: plants[0].image
      },
      {
        plantId: '4',
        plantName: 'Golden Pothos',
        quantity: 1,
        price: 24.99,
        image: plants[3].image
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Green Street',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      phone: '(555) 123-4567'
    }
  },
  {
    id: 'ORD002',
    date: '2026-03-12',
    status: 'shipped',
    total: 79.99,
    items: [
      {
        plantId: '3',
        plantName: 'Fiddle Leaf Fig',
        quantity: 1,
        price: 79.99,
        image: plants[2].image
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Green Street',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      phone: '(555) 123-4567'
    }
  },
  {
    id: 'ORD003',
    date: '2026-03-14',
    status: 'processing',
    total: 94.97,
    items: [
      {
        plantId: '2',
        plantName: 'Snake Plant',
        quantity: 2,
        price: 29.99,
        image: plants[1].image
      },
      {
        plantId: '5',
        plantName: 'Peace Lily',
        quantity: 1,
        price: 34.99,
        image: plants[4].image
      }
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Green Street',
      city: 'Portland',
      state: 'OR',
      zipCode: '97201',
      phone: '(555) 123-4567'
    }
  }
];

export const categories = [
  {
    id: '1',
    name: 'Indoor Plants',
    icon: 'leaf',
    count: plants.filter(p => p.category === 'Indoor Plants').length
  },
  {
    id: '2',
    name: 'Outdoor Plants',
    icon: 'trees',
    count: plants.filter(p => p.category === 'Outdoor Plants').length
  },
  {
    id: '3',
    name: 'Flowering Plants',
    icon: 'flower',
    count: plants.filter(p => p.category === 'Flowering Plants').length
  },
  {
    id: '4',
    name: 'Air Purifying Plants',
    icon: 'wind',
    count: plants.filter(p => p.category === 'Air Purifying Plants').length
  }
];
