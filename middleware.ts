import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

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

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"],
};
