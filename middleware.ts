// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';

import intlConfig from './next-intl.config.mjs';

const intlMiddleware = createMiddleware(intlConfig);

export default function middleware(req: Request) {
  const url = new URL(req.url);

  // If no locale in the pathname, redirect to defaultLocale
  if (url.pathname === '/') {
    return NextResponse.redirect(new URL('/en', req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/', '/(en)/:path*'],
};




