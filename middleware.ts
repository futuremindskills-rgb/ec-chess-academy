import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Keep webhook handlers untouched
  if (pathname.startsWith("/api/webhook")) {
    return NextResponse.next();
  }

  // Public APIs
  if (
    pathname.startsWith("/api/auth") ||
    pathname.startsWith("/api/uploadthing")
  ) {
    return NextResponse.next();
  }

  const isAdminPath = pathname.startsWith("/admin");
  const isApiMutation =
    pathname.startsWith("/api") &&
    ["POST", "PUT", "DELETE"].includes(req.method);

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if ((isAdminPath || isApiMutation) && !token) {
    if (pathname.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};