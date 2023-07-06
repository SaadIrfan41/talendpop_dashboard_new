import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest, response: NextResponse) {
  const { pathname, origin } = request.nextUrl;
  const hasCookie = request.cookies.get("talentPOP_token")?.value;
  if (pathname === "/login" || pathname === "/register") {
    if (hasCookie) return NextResponse.redirect(`${origin}`);
    return NextResponse.next();
  }
  if (!hasCookie)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
}

export const config = {
  matcher: ["/", "/login/:path*", "/register/:path*"],
};
