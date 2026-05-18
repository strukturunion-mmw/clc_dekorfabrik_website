import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AUTH_SESSION_COOKIE_NAME } from "@/lib/auth/constants";

const PROTECTED_PATH_PREFIXES = ["/konto"];
const PUBLIC_AUTH_PATHS = ["/konto/anmelden", "/konto/registrieren"];

function isProtectedPath(pathname: string) {
  return PROTECTED_PATH_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function isPublicAuthPath(pathname: string) {
  return PUBLIC_AUTH_PATHS.some((path) => pathname === path);
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const hasSession = Boolean(request.cookies.get(AUTH_SESSION_COOKIE_NAME)?.value);

  if (!hasSession && !isPublicAuthPath(pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/konto/anmelden";

    return NextResponse.redirect(redirectUrl);
  }

  if (hasSession && isPublicAuthPath(pathname)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/konto";

    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/konto/:path*"],
};
