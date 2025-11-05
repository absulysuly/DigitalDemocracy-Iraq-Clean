import Link from 'next/link';
import Image from 'next/image';
import { Candidate } from '@/lib/types';
import { Locale } from '@/lib/i18n-config';
import { Landmark, User } from 'lucide-react';
import React from 'react';
import VerifiedBadge from '@/components/ui/VerifiedBadge';

type CandidateCardProps = {
  candidate: Candidate;
  dictionary: any;
  lang: Locale;
};

const CandidateCard: React.FC<CandidateCardProps> = ({ candidate, dictionary, lang }) => {
  return (
    <Link href={`/${lang}/candidates/${candidate.id}`}>
      <div className="flex h-full items-center space-x-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow duration-300 hover:shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:hover:border-green-500 rtl:space-x-reverse">
        <Image
          src={candidate.photo || `https://avatar.iran.liara.run/public/${candidate.gender === 'female' ? 'girl' : 'boy'}?username=${candidate.id}`}
          alt={candidate.name}
          width={64}
          height={64}
          className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white">
            <span>{lang === 'ar' && candidate.name_ar ? candidate.name_ar : candidate.name}</span>
            {candidate.verified && <VerifiedBadge size={20} />}
          </h3>
          <div className="mt-2 space-y-1 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Landmark className="h-4 w-4" />
              <span>{candidate.governorate}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{candidate.party}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CandidateCard;
