// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en', 'fr', 'sw'],
  defaultLocale: 'en',
  localePrefix: 'as-needed'
});

export const config = {
  matcher: ['/', '/(en|fr|sw)/:path*']
};


