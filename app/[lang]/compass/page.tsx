import { getDictionary } from "@/lib/dictionaries";
import { Locale } from "@/lib/i18n-config";

export default async function CompassPage({
  params: { lang }
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          Iraq Compass
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Discover places, events, and local businesses across Iraq
        </p>

        <div className="bg-gradient-to-br from-teal-500/10 to-purple-500/10 rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">🧭</div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
            Coming Soon
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            We're building Iraq's local discovery platform. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
}
