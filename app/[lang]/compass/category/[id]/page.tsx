import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/i18n-config";
import { getCategoryById } from "@/lib/categories";
import { getPlacesByCategory, getEventsByCategory } from "@/lib/mockData";
import PlaceCard from "@/components/compass/PlaceCard";
import EventCard from "@/components/compass/EventCard";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params: { lang, id }
}: {
  params: { lang: Locale; id: string };
}) {
  const dictionary = await getDictionary(lang);
  const category = getCategoryById(id);

  if (!category) {
    notFound();
  }

  const places = getPlacesByCategory(id);
  const events = getEventsByCategory(id);

  const categoryName = lang === 'ar' ? category.name_ar : lang === 'ku' ? category.name_ku : category.name_en;
  const categoryDescription = lang === 'ar' ? category.description_ar : lang === 'ku' ? category.description_ku : category.description_en;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-4 pb-20 md:pb-4">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-6xl mb-4">{category.icon}</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {categoryName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {categoryDescription}
          </p>
        </div>

        {/* Places Section */}
        {places.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span>📍</span>
              <span>Places</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((place) => (
                <PlaceCard key={place.id} place={place} lang={lang} />
              ))}
            </div>
          </div>
        )}

        {/* Events Section */}
        {events.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <span>📅</span>
              <span>Events</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <EventCard key={event.id} event={event} lang={lang} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {places.length === 0 && events.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">{category.icon}</div>
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No places or events in this category yet
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
