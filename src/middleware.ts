import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LANGS = ["az", "en"];
const DEFAULT_LANG = "az";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  if (SUPPORTED_LANGS.includes(firstSegment)) {
    const lang = firstSegment as "az" | "en";
    let segments_rest = segments.slice(1);

    const subMapping: Record<string, string> = {
        "about": "haqqimizda",
        "departments": "kafedralar",
        "specializations": "ixtisaslar",
        "international-relations": "beynelxalq-elaqeler"
    };

    const reverseSubMapping: Record<string, string> = {
        "haqqimizda": "about",
        "kafedralar": "departments",
        "ixtisaslar": "specializations",
        "beynelxalq-elaqeler": "international-relations"
    };

    const subSubMapping: Record<string, string> = {
        "dean": "dekan",
        "deputy-deans": "dekan-muavinleri",
        "scientific-council": "elmi-sura",
        "academic-staff": "akademik-heyat",
        "staff": "emekdaslar",
        "contact": "elaqe"
    };

    const reverseSubSubMapping: Record<string, string> = {
        "dekan": "dean",
        "dekan-muavinleri": "deputy-deans",
        "elmi-sura": "scientific-council",
        "akademik-heyat": "academic-staff",
        "emekdaslar": "staff",
        "elaqe": "contact"
    };

    // Translation mapping for faculty sub-pages
    if (segments_rest[0] === "faculties" && segments_rest[2]) {
        const subPage = segments_rest[2];
        
        if (lang === "en") {
            // EN URL might have "about", rewrite to "haqqimizda"
            if (subMapping[subPage]) {
                segments_rest[2] = subMapping[subPage];
                if (segments_rest[3] && subSubMapping[segments_rest[3]]) {
                    segments_rest[3] = subSubMapping[segments_rest[3]];
                }
            }
        } else {
            // AZ URL might have "about", but we want to allow the "en" slugs too just in case?
            // Actually, if we are in AZ, we should only expect AZ slugs or redirect EN slugs to AZ ones.
            // For now, let's just make sure AZ folders are used internally.
            if (subMapping[subPage]) {
                segments_rest[2] = subMapping[subPage];
                if (segments_rest[3] && subSubMapping[segments_rest[3]]) {
                    segments_rest[3] = subSubMapping[segments_rest[3]];
                }
            }
        }
    }

    const rest = "/" + segments_rest.join("/");
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
