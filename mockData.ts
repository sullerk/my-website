const heroBg = 'https://images.unsplash.com/photo-1461896836934- voices-of-angels?w=1920&h=1080&fit=crop';
const item1 = 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=400&fit=crop';
const item2 = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop';
const avatar1 = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop';
const avatar2 = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop';

export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  type: 'card' | 'memorabilia' | 'sneaker' | 'jersey' | 'ball' | 'photo';
  category?: 'trading-cards' | 'signed-jerseys' | 'match-balls' | 'autographed-photos' | 'vintage';
  isBidding?: boolean;
  currentBid?: number;
  priceChange?: number;
  momentum?: 'High' | 'Medium' | 'Low';
  proofs?: ('auth' | 'photo' | 'video' | 'coa')[];
}

export interface Seller {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  rating: number;
  items: Item[];
  verified?: boolean;
  totalSales?: number;
}

export interface Collector {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  collections: number;
  followers: number;
  verified: boolean;
}

export interface Discussion {
  id: string;
  title: string;
  author: string;
  avatar: string;
  replies: number;
  timestamp: string;
}

export interface Story {
  id: string;
  type: 'image' | 'text' | 'update';
  content: string;
  image?: string;
  timestamp: string;
  viewed: boolean;
}

export interface SellerPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
}

export const mockStories: Story[] = [
  { id: '1', type: 'image', content: 'Just acquired a rare 1986 Fleer!', image: item1, timestamp: '2h ago', viewed: false },
  { id: '2', type: 'text', content: 'New graded cards arriving this week! Stay tuned for some amazing PSA 10s 🔥', timestamp: '4h ago', viewed: false },
  { id: '3', type: 'update', content: 'Price drop alert on vintage jerseys!', timestamp: '6h ago', viewed: true },
  { id: '4', type: 'image', content: 'Behind the scenes at the grading facility', image: item1, timestamp: '8h ago', viewed: true },
  { id: '5', type: 'text', content: 'Big announcement coming tomorrow! 🚀', timestamp: '12h ago', viewed: true },
  { id: '6', type: 'update', content: 'Flash sale: 20% off all trading cards', timestamp: '1d ago', viewed: true },
  { id: '7', type: 'image', content: 'Look at this beauty! 💎', image: item1, timestamp: '1d ago', viewed: true },
  { id: '8', type: 'text', content: 'Who else is watching the finals tonight?', timestamp: '2d ago', viewed: true },
];

export const mockSellerPosts: SellerPost[] = [
  { id: '1', author: 'Vault Hunter', avatar: avatar1, content: 'Just listed a rare Michael Jordan rookie card! PSA 10 gem mint condition. This one won\'t last long 🏀', timestamp: '1h ago', likes: 45, comments: 12 },
  { id: '2', author: 'Vault Hunter', avatar: avatar1, content: 'What\'s everyone\'s thoughts on the current market for vintage basketball cards? I\'m seeing some interesting movement.', timestamp: '3h ago', likes: 28, comments: 34 },
  { id: '3', author: 'Vault Hunter', avatar: avatar1, content: 'New shipment of authenticated jerseys arriving next week! DM for early access 🔥', timestamp: '6h ago', likes: 67, comments: 8 },
  { id: '4', author: 'Vault Hunter', avatar: avatar1, content: 'Price prediction: LeBron rookie cards will see a 15% increase by Q1 next year. Here\'s why...', timestamp: '1d ago', likes: 112, comments: 45 },
  { id: '5', author: 'Vault Hunter', avatar: avatar1, content: 'Thanks to everyone who visited my booth at the card show! Amazing weekend 🙏', timestamp: '2d ago', likes: 89, comments: 21 },
];

export const mockCollectors: Collector[] = [
  { id: '1', name: 'CardKing99', handle: '@cardking99', avatar: avatar1, collections: 234, followers: 12500, verified: true },
  { id: '2', name: 'SportsVault', handle: '@sportsvault', avatar: avatar2, collections: 189, followers: 8900, verified: true },
  { id: '3', name: 'RookieHunter', handle: '@rookiehunter', avatar: avatar1, collections: 156, followers: 6200, verified: false },
  { id: '4', name: 'GradedGems', handle: '@gradedgems', avatar: avatar2, collections: 312, followers: 15800, verified: true },
  { id: '5', name: 'VintageVault', handle: '@vintagevault', avatar: avatar1, collections: 98, followers: 4500, verified: true },
  { id: '6', name: 'SlabMaster', handle: '@slabmaster', avatar: avatar2, collections: 445, followers: 22100, verified: true },
];

export const mockDiscussions: Discussion[] = [
  { id: '1', title: 'Is this the right time to invest in rookie cards?', author: 'CardKing99', avatar: avatar1, replies: 45, timestamp: '2h ago' },
  { id: '2', title: 'PSA vs BGS: Which grading is better for resale?', author: 'GradedGems', avatar: avatar2, replies: 128, timestamp: '4h ago' },
  { id: '3', title: 'Best storage solutions for high-value memorabilia', author: 'VintageVault', avatar: avatar1, replies: 67, timestamp: '6h ago' },
  { id: '4', title: 'Market analysis: Q4 2024 predictions', author: 'SportsVault', avatar: avatar2, replies: 89, timestamp: '8h ago' },
];

export const mockSellers: Seller[] = [
  {
    id: '1',
    name: 'Vault Hunter',
    handle: '@vaulthunter',
    avatar: avatar1,
    bio: 'Specializing in high-end graded basketball slabs and vintage finds.',
    rating: 4.9,
    verified: true,
    totalSales: 1250,
    items: [
      {
        id: '101',
        title: 'Michael Jordan 1986 Fleer',
        description: 'PSA 10 Gem Mint. The holy grail of basketball cards.',
        price: 150000,
        image: item1,
        type: 'card',
        category: 'trading-cards',
        isBidding: true,
        currentBid: 125000,
        priceChange: 12.5,
        momentum: 'High',
        proofs: ['auth', 'photo', 'video', 'coa']
      },
      {
        id: '102',
        title: 'LeBron James Rookie Chrome',
        description: 'BGS 9.5. Sharp corners, perfect centering.',
        price: 8500,
        image: item1,
        type: 'card',
        category: 'trading-cards',
        priceChange: 8.2,
        momentum: 'High',
        proofs: ['auth', 'photo']
      },
      {
        id: '103',
        title: 'Kobe Bryant Auto Jersey',
        description: 'Signed in 2008. Framed with COA.',
        price: 4200,
        image: item2,
        type: 'jersey',
        category: 'signed-jerseys',
        priceChange: -2.1,
        momentum: 'Medium'
      },
      {
        id: '104',
        title: '1996 Topps Chrome Refractor',
        description: 'Rare refractor parallel. PSA 9.',
        price: 12000,
        image: item1,
        type: 'card',
        category: 'trading-cards',
        priceChange: 15.8,
        momentum: 'High'
      }
    ]
  },
  {
    id: '2',
    name: 'Legacy Collections',
    handle: '@legacy_co',
    avatar: avatar2,
    bio: 'Museum quality sports memorabilia and game-worn gear.',
    rating: 5.0,
    verified: true,
    totalSales: 890,
    items: [
      {
        id: '201',
        title: 'Messi Signed Match Kit',
        description: 'Worn during 2022 World Cup Qualifiers.',
        price: 25000,
        image: item2,
        type: 'jersey',
        category: 'signed-jerseys',
        priceChange: 22.3,
        momentum: 'High'
      },
      {
        id: '202',
        title: 'Pelé 1958 Rookie',
        description: 'Vintage condition, authentic. SGC 4.',
        price: 18000,
        image: item1,
        type: 'card',
        category: 'vintage',
        priceChange: 5.6,
        momentum: 'Medium'
      },
      {
        id: '203',
        title: 'Signed Ronaldo Boots',
        description: 'Match prepared boots, signed on heel.',
        price: 3500,
        image: item2,
        type: 'memorabilia',
        category: 'autographed-photos',
        isBidding: true,
        currentBid: 2100,
        priceChange: -4.2,
        momentum: 'Low'
      },
      {
        id: '204',
        title: 'Maradona Napoli Jersey',
        description: 'Authentic 1987 Home Kit. Slight wear.',
        price: 9500,
        image: item2,
        type: 'jersey',
        category: 'vintage',
        priceChange: 18.9,
        momentum: 'High'
      }
    ]
  },
  {
    id: '3',
    name: 'Hoops Heaven',
    handle: '@hoops_hvn',
    avatar: avatar1,
    bio: 'Just basketball. From vintage to modern era.',
    rating: 4.7,
    verified: false,
    totalSales: 456,
    items: [
      {
        id: '301',
        title: 'Curry Rookie Auto',
        description: 'National Treasures /99. On-card auto.',
        price: 45000,
        image: item1,
        type: 'card',
        category: 'trading-cards',
        priceChange: 9.4,
        momentum: 'High'
      },
      {
        id: '302',
        title: 'Shaq Game Worn Shoe',
        description: 'Size 22. Signed. Magic era.',
        price: 2800,
        image: item2,
        type: 'memorabilia',
        category: 'vintage',
        priceChange: -1.8,
        momentum: 'Medium'
      }
    ]
  },
  {
    id: '4',
    name: 'Gridiron Gold',
    handle: '@grid_gold',
    avatar: avatar2,
    bio: 'NFL legends and future Hall of Famers.',
    rating: 4.8,
    verified: true,
    totalSales: 678,
    items: [
      {
        id: '401',
        title: 'Tom Brady Contenders',
        description: '2000 Playoff Contenders Rookie Auto.',
        price: 32000,
        image: item1,
        type: 'card',
        category: 'trading-cards',
        priceChange: -3.5,
        momentum: 'Medium'
      }
    ]
  }
];

export const categoryItems: Record<string, Item[]> = {
  'trading-cards': [
    { id: 'tc1', title: 'Giannis Prizm Silver', description: '2013 Panini Prizm Silver. BGS 9.5', price: 5200, image: item1, type: 'card', category: 'trading-cards', priceChange: 7.8, momentum: 'High' },
    { id: 'tc2', title: 'Luka Doncic RPA', description: 'National Treasures RPA /99', price: 28000, image: item1, type: 'card', category: 'trading-cards', priceChange: 14.2, momentum: 'High' },
    { id: 'tc3', title: 'Zion Williamson Mosaic', description: '2019 Mosaic Genesis 1/1', price: 15000, image: item1, type: 'card', category: 'trading-cards', priceChange: -5.3, momentum: 'Low' },
    { id: 'tc4', title: 'Patrick Mahomes Auto', description: '2017 Contenders Championship Ticket', price: 42000, image: item1, type: 'card', category: 'trading-cards', priceChange: 11.6, momentum: 'High' },
    { id: 'tc5', title: 'Ja Morant Silver', description: '2019 Panini Prizm Silver PSA 10', price: 3800, image: item1, type: 'card', category: 'trading-cards', priceChange: 6.9, momentum: 'Medium' },
    { id: 'tc6', title: 'Shohei Ohtani RC', description: '2018 Topps Chrome Update PSA 10', price: 8900, image: item1, type: 'card', category: 'trading-cards', priceChange: 25.4, momentum: 'High' },
  ],
  'signed-jerseys': [
    { id: 'sj1', title: 'Brady Patriots Jersey', description: 'Game-worn, signed. Super Bowl LI.', price: 18500, image: item2, type: 'jersey', category: 'signed-jerseys', priceChange: 4.5, momentum: 'Medium' },
    { id: 'sj2', title: 'Kobe Lakers Finals', description: '2010 Finals. Framed with COA.', price: 35000, image: item2, type: 'jersey', category: 'signed-jerseys', priceChange: 28.7, momentum: 'High' },
    { id: 'sj3', title: 'Mbappe PSG Kit', description: '2022 Season. Signed post-match.', price: 4800, image: item2, type: 'jersey', category: 'signed-jerseys', priceChange: 12.1, momentum: 'High' },
    { id: 'sj4', title: 'Federer Wimbledon', description: '2017 Wimbledon Final worn shirt', price: 22000, image: item2, type: 'jersey', category: 'signed-jerseys', priceChange: -2.8, momentum: 'Low' },
    { id: 'sj5', title: 'Gretzky Oilers', description: 'Authentic 1985 jersey, framed', price: 45000, image: item2, type: 'jersey', category: 'signed-jerseys', priceChange: 8.9, momentum: 'Medium' },
  ],
  'match-balls': [
    { id: 'mb1', title: 'World Cup 2022 Final', description: 'Official match ball. Argentina vs France.', price: 12000, image: item2, type: 'ball', category: 'match-balls', priceChange: 35.2, momentum: 'High' },
    { id: 'mb2', title: 'NBA Finals 2023', description: 'Game 5 ball. Nuggets championship.', price: 8500, image: item2, type: 'ball', category: 'match-balls', priceChange: 15.8, momentum: 'High' },
    { id: 'mb3', title: 'Super Bowl LVII', description: 'Official Wilson game ball.', price: 6200, image: item2, type: 'ball', category: 'match-balls', priceChange: 9.3, momentum: 'Medium' },
    { id: 'mb4', title: 'Champions League Final', description: '2023 Manchester City final ball', price: 7800, image: item2, type: 'ball', category: 'match-balls', priceChange: 11.2, momentum: 'High' },
  ],
  'autographed-photos': [
    { id: 'ap1', title: 'Jordan "The Shot"', description: '1998 Finals. Signed 16x20.', price: 4500, image: item1, type: 'photo', category: 'autographed-photos', priceChange: 18.6, momentum: 'High' },
    { id: 'ap2', title: 'Ali vs Frazier', description: 'Dual signed. Thrilla in Manila.', price: 8900, image: item1, type: 'photo', category: 'autographed-photos', priceChange: 6.4, momentum: 'Medium' },
    { id: 'ap3', title: 'Tiger Woods Masters', description: '1997 Masters celebration. Signed.', price: 3200, image: item1, type: 'photo', category: 'autographed-photos', priceChange: -4.1, momentum: 'Low' },
    { id: 'ap4', title: 'Messi World Cup Lift', description: '2022 Trophy lift. Signed 20x24.', price: 6500, image: item1, type: 'photo', category: 'autographed-photos', priceChange: 42.3, momentum: 'High' },
    { id: 'ap5', title: 'Serena Grand Slam', description: '23rd Grand Slam victory photo', price: 2800, image: item1, type: 'photo', category: 'autographed-photos', priceChange: 5.7, momentum: 'Medium' },
  ],
  'vintage': [
    { id: 'v1', title: '1952 Topps Mantle', description: 'SGC 3. Iconic vintage piece.', price: 125000, image: item1, type: 'card', category: 'vintage', priceChange: 4.2, momentum: 'Medium' },
    { id: 'v2', title: '1979 Wayne Gretzky RC', description: 'O-Pee-Chee. PSA 7.', price: 28000, image: item1, type: 'card', category: 'vintage', priceChange: 7.8, momentum: 'Medium' },
    { id: 'v3', title: '1969 Topps Alcindor', description: 'Kareem rookie. PSA 6.', price: 15500, image: item1, type: 'card', category: 'vintage', priceChange: 3.4, momentum: 'Low' },
    { id: 'v4', title: 'Babe Ruth Cabinet', description: '1920s cabinet photo. PSA Auth.', price: 45000, image: item1, type: 'photo', category: 'vintage', priceChange: 2.1, momentum: 'Low' },
    { id: 'v5', title: '1986 Jordan Fleer RC', description: 'PSA 8. Clean surfaces.', price: 18000, image: item1, type: 'card', category: 'vintage', priceChange: 9.6, momentum: 'High' },
  ],
};

export const heroImage = heroBg;
