// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Vérifier si on est sur une route admin
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Vérifier si l'utilisateur est authentifié
    const isAuthenticated = request.cookies.get("admin_auth");

    // Si pas authentifié et pas sur la page de login, rediriger vers login
    if (!isAuthenticated && request.nextUrl.pathname !== "/admin/login") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Si authentifié et sur la page login, rediriger vers admin
    if (isAuthenticated && request.nextUrl.pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin/articles", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
