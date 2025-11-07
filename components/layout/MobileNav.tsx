'use client';
import Link from 'next/link';
import { Home, Search, Users, User, Coffee } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function MobileNav({ lang, dictionary }: { lang: string, dictionary: any }) {
  const pathname = usePathname();
  
  const navLinks = [
      { icon: Home, label: dictionary.home, href: '/' },
      { icon: Search, label: dictionary.discover, href: '/discover' },
      { icon: Users, label: dictionary.candidates, href: '/candidates' },
      { icon: Coffee, label: dictionary.teahouse, href: '/teahouse' },
      { icon: User, label: dictionary.profile, href: '/profile' }
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 border-t border-gray-200 dark:border-gray-700 z-40 backdrop-blur-md">
      <div className="flex justify-around items-center h-16">
        {navLinks.map(({ icon: Icon, label, href }) => {
            const fullPath = `/${lang}${href}`;
            const isActive = pathname === fullPath || (href === '/' && pathname === `/${lang}`);
            return (
                <Link
                    key={href}
                    href={fullPath}
                    className={`flex flex-col items-center gap-1 px-2 py-2 transition w-1/5 ${
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
