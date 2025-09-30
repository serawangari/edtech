// middleware.ts
import createMiddleware from 'next-intl/middleware';
import intl from './next-intl.config.mjs';

export default createMiddleware(intl);

export const config = {
  matcher: ['/', '/(en|fr|sw)/:path*']
};

