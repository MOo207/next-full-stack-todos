import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { routing } from "@/src/i18n/routing";

const secret = process.env.NEXTAUTH_SECRET;

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  // Retrieve JWT token
  const token = await getToken({ req, secret });

  const defaultLocale = routing.defaultLocale || "en";
  const validLocales = routing.locales || [];
  const locale = validLocales.includes(url.pathname.split("/")[1])
    ? url.pathname.split("/")[1]
    : defaultLocale;

  const pathnameWithoutLocale = url.pathname.replace(
    new RegExp(`^/(${validLocales.join("|")})(/|$)`),
    ""
  );

  // Skip internal paths
  if (
    url.pathname.startsWith("/_next") ||
    url.pathname.startsWith("/api") ||
    url.pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access protected routes
  if (pathnameWithoutLocale.startsWith("/todos") && !token) {
    url.pathname = `/${locale}/auth/login`;
    return NextResponse.redirect(url);
  }

  // Redirect authenticated users away from public routes
  const publicRoutes = ["/auth/login"];
  if (token && publicRoutes.includes(pathnameWithoutLocale)) {
    url.pathname = `/${locale}/todos`;
    return NextResponse.redirect(url);
  }

  // Redirect to default locale if missing
  if (!validLocales.includes(url.pathname.split("/")[1])) {
    url.pathname = `/${defaultLocale}${url.pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/:locale(todos|auth)/:path*', // Match locale-prefixed routes
    '/:locale/:path*',            // General locale handling
    '/((?!_next|api|favicon.ico).*)', // Match all non-internal routes
  ],
};
