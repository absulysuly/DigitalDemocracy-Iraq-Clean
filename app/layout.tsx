
import './globals.css';
import React from 'react';
// Temporarily disabled Google Fonts due to network limitations
// import { Inter, Noto_Sans_Arabic } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/context/AuthContext';

// Temporarily disabled Google Fonts due to network limitations
// const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
// const notoArabic = Noto_Sans_Arabic({ subsets: ['arabic'], variable: '--font-arabic' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // This is the true root layout. It sets up the document shell and global providers.
  // The `lang` attribute will be handled by the nested layout's wrapper div.
  return (
    <html suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          themes={['light', 'dark', 'ramadan']}
        >
          <AuthProvider>
            {children}
          </AuthProvider>
          <Toaster position="bottom-center" />
        </ThemeProvider>
      </body>
    </html>
  );
}
