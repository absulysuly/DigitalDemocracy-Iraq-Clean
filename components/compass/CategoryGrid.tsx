'use client';

import { CATEGORIES, getCategoryColor } from '@/lib/categories';
import Link from 'next/link';

interface CategoryGridProps {
  lang: string;
}

export default function CategoryGrid({ lang }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {CATEGORIES.map((category) => {
        const name = lang === 'ar' ? category.name_ar : lang === 'ku' ? category.name_ku : category.name_en;
        const description = lang === 'ar' ? category.description_ar : lang === 'ku' ? category.description_ku : category.description_en;

        return (
          <Link
            key={category.id}
            href={`/${lang}/compass/category/${category.id}`}
            className="group"
          >
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${getCategoryColor(category.color)} p-6 aspect-square flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all transform hover:scale-105`}>
              {/* Icon */}
              <div className="text-5xl mb-3 transform group-hover:scale-110 transition">
                {category.icon}
              </div>

              {/* Name */}
              <h3 className="text-white font-bold text-lg mb-1">
                {name}
              </h3>

              {/* Description */}
              <p className="text-white/80 text-xs line-clamp-2">
                {description}
              </p>

              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </Link>
        );
      })}
    </div>
  );
}
