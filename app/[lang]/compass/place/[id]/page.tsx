import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/i18n-config";
import { getPlaceById } from "@/lib/mockData";
import { getCategoryById, getCategoryColor } from "@/lib/categories";
import { MapPin, Phone, Globe, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PlaceDetailPage({
  params: { lang, id }
}: {
  params: { lang: Locale; id: string };
}) {
  const dictionary = await getDictionary(lang);
  const place = getPlaceById(id);

  if (!place) {
    notFound();
  }

  const name = lang === 'ar' ? place.name_ar : lang === 'ku' ? place.name_ku : place.name;
  const description = lang === 'ar' ? place.description_ar : lang === 'ku' ? place.description_ku : place.description;
  const category = getCategoryById(place.category);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pb-20 md:pb-4">
      {/* Back Button */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 max-w-4xl py-3">
          <Link
            href={`/${lang}/compass`}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-teal-500 transition"
          >
            <ArrowLeft size={20} />
            <span>Back to Compass</span>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl pt-6">
        {/* Image Gallery */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-6 bg-gray-100 dark:bg-gray-900">
          <Image
            src={place.images[0]}
            alt={name}
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
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 md:p-8">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {name}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>

          {/* Details */}
          <div className="space-y-4 mb-6">
            {/* Location */}
            <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <MapPin size={20} className="flex-shrink-0 text-teal-500 mt-0.5" />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white mb-1">
                  Location
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {place.address}, {place.governorate}
                </div>
              </div>
            </div>

            {/* Phone */}
            {place.phone && (
              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <Phone size={20} className="flex-shrink-0 text-teal-500 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">
                    Phone
                  </div>
                  <a
                    href={`tel:${place.phone}`}
                    className="text-teal-500 hover:text-teal-600 transition"
                  >
                    {place.phone}
                  </a>
                </div>
              </div>
            )}

            {/* Website */}
            {place.website && (
              <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                <Globe size={20} className="flex-shrink-0 text-teal-500 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white mb-1">
                    Website
                  </div>
                  <a
                    href={place.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-500 hover:text-teal-600 transition flex items-center gap-1"
                  >
                    Visit Website
                    <Globe size={14} />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {place.phone && (
              <a
                href={`tel:${place.phone}`}
                className="flex-1 bg-gradient-to-r from-teal-500 to-purple-500 text-white font-semibold py-3 px-6 rounded-xl text-center hover:shadow-lg transition"
              >
                Call Now
              </a>
            )}
            {place.website && (
              <a
                href={place.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-white dark:bg-gray-900 border-2 border-teal-500 text-teal-500 font-semibold py-3 px-6 rounded-xl text-center hover:bg-teal-50 dark:hover:bg-gray-800 transition"
              >
                Visit Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
