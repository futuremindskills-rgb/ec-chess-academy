import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  /**
   * Keep webhook handlers and public auth/uploadthing APIs untouched
   */
  if (
    pathname.startsWith("/api/webhook") ||
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/uploadthing")
  ) {
    return NextResponse.next();
  }

  /**
   * Redirect /admin/login to /login
   */
  if (pathname === "/admin/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const isAdminPath = pathname.startsWith("/admin");
  const isApiMutation =
    pathname.startsWith("/api") &&
    ["POST", "PUT", "DELETE"].includes(req.method);

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  /**
   * Protect admin pages and API mutations
   */
  if ((isAdminPath || isApiMutation) && !token) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  /**
   * If already logged in, redirect /login to /admin
   */
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  /**
   * Routes that should NOT be locale-prefixed
   */
  if (
    pathname === "/login" ||
    pathname === "/payment-status" ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  /**
   * Fast permanent 308 redirect for root path to canonical /en
   * Eliminates the 307 temporary redirect chain flagged in PageSpeed audits
   */
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/en", req.url), 308);
  }

  /**
   * Apply next-intl to all other routes
   */
  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};