'use client';

import { Calendar, MapPin, User, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MockEvent, formatEventDate } from '@/lib/mockData';
import { getCategoryColor, getCategoryById } from '@/lib/categories';

interface EventCardProps {
  event: MockEvent;
  lang: string;
}

export default function EventCard({ event, lang }: EventCardProps) {
  const title = lang === 'ar' ? event.title_ar : lang === 'ku' ? event.title_ku : event.title;
  const description = lang === 'ar' ? event.description_ar : lang === 'ku' ? event.description_ku : event.description;
  const category = getCategoryById(event.category);

  return (
    <Link
      href={`/${lang}/compass/event/${event.id}`}
      className="group block"
    >
      <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-all">
        {/* Image */}
        <div className="relative w-full aspect-video bg-gray-100 dark:bg-gray-900 overflow-hidden">
          <Image
            src={event.image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Category Badge */}
          {category && (
            <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getCategoryColor(category.color)} shadow-lg`}>
              {category.icon} {lang === 'ar' ? category.name_ar : lang === 'ku' ? category.name_ku : category.name_en}
            </div>
          )}
          {/* Date Badge */}
          <div className="absolute bottom-3 left-3 bg-white dark:bg-gray-800 rounded-lg px-3 py-2 shadow-lg">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white leading-none">
                {event.date.getDate()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 uppercase mt-0.5">
                {event.date.toLocaleDateString('en-US', { month: 'short' })}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-purple-500 transition">
            {title}
          </h3>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
            {description}
          </p>

          {/* Event Details */}
          <div className="space-y-2 mb-3">
            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Calendar size={14} className="flex-shrink-0 text-purple-500" />
              <span>{formatEventDate(event.date)}</span>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <MapPin size={14} className="flex-shrink-0 text-purple-500" />
              <span className="line-clamp-1">{event.governorate} • {event.location}</span>
            </div>

            {/* Organizer */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <User size={14} className="flex-shrink-0 text-purple-500" />
              <span className="line-clamp-1">{event.organizer}</span>
            </div>
          </div>

          {/* Ticket Link */}
          {event.ticketUrl && (
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 text-sm font-medium text-purple-500 group-hover:text-purple-600">
                <ExternalLink size={14} />
                <span>Get Tickets</span>
              </div>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
