
import './globals.css';
import React from 'react';
import { Inter, Noto_Sans_Arabic } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const notoArabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-arabic' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is the true root layout. It sets up the document shell and global providers.
  // The `lang` attribute will be handled by the nested layout's wrapper div.
  return (
    <html className={`${inter.variable} ${notoArabic.variable}`} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={['light', 'dark', 'ramadan']}
        >
          {/* FIX: The Toaster component was moved outside the provider tree to resolve a type error. */}
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
        <Toaster position="bottom-center" />
      </body>
    </html>
  );
}
