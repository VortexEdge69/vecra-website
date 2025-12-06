
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  if (url.searchParams.has('ref') && request.nextUrl.pathname === '/') {
    const target = new URL('/go', request.url);
    url.searchParams.forEach((value, key) => target.searchParams.set(key, value));
    return NextResponse.redirect(target);
  }
  if (request.nextUrl.pathname.startsWith('/admin/referrals')) {
    const password = request.cookies.get('admin-password')?.value;
    if (password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}
