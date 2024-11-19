import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import createMiddleware from 'next-intl/middleware';
import { routing } from '@/src/i18n/routing';

const secret = process.env.NEXTAUTH_SECRET;

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Retrieve JWT token
  const token = await getToken({ req, secret });

  // Extract locale or default to 'en'
  const defaultLocale = routing.defaultLocale || 'en';
  const validLocales = routing.locales || [];
  const locale = validLocales.includes(url.pathname.split('/')[1])
    ? url.pathname.split('/')[1]
    : defaultLocale;

  // Get the path without the locale
  const pathnameWithoutLocale = url.pathname.replace(
    new RegExp(`^/(${validLocales.join('|')})(/|$)`),
    ''
  );

  // Skip internal paths or favicon requests
  if (
    url.pathname.startsWith('/_next') ||
    url.pathname.startsWith('/api') ||
    url.pathname === '/favicon.ico' ||
    url.pathname.includes('__webpack_hmr')
  ) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access protected routes
  if (pathnameWithoutLocale.startsWith('/todos') && !token) {
    url.pathname = `/${locale}/auth/login`;
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users from public routes to `/todos`
  const publicPaths = ['/auth/login', '/auth/register'];
  if (token && publicPaths.includes(pathnameWithoutLocale)) {
    url.pathname = `/${locale}/todos`;
    return NextResponse.redirect(url);
  }

  // Redirect to default locale if the locale prefix is not present
  if (!new RegExp(`^/(${validLocales.join('|')})(/|$)`).test(url.pathname)) {
    url.pathname = `/${defaultLocale}${url.pathname}`;
    return NextResponse.redirect(url);
  }

  // Apply internationalization (i18n) middleware
  const i18nMiddleware = createMiddleware(routing);
  const i18nResponse = i18nMiddleware(req);
  if (i18nResponse) {
    return i18nResponse;
  }

  // Default behavior
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/:locale(todos|auth)/:path*', // Match specific locale-based routes
    '/:locale/:path*', // General locale handling
    '/((?!_next|api|favicon.ico).*)', // Match everything except non-localized paths
  ],
};
