import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
export async function middleware(request: NextRequest, response: NextResponse) {
  const { pathname, origin } = request.nextUrl;
  const hasCookie = request.cookies.get("talentPOP_token")?.value;

  if (pathname === "/login" || pathname === "/register") {
    if (hasCookie) return NextResponse.redirect(`${origin}`);
    return NextResponse.next();
  }

  if (hasCookie) {
    const decodedToken: jose.JWTPayload = jose.decodeJwt(hasCookie);
    const currentTime = Math.floor(Date.now() / 1000);
    // console.log(decodedToken);
    if (decodedToken.exp) {
      if (decodedToken.exp < currentTime) {
        console.log("Token is expired");
        request.cookies.delete("talentPOP_token");
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL}/login`
        );
      } else {
        console.log("Token is not expired");
        return;
      }
    }
  }

  if (!hasCookie)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/login`);
}

export const config = {
  matcher: ["/", "/login/:path*", "/register/:path*"],
};
