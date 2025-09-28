import createMiddleware from 'next-intl/middleware';
import {locales, defaultLocale, localePrefix} from './next-intl.config';

export default createMiddleware({locales, defaultLocale, localePrefix});

export const config = {
  // match root and /en/...; expand later if you add more locales
  matcher: ['/', '/(en)/:path*']
};
