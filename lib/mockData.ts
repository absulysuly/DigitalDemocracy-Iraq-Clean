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
    content: 'Excited to announce our university's cultural festival next month! Who's coming? 🎉',
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
