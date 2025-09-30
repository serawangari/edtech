// middleware.ts
import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en'],           // literal tuple
  defaultLocale: 'en',       // literal
  localePrefix: 'as-needed'  // literal
});

export const config = {
  matcher: ['/', '/(en)/:path*']
};

