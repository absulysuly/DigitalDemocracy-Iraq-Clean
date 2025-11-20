'use client';
import Link from 'next/link';
import { Home, Compass, Coffee, User } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { filterElectionNavLinks } from './navigationFilters';

type MobileNavProps = { lang: string; dictionary: any; electionEnabled?: boolean };

export default function MobileNav({ lang, dictionary, electionEnabled = true }: MobileNavProps) {
  const pathname = usePathname();

  const navLinks = [
    { id: 'home', icon: Home, label: dictionary.home, href: '/' },
    { id: 'compass', icon: Compass, label: dictionary.compass, href: '/compass' },
    { id: 'teahouse', icon: Coffee, label: dictionary.teahouse, href: '/teahouse' },
    { id: 'profile', icon: User, label: dictionary.profile, href: '/profile' },
  ];

  const filteredNavLinks = filterElectionNavLinks(navLinks, electionEnabled);

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 z-40 backdrop-blur-md">
      <div className="flex justify-around items-center h-16">
        {filteredNavLinks.map(({ icon: Icon, label, href }) => {
          const fullPath = `/${lang}${href}`;
          const isActive = pathname === fullPath || (href === '/' && pathname === `/${lang}`);
          return (
            <Link
              key={href}
              href={fullPath}
              className={`flex flex-col items-center gap-1 px-2 py-2 transition w-1/4 ${
                isActive
                  ? 'text-iraq-red'
                  : 'text-gray-600 dark:text-gray-400 hover:text-iraq-red'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs font-medium text-center">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
