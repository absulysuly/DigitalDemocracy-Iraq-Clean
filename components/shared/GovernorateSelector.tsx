'use client';

import { MapPin } from 'lucide-react';
import { GOVERNORATES, Governorate } from '@/lib/mockData';

interface GovernorateSelector Props {
  selected?: string;
  onChange: (governorate: string) => void;
}

export default function GovernorateSelector({ selected, onChange }: GovernorateSelectorProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center gap-2 mb-3">
        <MapPin size={18} className="text-teal-500" />
        <span className="font-semibold text-gray-900 dark:text-white">
          Filter by Governorate
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onChange('All')}
          className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
            (!selected || selected === 'All')
              ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white'
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
        >
          All Iraq
        </button>

        {GOVERNORATES.map((gov) => (
          <button
            key={gov}
            onClick={() => onChange(gov)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
              selected === gov
                ? 'bg-gradient-to-r from-teal-500 to-purple-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {gov}
          </button>
        ))}
      </div>
    </div>
  );
}
