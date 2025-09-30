import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['en'],
  defaultLocale: 'en',
  // no prefix when there's only one locale
  localePrefix: 'never',
});

export const config = {
  matcher: ['/', '/(en)/:path*'],
};



