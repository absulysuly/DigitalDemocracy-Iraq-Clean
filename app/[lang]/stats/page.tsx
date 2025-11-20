import { fetchStats } from '@/lib/api';
import { Locale } from '@/lib/i18n-config';
import { getDictionary } from '@/lib/dictionaries';
import { Metadata } from 'next';
import { Users, UserCheck, MapPin } from 'lucide-react';
import React from 'react';
import dynamic from 'next/dynamic';
import { FEATURE_FLAGS } from '@/config/featureFlags';
import { DisabledNotice } from '@/components/elections/DisabledNotice';

export async function generateMetadata({
  params: { lang },
}: {
  params: { lang: Locale };
}): Promise<Metadata> {
  const dictionary = await getDictionary(lang);
  return {
    title: `${dictionary.page.stats.title} | ${dictionary.metadata.title}`,
    description: dictionary.page.stats.description,
  };
}

const StatCard: React.FC<{ icon: React.ElementType, title: string, value: string | number }> = ({ icon: Icon, title, value }) => (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
            <div className="rounded-full bg-green-100 p-3 dark:bg-green-800/50">
                <Icon className="h-6 w-6 text-green-600 dark:text-green-300" />
            </div>
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{typeof value === 'number' ? value.toLocaleString(undefined) : value}</p>
            </div>
        </div>
    </div>
)

export default async function StatsPage({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  if (!FEATURE_FLAGS.ELECTION_ENABLED) {
    return (
      <DisabledNotice
        title={dictionary.page.stats.title}
        description="Election analytics are currently disabled. Set VITE_ENABLE_ELECTIONS=true to re-enable these insights."
      />
    );
  }

  const stats = await fetchStats();
  const StatsClient = dynamic(() => import('@/components/stats/StatsClient'), { ssr: false });

  const mainStats = [
    { icon: Users, title: dictionary.page.stats.totalCandidates, value: stats.total_candidates },
    { icon: UserCheck, title: dictionary.page.stats.maleCandidates, value: stats.gender_distribution.Male },
    { icon: UserCheck, title: dictionary.page.stats.femaleCandidates, value: stats.gender_distribution.Female },
    { icon: MapPin, title: dictionary.page.stats.governorates, value: stats.candidates_per_governorate.length },
  ];

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          {dictionary.page.stats.title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          {dictionary.page.stats.description}
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {mainStats.map(stat => (
            <StatCard key={stat.title} icon={stat.icon} title={stat.title} value={stat.value} />
        ))}
      </div>
      
      <StatsClient stats={stats} dictionary={dictionary} />

    </div>
  );
}
