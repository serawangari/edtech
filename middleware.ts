// middleware.ts
import createMiddleware from 'next-intl/middleware';
import intl from './next-intl.config';

export default createMiddleware(intl);

export const config = {
  matcher: ['/', '/(en)/:path*'] // extend when adding more locales
};
