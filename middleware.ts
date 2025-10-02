import { NextRequest, NextResponse } from "next/server";
import { LANGUAGE_CONSTANT } from "@/features/site/constants/language.constant";

const locales: string[] = LANGUAGE_CONSTANT;
const defaultLocale: string = "tr";

// Admin yönlendirmelerini yöneten middleware fonksiyonu
function handleAdminMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin altında sadece belirli path'ler serbest olacak
  const allowedAdminPaths = ["/admin", "/admin/blogs", "/admin/partners"];

  const isValidAdminPath = allowedAdminPaths.some((path) =>
    pathname.startsWith(path),
  );

  if (!isValidAdminPath) {
    // Geçersiz admin yolu istek gelirse, default admin ana sayfasına yönlendirebiliriz veya 404 yapabiliriz
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

// Site yönlendirmelerini yöneten middleware fonksiyonu
function handleSiteMiddleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathSegments = pathname.split("/").filter(Boolean);

  if (pathSegments.length === 0) {
    request.nextUrl.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(request.nextUrl);
  }

  const firstSegment = pathSegments[0];

  if (locales.includes(firstSegment)) {
    return NextResponse.next();
  }

  // Eğer bir dil değilse, defaultLocale ile pathname'i birleştir
  request.nextUrl.pathname = `/${defaultLocale}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

// Ana middleware fonksiyonu
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    return handleAdminMiddleware(request);
  }

  if (
    pathname.startsWith("/videos/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/public/") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  return handleSiteMiddleware(request);
}

export const config = {
  matcher: ["/((?!_next/image|_next/|favicon.ico).*)"],
};
