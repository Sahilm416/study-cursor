import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // Protect routes that start with /dashboard
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const loginUrl = new URL("/auth/google", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect authenticated users away from auth pages
  if (pathname.startsWith("/auth") && token) {
    return NextResponse.redirect(new URL("/dashboard/files", req.url));
  }

  return NextResponse.next();
}

// Keep the existing config
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
};
