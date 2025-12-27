import { NextResponse, NextRequest } from 'next/server'
import { getToken } from "next-auth/jwt"

export default async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const url = request.nextUrl


  if (token && (
    url.pathname.startsWith('/sign-in') ||
    url.pathname.startsWith('/sign-up') ||
    url.pathname.startsWith('/verify') ||
    url.pathname.startsWith('/loginhelp')
  )) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }


  if (!token && (
    url.pathname.startsWith('/dashboard') ||
    url.pathname.startsWith('/category') ||
    url.pathname.startsWith('/listing') ||
    url.pathname.startsWith('/post')
  )) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/sign-in',
    '/sign-up',
    '/loginhelp',     
    '/dashboard/:path*',
    '/verify/:path*',
    '/category/:path*',
    '/listing/:path*',
    '/post/:path*'
  ]
}
