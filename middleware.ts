// TEMP minimal middleware to avoid 500s
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // redirect root to default locale
  if (pathname === '/') {
    const url = req.nextUrl.clone();
    url.pathname = '/en';
    return NextResponse.redirect(url);
  }

  // let everything else through
  return NextResponse.next();
}

// run on all paths (including '/')
export const config = { matcher: ['/:path*'] };


