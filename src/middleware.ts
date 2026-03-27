import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LANGS = ["az", "en"];
const DEFAULT_LANG = "az";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (SUPPORTED_LANGS.includes(firstSegment)) {
    // Valid lang prefix — rewrite to strip it so existing pages are served
    const lang = firstSegment as "az" | "en";
    const rest = "/" + segments.slice(1).join("/");
    const url = request.nextUrl.clone();
    url.pathname = rest || "/";
    const response = NextResponse.rewrite(url);
    response.cookies.set("aztu-lang", lang, { path: "/", sameSite: "lax" });
    return response;
  }

  // No lang prefix — redirect to preferred lang
  const cookieLang = request.cookies.get("aztu-lang")?.value;
  const targetLang =
    cookieLang === "az" || cookieLang === "en" ? cookieLang : DEFAULT_LANG;

  const url = request.nextUrl.clone();
  url.pathname = `/${targetLang}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
