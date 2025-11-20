import { fetchGovernorates } from '@/lib/api';
import { Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';
import Link from 'next/link';
import { FaLandmark } from 'react-icons/fa';
import { FEATURE_FLAGS } from '@/config/featureFlags';
import { DisabledNotice } from '@/components/elections/DisabledNotice';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: `${dictionary.page.governorates.title} | ${dictionary.metadata.title}`,
    description: dictionary.page.governorates.description,
  };
}

export default async function GovernoratesPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);
  if (!FEATURE_FLAGS.ELECTION_ENABLED) {
    return (
      <DisabledNotice
        title={dictionary.page.governorates.title}
        description="Election governorate browsing is currently disabled. Set VITE_ENABLE_ELECTIONS=true to re-enable this page."
      />
    );
  }
  const governorates = await fetchGovernorates();

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {dictionary.page.governorates.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          {dictionary.page.governorates.description}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {governorates.map((gov) => (
          <Link
            key={gov.id}
            // Fix: Changed gov.name_en to gov.name to match the type definition.
            href={`/${lang}/candidates?governorate=${gov.name}`}
            className="group flex flex-col items-center justify-center rounded-lg bg-white p-6 text-center shadow-md transition hover:-translate-y-1 hover:shadow-lg dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <FaLandmark className="h-8 w-8 text-gray-400 transition group-hover:text-green-600 dark:text-gray-500 dark:group-hover:text-green-400" />
            <h2 className="mt-4 font-semibold text-gray-900 dark:text-white">
              {/* Fix: Changed gov.name_en to gov.name to match the type definition. */}
              {lang === 'ar' ? gov.name_ar : gov.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
