// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const jwtToken = request.cookies.get('jwtToken')?.value
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth')

  if (isAdminRoute && !jwtToken) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // If token exists and user tries to access auth pages, redirect to admin
  if (isAuthRoute && jwtToken) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/auth/:path*',
  ]
}