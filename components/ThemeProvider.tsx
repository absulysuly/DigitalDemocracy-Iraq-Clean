
'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { useEffect, useState } from 'react';
import { isRamadan } from '@/lib/detectRamadan';
import { ReactNode } from 'react';

export function ThemeProvider({ children, ...props }: any) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // This effect runs once on mount to check if it's Ramadan
    if (isRamadan()) {
      document.documentElement.classList.add('ramadan');
    }
  }, []);

  if (!mounted) {
    // Render children without the provider on the server to avoid mismatch
    return <>{children}</>;
  }

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
