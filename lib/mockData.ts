// Mock data for MVP development
// Will be replaced with real database queries once Prisma is working

export const GOVERNORATES = [
  'Baghdad',
  'Basra',
  'Nineveh',
  'Erbil',
  'Sulaymaniyah',
  'Duhok',
  'Anbar',
  'Diyala',
  'Karbala',
  'Najaf',
  'Wasit',
  'Salah ad-Din',
  'Maysan',
  'Dhi Qar',
  'Muthanna',
  'Qadisiyyah',
  'Babil',
  'Kirkuk',
] as const;

export type Governorate = typeof GOVERNORATES[number];

export interface MockUser {
  id: string;
  name: string;
  governorate: Governorate;
  avatar?: string;
  university?: string;
}

export interface MockPost {
  id: string;
  content: string;
  image?: string;
  governorate: Governorate;
  userId: string;
  user: MockUser;
  likes: number;
  comments: number;
  hasLiked?: boolean;
  createdAt: Date;
}

// Sample users
export const MOCK_USERS: MockUser[] = [
  {
    id: '1',
    name: 'Ahmed Al-Baghdadi',
    governorate: 'Baghdad',
    avatar: 'https://i.pravatar.cc/150?img=12',
    university: 'University of Baghdad',
  },
  {
    id: '2',
    name: 'Sara Ibrahim',
    governorate: 'Basra',
    avatar: 'https://i.pravatar.cc/150?img=45',
    university: 'University of Basra',
  },
  {
    id: '3',
    name: 'Omar Hussein',
    governorate: 'Erbil',
    avatar: 'https://i.pravatar.cc/150?img=33',
    university: 'Salahaddin University',
  },
  {
    id: '4',
    name: 'Leila Mohammed',
    governorate: 'Nineveh',
    avatar: 'https://i.pravatar.cc/150?img=47',
    university: 'University of Mosul',
  },
  {
    id: '5',
    name: 'Hassan Ali',
    governorate: 'Najaf',
    avatar: 'https://i.pravatar.cc/150?img=51',
  },
];

// Sample posts
export const MOCK_POSTS: MockPost[] = [
  {
    id: '1',
    content: 'Just tried the new café on Al-Mansour street. Best Turkish coffee in Baghdad! ☕',
    governorate: 'Baghdad',
    userId: '1',
    user: MOCK_USERS[0],
    likes: 24,
    comments: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
  },
  {
    id: '2',
    content: 'Looking for study partners for the upcoming exams. Anyone from the Engineering department? 📚',
    governorate: 'Basra',
    userId: '2',
    user: MOCK_USERS[1],
    likes: 12,
    comments: 8,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    id: '3',
    content: 'The sunset at Qal\'at Kirkuk today was absolutely stunning! 🌅',
    image: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?w=800&auto=format&fit=crop&q=60',
    governorate: 'Erbil',
    userId: '3',
    user: MOCK_USERS[2],
    likes: 67,
    comments: 12,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
  {
    id: '4',
    content: "Excited to announce our university's cultural festival next month! Who's coming? 🎉",
    governorate: 'Nineveh',
    userId: '4',
    user: MOCK_USERS[3],
    likes: 45,
    comments: 23,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
  },
  {
    id: '5',
    content: 'Visited the Imam Ali Shrine today. Such peace and beauty. 🕌',
    image: 'https://images.unsplash.com/photo-1588787341444-17c9e8c3d907?w=800&auto=format&fit=crop&q=60',
    governorate: 'Najaf',
    userId: '5',
    user: MOCK_USERS[4],
    likes: 89,
    comments: 15,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: '6',
    content: 'Anyone know a good place to buy tech gadgets in Baghdad? Looking for a new laptop.',
    governorate: 'Baghdad',
    userId: '1',
    user: MOCK_USERS[0],
    likes: 8,
    comments: 14,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 36), // 1.5 days ago
  },
];

// Helper functions
export function getPostsByGovernorate(governorate?: string): MockPost[] {
  if (!governorate || governorate === 'All') {
    return MOCK_POSTS;
  }
  return MOCK_POSTS.filter(post => post.governorate === governorate);
}

export function getPostById(id: string): MockPost | undefined {
  return MOCK_POSTS.find(post => post.id === id);
}

export function getCurrentUser(): MockUser {
  // For MVP, return first user as "logged in" user
  return MOCK_USERS[0];
}

// Time formatting helper
export function formatTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  return `${weeks}w ago`;
}

// ============================================
// IRAQ COMPASS - PLACES & EVENTS
// ============================================

export interface MockPlace {
  id: string;
  name: string;
  name_ar: string;
  name_ku: string;
  category: string;
  governorate: Governorate;
  address: string;
  description: string;
  description_ar: string;
  description_ku: string;
  images: string[];
  phone?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
}

export interface MockEvent {
  id: string;
  title: string;
  title_ar: string;
  title_ku: string;
  description: string;
  description_ar: string;
  description_ku: string;
  governorate: Governorate;
  category: string;
  date: Date;
  endDate?: Date;
  location: string;
  address: string;
  image: string;
  organizer: string;
  website?: string;
  ticketUrl?: string;
}

// Mock Places
export const MOCK_PLACES: MockPlace[] = [
  {
    id: '1',
    name: 'Saj Al-Rif',
    name_ar: 'ساج الريف',
    name_ku: 'ساجی گوند',
    category: 'dining',
    governorate: 'Baghdad',
    address: 'Al-Mansour, near 14 Ramadan Street',
    description: 'Traditional Iraqi restaurant serving authentic saj bread and grilled meats',
    description_ar: 'مطعم عراقي تقليدي يقدم خبز الصاج الأصيل واللحوم المشوية',
    description_ku: 'چێشتخانەی عێراقیی نەریتی کە نانی ساج و گۆشتی بڕژاو پێشکەش دەکات',
    images: ['https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800'],
    phone: '+964 770 123 4567',
  },
  {
    id: '2',
    name: 'Basra Times Mall',
    name_ar: 'باسرة تايمز مول',
    name_ku: 'مۆڵی بەسرە تایمز',
    category: 'shopping',
    governorate: 'Basra',
    address: 'Shatt al-Arab Street',
    description: 'Modern shopping mall with international and local brands',
    description_ar: 'مركز تسوق عصري يضم علامات تجارية عالمية ومحلية',
    description_ku: 'مۆڵی شۆپینگی مۆدێرن بە براندە نێودەوڵەتی و ناوخۆییەکان',
    images: ['https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800'],
    phone: '+964 770 234 5678',
    website: 'https://example.com',
  },
  {
    id: '3',
    name: 'Citadel of Erbil',
    name_ar: 'قلعة أربيل',
    name_ku: 'قەڵای هەولێر',
    category: 'culture',
    governorate: 'Erbil',
    address: 'Erbil City Center',
    description: 'UNESCO World Heritage Site, one of the oldest continuously inhabited places',
    description_ar: 'موقع التراث العالمي لليونسكو، أحد أقدم الأماكن المأهولة بشكل مستمر',
    description_ku: 'شوێنی میراتی جیهانی یونسکۆ، یەکێک لە کۆنترین شوێنە نیشتەجێبووەکان',
    images: ['https://images.unsplash.com/photo-1583437735823-54982d2f4632?w=800'],
  },
  {
    id: '4',
    name: 'Fitness Plus Gym',
    name_ar: 'فيتنس بلس جيم',
    name_ku: 'فیتنس پلەس جیم',
    category: 'sports',
    governorate: 'Baghdad',
    address: 'Karrada District',
    description: 'Modern gym with latest equipment and professional trainers',
    description_ar: 'صالة رياضية حديثة مع أحدث المعدات ومدربين محترفين',
    description_ku: 'جیمی مۆدێرن بە ئامێرە نوێیەکان و ڕاهێنەری پیشەیی',
    images: ['https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800'],
    phone: '+964 770 345 6789',
  },
  {
    id: '5',
    name: 'Al-Najaf Library',
    name_ar: 'مكتبة النجف',
    name_ku: 'کتێبخانەی نەجەف',
    category: 'education',
    governorate: 'Najaf',
    address: 'Near Imam Ali Shrine',
    description: 'Historic library with vast collection of Islamic manuscripts',
    description_ar: 'مكتبة تاريخية تحتوي على مجموعة ضخمة من المخطوطات الإسلامية',
    description_ku: 'کتێبخانەی مێژوویی بە کۆمەڵێکی زۆر لە دەستنووسە ئیسلامییەکان',
    images: ['https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800'],
  },
  {
    id: '6',
    name: 'Coffee Culture',
    name_ar: 'ثقافة القهوة',
    name_ku: 'کلتووری قاوە',
    category: 'dining',
    governorate: 'Sulaymaniyah',
    address: 'Salim Street',
    description: 'Cozy café serving specialty coffee and pastries',
    description_ar: 'مقهى مريح يقدم قهوة مميزة ومعجنات',
    description_ku: 'قاوەخانەیەکی خۆش کە قاوەی تایبەت و پیرۆگی پێشکەش دەکات',
    images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800'],
    phone: '+964 770 456 7890',
  },
];

// Mock Events
export const MOCK_EVENTS: MockEvent[] = [
  {
    id: '1',
    title: 'Baghdad Book Fair 2024',
    title_ar: 'معرض بغداد الدولي للكتاب 2024',
    title_ku: 'نمایشگای نێودەوڵەتی کتێبی بەغدا 2024',
    description: 'Annual international book fair featuring publishers from across the Arab world',
    description_ar: 'معرض الكتاب الدولي السنوي يضم ناشرين من مختلف أنحاء العالم العربي',
    description_ku: 'نمایشگای ساڵانەی نێودەوڵەتی کتێب بە بەشداری بڵاوکەرەوە لە جیهانی عەرەب',
    governorate: 'Baghdad',
    category: 'culture',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14), // 2 weeks from now
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 21), // 3 weeks from now
    location: 'Baghdad International Fair',
    address: 'Al-Mansour, Baghdad',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800',
    organizer: 'Iraqi Ministry of Culture',
  },
  {
    id: '2',
    title: 'Erbil Food Festival',
    title_ar: 'مهرجان أربيل للطعام',
    title_ku: 'جەژنی خواردنی هەولێر',
    description: 'Celebrate Kurdish and Iraqi cuisine with local chefs and restaurants',
    description_ar: 'احتفل بالمطبخ الكردي والعراقي مع الطهاة والمطاعم المحلية',
    description_ku: 'ئاهەنگی خواردنی کوردی و عێراقی لەگەڵ چێشتلێنەر و چێشتخانە ناوخۆییەکان',
    governorate: 'Erbil',
    category: 'entertainment',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 1 week from now
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 9), // 9 days from now
    location: 'Sami Abdulrahman Park',
    address: 'Erbil City Center',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
    organizer: 'Erbil Tourism Board',
    ticketUrl: 'https://example.com/tickets',
  },
  {
    id: '3',
    title: 'Basra Marathon 2024',
    title_ar: 'ماراثون البصرة 2024',
    title_ku: 'ڕاکردنی بەسرە 2024',
    description: '10K and 5K races through the historic city of Basra',
    description_ar: 'سباقات 10 كم و 5 كم عبر مدينة البصرة التاريخية',
    description_ku: 'ڕاکردنی 10 کم و 5 کم بە ناو شاری مێژوویی بەسرە',
    governorate: 'Basra',
    category: 'sports',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 1 month from now
    location: 'Basra Corniche',
    address: 'Shatt al-Arab Waterfront',
    image: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800',
    organizer: 'Basra Sports Club',
    website: 'https://example.com',
  },
  {
    id: '4',
    title: 'Tech Startup Summit',
    title_ar: 'قمة الشركات الناشئة التقنية',
    title_ku: 'کۆنفرانسی کۆمپانیا تەکنەلۆژییە نوێیەکان',
    description: 'Connect with entrepreneurs, investors, and tech innovators',
    description_ar: 'تواصل مع رواد الأعمال والمستثمرين ومبتكري التكنولوجيا',
    description_ku: 'پەیوەندی بە كارمەندانی بازرگانی و وەبەرهێنەران و داهێنەرانی تەکنەلۆژیا',
    governorate: 'Baghdad',
    category: 'community',
    date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45), // 1.5 months from now
    location: 'Baghdad Convention Center',
    address: 'Jadiriyah, Baghdad',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    organizer: 'Iraq Tech Association',
    website: 'https://example.com',
  },
];

// Helper functions for places and events
export function getPlacesByCategory(category?: string): MockPlace[] {
  if (!category) return MOCK_PLACES;
  return MOCK_PLACES.filter(place => place.category === category);
}

export function getPlacesByGovernorate(governorate?: string): MockPlace[] {
  if (!governorate || governorate === 'All') return MOCK_PLACES;
  return MOCK_PLACES.filter(place => place.governorate === governorate);
}

export function getPlaceById(id: string): MockPlace | undefined {
  return MOCK_PLACES.find(place => place.id === id);
}

export function getEventsByCategory(category?: string): MockEvent[] {
  if (!category) return MOCK_EVENTS;
  return MOCK_EVENTS.filter(event => event.category === category);
}

export function getEventsByGovernorate(governorate?: string): MockEvent[] {
  if (!governorate || governorate === 'All') return MOCK_EVENTS;
  return MOCK_EVENTS.filter(event => event.governorate === governorate);
}

export function getEventById(id: string): MockEvent | undefined {
  return MOCK_EVENTS.find(event => event.id === id);
}

export function getUpcomingEvents(): MockEvent[] {
  const now = new Date();
  return MOCK_EVENTS.filter(event => event.date > now).sort((a, b) => a.date.getTime() - b.date.getTime());
}

// Format date for events
export function formatEventDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
