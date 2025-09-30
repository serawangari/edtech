// middleware.ts
import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';

export default function middleware(req: NextRequest) {
  const url = new URL(req.url);

  // Only touch the naked root
  if (url.pathname === '/') {
    return NextResponse.redirect(new URL('/en', req.url));
  }

  // Do nothing for everything else
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/((?!_next|api|favicon.ico|static|public).*)'],
};





