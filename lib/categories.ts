// Iraq Compass Categories
// 9 major categories for places and events

export interface Category {
  id: string;
  name_en: string;
  name_ar: string;
  name_ku: string;
  icon: string; // Emoji for MVP
  color: string; // Tailwind color class
  description_en: string;
  description_ar: string;
  description_ku: string;
}

export const CATEGORIES: Category[] = [
  {
    id: 'dining',
    name_en: 'Dining & Cafés',
    name_ar: 'مطاعم ومقاهي',
    name_ku: 'چێشتخانە و چایخانە',
    icon: '🍽️',
    color: 'orange',
    description_en: 'Restaurants, cafés, and eateries',
    description_ar: 'مطاعم ومقاهي ومأكولات',
    description_ku: 'چێشتخانەکان و قاوەخانە و خواردن',
  },
  {
    id: 'entertainment',
    name_en: 'Entertainment',
    name_ar: 'ترفيه',
    name_ku: 'کات بەسەربردن',
    icon: '🎭',
    color: 'purple',
    description_en: 'Cinemas, theaters, and fun activities',
    description_ar: 'سينما ومسارح وأنشطة ترفيهية',
    description_ku: 'سینەما و شانۆ و چالاکی خۆشی',
  },
  {
    id: 'shopping',
    name_en: 'Shopping',
    name_ar: 'تسوق',
    name_ku: 'بازاڕکردن',
    icon: '🛍️',
    color: 'pink',
    description_en: 'Malls, markets, and retail stores',
    description_ar: 'مراكز تسوق وأسواق ومتاجر',
    description_ku: 'مۆڵ و بازاڕ و فرۆشگاکان',
  },
  {
    id: 'culture',
    name_en: 'Culture & Heritage',
    name_ar: 'ثقافة وتراث',
    name_ku: 'کلتوور و میرات',
    icon: '🏛️',
    color: 'indigo',
    description_en: 'Museums, historical sites, and cultural centers',
    description_ar: 'متاحف ومواقع تاريخية ومراكز ثقافية',
    description_ku: 'مۆزەخانە و شوێنی مێژوویی و ناوەندی کلتووری',
  },
  {
    id: 'sports',
    name_en: 'Sports & Fitness',
    name_ar: 'رياضة ولياقة',
    name_ku: 'وەرزش و تەندروستی',
    icon: '⚽',
    color: 'green',
    description_en: 'Gyms, sports clubs, and fitness centers',
    description_ar: 'صالات رياضية ونوادي ومراكز لياقة',
    description_ku: 'جیم و یانەی وەرزشی و ناوەندی تەندروستی',
  },
  {
    id: 'education',
    name_en: 'Education',
    name_ar: 'تعليم',
    name_ku: 'پەروەردە',
    icon: '📚',
    color: 'blue',
    description_en: 'Universities, libraries, and learning centers',
    description_ar: 'جامعات ومكتبات ومراكز تعليمية',
    description_ku: 'زانکۆ و کتێبخانە و ناوەندی فێرکاری',
  },
  {
    id: 'health',
    name_en: 'Health & Wellness',
    name_ar: 'صحة وعافية',
    name_ku: 'تەندروستی',
    icon: '🏥',
    color: 'red',
    description_en: 'Hospitals, clinics, and wellness centers',
    description_ar: 'مستشفيات وعيادات ومراكز صحية',
    description_ku: 'نەخۆشخانە و کلینیک و ناوەندی تەندروستی',
  },
  {
    id: 'services',
    name_en: 'Services',
    name_ar: 'خدمات',
    name_ku: 'خزمەتگوزاری',
    icon: '🔧',
    color: 'gray',
    description_en: 'Utilities, repairs, and professional services',
    description_ar: 'خدمات عامة وإصلاحات وخدمات مهنية',
    description_ku: 'خزمەتگوزاری و چاککردنەوە و خزمەتی پیشەیی',
  },
  {
    id: 'community',
    name_en: 'Community',
    name_ar: 'مجتمع',
    name_ku: 'کۆمەڵگە',
    icon: '🤝',
    color: 'teal',
    description_en: 'Community centers, NGOs, and social spaces',
    description_ar: 'مراكز مجتمعية ومنظمات وأماكن اجتماعية',
    description_ku: 'ناوەندی کۆمەڵگە و ڕێکخراو و شوێنی کۆمەڵایەتی',
  },
];

export function getCategoryById(id: string): Category | undefined {
  return CATEGORIES.find(cat => cat.id === id);
}

export function getCategoryColor(color: string): string {
  const colorMap: Record<string, string> = {
    orange: 'from-orange-500 to-red-500',
    purple: 'from-purple-500 to-pink-500',
    pink: 'from-pink-500 to-rose-500',
    indigo: 'from-indigo-500 to-purple-500',
    green: 'from-green-500 to-emerald-500',
    blue: 'from-blue-500 to-cyan-500',
    red: 'from-red-500 to-orange-500',
    gray: 'from-gray-500 to-slate-500',
    teal: 'from-teal-500 to-cyan-500',
  };
  return colorMap[color] || 'from-gray-500 to-gray-600';
}
