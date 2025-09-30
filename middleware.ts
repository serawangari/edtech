// middleware.ts
import createMiddleware from 'next-intl/middleware';
import {NextResponse} from 'next/server';
import intlConfig from './next-intl.config';

const intlMiddleware = createMiddleware(intlConfig);

export default function middleware(req: Request) {
  const url = new URL(req.url);

  // Redirect naked root to your default locale
  if (url.pathname === '/') {
    return NextResponse.redirect(new URL('/en', req.url));
  }

  return intlMiddleware(req);
}

export const config = {
  // Match root and any localized routes
  matcher: ['/', '/(en|fr|sw)/:path*']
};




