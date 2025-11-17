import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/i18n-config";
import { getEventById, formatEventDate } from "@/lib/mockData";
import { getCategoryById, getCategoryColor } from "@/lib/categories";
import { Calendar, MapPin, User, ExternalLink, Globe, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EventDetailPage({
  params: { lang, id }
}: {
  params: { lang: Locale; id: string };
}) {
  const dictionary = await getDictionary(lang);
  const event = getEventById(id);

  if (!event) {
    notFound();
  }

  const title = lang === 'ar' ? event.title_ar : lang === 'ku' ? event.title_ku : event.title;
  const description = lang === 'ar' ? event.description_ar : lang === 'ku' ? event.description_ku : event.description;
  const category = getCategoryById(event.category);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 md:pb-4">
      {/* Back Button */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 max-w-4xl py-3">
          <Link
            href={`/${lang}/compass`}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-500 transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Compass</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl pt-6">
        {/* Image */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-900">
          <Image
            src={event.image}
            alt={title}
            fill
            className="object-cover"
            priority
          />
          {/* Category Badge */}
          {category && (
            <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${getCategoryColor(category.color)} shadow-lg`}>
              {category.icon} {lang === 'ar' ? category.name_ar : lang === 'ku' ? category.name_ku : category.name_en}
            </div>
          )}
          {/* Date Badge */}
          <div className="absolute bottom-4 left-4 bg-white dark:bg-gray-800 rounded-xl px-4 py-3 shadow-xl">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 dark:text-white leading-none">
                {event.date.getDate()}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 uppercase mt-1">
                {event.date.toLocaleDateString('en-US', { month: 'short' })}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>

          {/* Event Details */}
          <div className="space-y-4 mb-6">
            {/* Date & Time */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <Calendar size={20} className="flex-shrink-0 text-purple-500 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white mb-1">
                  Date & Time
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {formatEventDate(event.date)}
                  {event.endDate && (
                    <>
                      {' '}- {formatEventDate(event.endDate)}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <MapPin size={20} className="flex-shrink-0 text-purple-500 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white mb-1">
                  Location
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {event.location}
                  <br />
                  {event.address}, {event.governorate}
                </div>
              </div>
            </div>

            {/* Organizer */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <User size={20} className="flex-shrink-0 text-purple-500 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white mb-1">
                  Organizer
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {event.organizer}
                </div>
              </div>
            </div>

            {/* Website */}
            {event.website && (
              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <Globe size={20} className="flex-shrink-0 text-purple-500 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">
                    Website
                  </div>
                  <a
                    href={event.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-500 hover:text-purple-600 transition flex items-center gap-1"
                  >
                    Visit Website
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {event.ticketUrl && (
              <a
                href={event.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl text-center hover:shadow-lg transition flex items-center justify-center gap-2"
              >
                <ExternalLink size={18} />
                Get Tickets
              </a>
            )}
            {event.website && (
              <a
                href={event.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white dark:bg-gray-900 border-2 border-purple-500 text-purple-500 font-semibold py-3 px-6 rounded-xl text-center hover:bg-purple-50 dark:hover:bg-gray-800 transition"
              >
                Learn More
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
