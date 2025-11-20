import { fetchCandidates, fetchGovernorates } from '@/lib/api';
import { Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';
import { FEATURE_FLAGS } from '@/config/featureFlags';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: `${dictionary.page.candidates.title} | ${dictionary.metadata.title}`,
    description: dictionary.page.candidates.description,
  };
}

export default async function CandidatesPage({
  params: { lang },
  searchParams,
}: {
  params: { lang: Locale };
  searchParams?: {
    query?: string;
    governorate?: string;
    gender?: 'male' | 'female';
    page?: string;
  };
}) {
  const dictionary = await getDictionary(lang);
  if (!FEATURE_FLAGS.ELECTION_ENABLED) {
    return (
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-white p-8 text-center shadow-md dark:bg-gray-800">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {dictionary.page.candidates.title}
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Election browsing is currently disabled. Set VITE_ENABLE_ELECTIONS=true to re-enable candidate discovery.
          </p>
        </div>
      </div>
    );
  }
  const governorates = await fetchGovernorates();

  const currentPage = Number(searchParams?.page) || 1;
  const query = searchParams?.query || '';
  const governorate = searchParams?.governorate || '';
  const gender = searchParams?.gender;

  // Set a limit for candidates per page
  const limit = 12;

  const { data: candidates, total } = await fetchCandidates({
    page: currentPage,
    limit: limit,
    query: query,
    governorate: governorate,
    gender,
  });

  const totalPages = Math.ceil(total / limit);
  const CandidateCard = (await import('@/components/candidates/CandidateCard')).default;
  const FilterPanel = (await import('@/components/candidates/FilterPanel')).default;
  const Pagination = (await import('@/components/candidates/Pagination')).default;

  return (
    <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          {dictionary.page.candidates.title}
        </h1>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <aside className="lg:col-span-1">
          <FilterPanel governorates={governorates} dictionary={dictionary.filters} />
        </aside>

        <main className="lg:col-span-3">
          {candidates.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {candidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} dictionary={dictionary.candidate} lang={lang} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-12 text-center dark:border-gray-600">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">{dictionary.page.candidates.noResultsTitle}</h3>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{dictionary.page.candidates.noResultsText}</p>
            </div>
          )}
          {totalPages > 1 && <Pagination totalPages={totalPages} dictionary={dictionary.pagination} />}
        </main>
      </div>
    </div>
  );
}