import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/i18n-config";
import CategoryGrid from "@/components/compass/CategoryGrid";

export default async function CompassPage({
  params: { lang }
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-4 pb-20 md:pb-4">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="text-6xl mb-4">🧭</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Iraq Compass
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Discover places, events, and local businesses across Iraq
          </p>
        </div>

        {/* Category Grid */}
        <CategoryGrid lang={lang} />
      </div>
    </div>
  );
}
