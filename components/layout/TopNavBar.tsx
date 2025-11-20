'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import type { Locale } from '@/lib/i18n-config';
import { Coffee, Compass } from 'lucide-react';
import NotificationBell from '../social/NotificationBell';

interface NavigationDictionary {
  home: string;
  compass: string;
  teahouse: string;
  profile: string;
}

interface TopNavBarProps {
  lang: Locale;
  dictionary: NavigationDictionary;
  electionEnabled?: boolean;
}

type NavLinkConfig = {
  id: string;
  href: string;
  labelKey: keyof NavigationDictionary;
  icon?: ReactNode;
};

const NAV_LINKS: ReadonlyArray<NavLinkConfig> = [
  { id: 'home', href: '/', labelKey: 'home' },
  { id: 'compass', href: '/compass', labelKey: 'compass', icon: <Compass size={16} aria-hidden="true" /> },
  { id: 'teahouse', href: '/teahouse', labelKey: 'teahouse', icon: <Coffee size={16} aria-hidden="true" /> },
  { id: 'profile', href: '/profile', labelKey: 'profile' },
];

const shouldIncludeNavItem = (link: NavLinkConfig, electionEnabled: boolean) => {
  if (electionEnabled) return true;
  const blockedKeywords = ['election', 'Election', 'Dashboard', 'Analytics', 'ElectionManagementDashboard'];
  return !blockedKeywords.some((keyword) => link.id.includes(keyword));
};

export default function TopNavBar({ lang, dictionary, electionEnabled = true }: TopNavBarProps) {
  const filteredLinks = NAV_LINKS.filter((link) => shouldIncludeNavItem(link, electionEnabled));

  return (
    <header className="sticky top-0 z-40 hidden bg-white/80 shadow-sm backdrop-blur-md dark:bg-gray-900/80 md:block">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href={`/${lang}`} className="flex-shrink-0">
              <span className="font-arabic text-2xl font-bold text-gray-900 dark:text-white">ديوان</span>
            </Link>
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {filteredLinks.map(({ href, labelKey, icon }) => (
                <Link
                  key={labelKey}
                  href={`/${lang}${href}`}
                  className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                >
                  {icon}
                  {dictionary[labelKey]}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <NotificationBell />
            {/* TODO: Add Search, ThemeToggle, and LanguageSwitcher */}
          </div>
        </div>
      </nav>
    </header>
  );
}
