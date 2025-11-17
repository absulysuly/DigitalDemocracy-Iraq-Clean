'use client';

import { MapPin, Phone, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MockPlace } from '@/lib/mockData';
import { getCategoryColor, getCategoryById } from '@/lib/categories';

interface PlaceCardProps {
  place: MockPlace;
  lang: string;
}

export default function PlaceCard({ place, lang }: PlaceCardProps) {
  const name = lang === 'ar' ? place.name_ar : lang === 'ku' ? place.name_ku : place.name;
  const description = lang === 'ar' ? place.description_ar : lang === 'ku' ? place.description_ku : place.description;
  const category = getCategoryById(place.category);

  return (
    <Link
      href={`/${lang}/compass/place/${place.id}`}
      className="group block"
    >
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all">
        {/* Image */}
        <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-900 overflow-hidden">
          <Image
            src={place.images[0]}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Category Badge */}
          {category && (
            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(category.color)} shadow-lg`}>
              {category.icon} {lang === 'ar' ? category.name_ar : lang === 'ku' ? category.name_ku : category.name_en}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-teal-500 transition">
            {name}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {description}
          </p>

          {/* Location */}
          <div className="flex items-start gap-2 text-sm text-gray-500 dark:text-gray-400 mb-2">
            <MapPin size={16} className="flex-shrink-0 mt-0.5 text-teal-500" />
            <span className="line-clamp-1">{place.governorate} • {place.address}</span>
          </div>

          {/* Contact Info */}
          <div className="flex items-center gap-4 text-sm">
            {place.phone && (
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Phone size={14} />
                <span className="text-xs">Call</span>
              </div>
            )}
            {place.website && (
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Globe size={14} />
                <span className="text-xs">Website</span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
