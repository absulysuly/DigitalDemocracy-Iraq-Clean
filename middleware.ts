// middleware.ts - Edge Runtime Compatible (Zero Node Dependencies)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './lib/i18n-config';

const { locales, defaultLocale } = i18n;

/**
 * Edge-compatible locale detection using manual Accept-Language parsing
 * Replaces Negotiator (Node.js-only) with pure Edge Runtime logic
 */
function getLocale(request: NextRequest): string {
  try {
    // Get Accept-Language header
    const acceptLanguage = request.headers.get('accept-language') || '';
    
    // Parse Accept-Language header manually (Edge-compatible)
    // Format: "en-US,en;q=0.9,ar;q=0.8"
    const languagePreferences = acceptLanguage
      .split(',')
      .map((lang) => {
        const [locale, qValue] = lang.trim().split(';q=');
        const quality = qValue ? parseFloat(qValue) : 1.0;
        return { locale: locale.toLowerCase().split('-')[0], quality };
      })
      .sort((a, b) => b.quality - a.quality); // Sort by quality (preference)
    
    // Find first matching locale
    for (const pref of languagePreferences) {
      const match = locales.find((loc) => loc === pref.locale);
      if (match) return match;
    }
    
    // Check for direct locale match in URL (if pathname contains locale)
    const pathname = request.nextUrl.pathname;
    for (const locale of locales) {
      if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
        return locale;
      }
    }
    
    return defaultLocale;
  } catch (err) {
    // Edge-safe fallback
    console.error('Locale detection error:', err);
    return defaultLocale;
  }
}

export function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;
    
    // Skip middleware for API routes, static files, and Next.js internals
    if (
      pathname.startsWith('/api/') ||
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/_vercel/') ||
      pathname.match(/\.(svg|png|jpg|jpeg|gif|webp|ico|json)$/)
    ) {
      return NextResponse.next();
    }
    
    // Check if pathname already has a locale
    const pathnameHasLocale = locales.some(
      (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );
    
    if (pathnameHasLocale) {
      // Locale already present, pass through with security headers
      const response = NextResponse.next();
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-Content-Type-Options', 'nosniff');
      return response;
    }
    
    // Detect locale and redirect
    const locale = getLocale(request);
    request.nextUrl.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
    
    const response = NextResponse.redirect(request.nextUrl);
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    
    return response;
  } catch (err) {
    // Edge-safe fallback - always return a response
    console.error('Middleware error:', err);
    const response = NextResponse.next();
    response.headers.set('X-Frame-Options', 'DENY');
    return response;
  }
}

// Minimal matcher - exclude static assets and API routes
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|json)$).*)',
  ],
};
