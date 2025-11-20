'use client';

import type { Locale } from "@/lib/i18n-config";

type CompassPageProps = {
  params: { lang: Locale };
};

const categories = [
  { id: "restaurants", name: "مطاعم", icon: "🍽️", color: "bg-red-100 dark:bg-red-900/20" },
  { id: "cafes", name: "مقاهي", icon: "☕", color: "bg-amber-100 dark:bg-amber-900/20" },
  { id: "parks", name: "حدائق", icon: "🌳", color: "bg-green-100 dark:bg-green-900/20" },
  { id: "universities", name: "جامعات", icon: "🎓", color: "bg-blue-100 dark:bg-blue-900/20" },
  { id: "events", name: "فعاليات", icon: "🎪", color: "bg-purple-100 dark:bg-purple-900/20" },
  { id: "shops", name: "متاجر", icon: "🛍️", color: "bg-pink-100 dark:bg-pink-900/20" },
] as const;

export default function CompassPage({ params: { lang } }: CompassPageProps) {
  return (
    <div className="container mx-auto p-4" data-lang={lang}>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          بوصلة العراق
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          اكتشف الأماكن والفعاليات والمجتمعات في جميع أنحاء العراق
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-md">
          <input
            type="text"
            placeholder="ابحث عن أماكن، فعاليات..."
            className="w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          />
          <div className="absolute left-3 top-3 text-gray-400">🔍</div>
        </div>
      </div>

      {/* Governorate Filter */}
      <div className="mb-6">
        <select className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
          <option value="">جميع المحافظات</option>
          <option value="baghdad">بغداد</option>
          <option value="basrah">البصرة</option>
          <option value="sulaymaniyah">السليمانية</option>
          <option value="erbil">أربيل</option>
          <option value="nineveh">نينوى</option>
        </select>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`${category.color} rounded-xl p-4 text-center cursor-pointer transition-transform hover:scale-105 border border-gray-200 dark:border-gray-600`}
          >
            <div className="text-3xl mb-2">{category.icon}</div>
            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
              {category.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
