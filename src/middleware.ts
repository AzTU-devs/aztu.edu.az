import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LANGS = ["az", "en"];
const DEFAULT_LANG = "az";

// List of top-level Azerbaijani folders that should NOT trigger a language redirect
// because they are the internal targets of our rewrites.
const INTERNAL_FOLDERS = [
  "idareetme",
  "tedqiqat",
  "haqqimizda",
  "struktur",
  "tehsil",
  "sosial",
  "beynelxalq",
  "niye-aztu",
  "media",
  "faculties",
  "fakulteler",
  "community",
  "icma",
  "elaqe",
  "privacy-policy",
  "terms-conditions",
  "beynelmillesme",
  "about",
  "research",
  "kts",
];

// Global mapping for slug translation
const SLUG_MAP: Record<string, string> = {
    // Top-level
    "research": "tedqiqat",
    "tedqiqat": "research",
    "about": "haqqimizda",
    "haqqimizda": "about",
    "management": "idareetme",
    "idareetme": "management",
    "internationalization": "beynelmillesme",
    "beynelmillesme": "internationalization",
    "community": "icma",
    "icma": "community",
    "contact-us": "elaqe",
    "elaqe": "contact-us",

    // Research sub-slugs
    "research-activity": "tedqiqat-fealiyyeti",
    "tedqiqat-fealiyyeti": "research-activity",
    "performance-and-evaluation": "performans-ve-qiymetlendirme",
    "performans-ve-qiymetlendirme": "performance-and-evaluation",
    "conferences-and-events": "konfranslar-ve-tedbirler",
    "konfranslar-ve-tedbirler": "conferences-and-events",
    "publications-and-broadcasting": "nesrler-ve-yayim",
    "nesrler-ve-yayim": "publications-and-broadcasting",
    "open-access-policy": "aciq-giris-siyaseti",
    "aciq-giris-siyaseti": "open-access-policy",
    "scientific-journals": "elmi-jurnallar",
    "elmi-jurnallar": "scientific-journals",
    "machine-science": "masin-elmi",
    "masin-elmi": "machine-science",
    "energy-sustainability-risks-and-decision-making": "enerji-davamliligi-riskler-ve-qerarlarin-qebul-edilmesi",
    "enerji-davamliligi-riskler-ve-qerarlarin-qebul-edilmesi": "energy-sustainability-risks-and-decision-making",
    "internal-grant-programs": "daxili-qrant-proqramlari",
    "daxili-qrant-proqramlari": "internal-grant-programs",
    "seminars-and-trainings": "seminarlar-ve-telimler",
    "seminarlar-ve-telimler": "seminars-and-trainings",
    "research-projects": "tedqiqat-layiheleri",
    "tedqiqat-layiheleri": "research-projects",
    "intellectual-property-and-patents": "eqli-mulkiyyet-ve-patentler",
    "eqli-mulkiyyet-ve-patentler": "intellectual-property-and-patents",
    "research-institutes": "tedqiqat-institutlari",
    "tedqiqat-institutlari": "research-institutes",
    "research-laboratories": "tedqiqat-laboratoriyalari",
    "tedqiqat-laboratoriyalari": "research-laboratories",

    // About sub-slugs
    "vision-mission": "vizyon-ve-missiya",
    "vizyon-ve-missiya": "vision-mission",
    "vizion-mission-goal": "vizyon-missiya-meqsed",
    "vizyon-missiya-meqsed": "vizion-mission-goal",
    "history-of-aztu": "aztu-nun-tarixi",
    "aztu-nun-tarixi": "history-of-aztu",
    "75th-anniversary-film": "75-illik-yubiley-filmi",
    "75-illik-yubiley-filmi": "75th-anniversary-film",
    "leadership-and-management": "rehbetlik-ve-idareetme",
    "rehbetlik-ve-idareetme": "leadership-and-management",
    "rector": "rektor",
    "rektor": "rector",
    "rectors-office": "rektorluq",
    "rektorluq": "rectors-office",
    "vice-rector": "prorektor",
    "prorektor": "vice-rector",
    "scientific-board": "elmi-sura",
    "elmi-sura": "scientific-board",
    "partner-universities-and-related-institutes": "terefdas-universitet-ve-elaqeli-institutlar",
    "terefdas-universitet-ve-elaqeli-institutlar": "partner-universities-and-related-institutes",

    // Management sub-slugs
    "structural-units": "struktur-bolmeler",
    "struktur-bolmeler": "structural-units",

    // Community sub-slugs
    "aztus-honors": "aztu-nun-fexrileri",
    "aztu-nun-fexrileri": "aztus-honors",
    "honorary-doctors": "fexri-doktorlar",
    "fexri-doktorlar": "honorary-doctors",
    "our-heroes": "qehremanlarimiz",
    "qehremanlarimiz": "our-heroes",
    "former-rectors": "sabiq-rektorlarimiz",
    "sabiq-rektorlarimiz": "former-rectors",
    "campus-life": "kampus-heyati",
    "kampus-heyati": "campus-life",
    "aztu-polyclinic": "aztu-poliklinikasi",
    "aztu-poliklinikasi": "aztu-polyclinic",
    "clubs": "klublar",
    "klublar": "clubs",
    "unions-and-organizations": "ittifaq-ve-teskilatlar",
    "alliances-and-organizations": "ittifaq-ve-teskilatlar",
    "ittifaq-ve-teskilatlar": "unions-and-organizations",
    "trade-union": "hemkarlar-ittifaqi",
    "hemkarlar-ittifaqi": "trade-union",
    "student-trade-union": "telebe-hemkarlar-ittifaqi",
    "telebe-hemkarlar-ittifaqi": "student-trade-union",
    "student-youth-organization": "telebe-gencler-teskilati",
    "telebe-gencler-teskilati": "student-youth-organization",

    // International sub-slugs
    "international-partnership": "beynelxalq-terefdasliq",
    "beynelxalq-terefdasliq": "international-partnership",
    "double-degree-programs": "ikili-diplom-proqramlari",
    "ikili-diplom-proqramlari": "double-degree-programs",
    "international-projects": "beynelxalq-layiheler",
    "beynelxalq-layiheler": "international-projects",
    "partner-universities": "terefdas-universitetler",
    "terefdas-universitetler": "partner-universities",
    "mubadile-proqramlari": "exchange-programs",
    "exchange-programs": "mubadile-proqramlari",
    "orhun-mubadile-proqrami": "orhun-exchange-program",
    "orhun-exchange-program": "orhun-mubadile-proqrami",
    "education-and-programs": "tehsil-ve-proqramlar",
    "tehsil-ve-proqramlar": "education-and-programs",
    "higher-education-institute-hei": "yuksek-tehsil-institutu-yti",
    "yuksek-tehsil-institutu-yti": "higher-education-institute-hei",

    "faculties": "fakulteler",
    "fakulteler": "faculties",
    "international-relations": "beynelxalq-elaqeler",
    "beynelxalq-elaqeler": "international-relations",
    "specialties": "ixtisaslar",
    "ixtisaslar": "specialties",
    "departments": "kafedralar",
    "kafedralar": "departments",
    "specializations": "ixtisaslar",
    "dean": "dekan",
    "dekan": "dean",
    "deputy-deans": "dekan-muavinleri",
    "dekan-muavinleri": "deputy-deans",
    "scientific-council": "elmi-sura",
    "academic-staff": "akademik-heyat",
    "akademik-heyat": "academic-staff",
    "staff": "emekdaslar",
    "emekdaslar": "staff",
    "contact": "elaqe",

    // Other
    "privacy-policy": "mexfilik-siyaseti",
    "mexfilik-siyaseti": "privacy-policy",
    "terms-and-conditions": "sertler-ve-qaydalar",
    "sertler-ve-qaydalar": "terms-and-conditions",

    // Quality Assurance
    "qa": "kts",
    "kts": "qa",
};

// Key EN slugs to help identify language direction in mapping
const EN_SLUGS = new Set([
    "research", "about", "management", "internationalization", "community", "contact-us",
    "research-activity", "performance-and-evaluation", "conferences-and-events", "publications-and-broadcasting",
    "open-access-policy", "scientific-journals", "machine-science", "energy-sustainability-risks-and-decision-making",
    "internal-grant-programs", "seminars-and-trainings", "research-projects", "intellectual-property-and-patents",
    "research-institutes", "research-laboratories", "vision-mission", "vizion-mission-goal", "history-of-aztu",
    "75th-anniversary-film", "leadership-and-management", "rector", "rectors-office", "vice-rector", "scientific-board",
    "partner-universities-and-related-institutes", "structural-units", "aztus-honors", "honorary-doctors", "our-heroes",
    "former-rectors", "campus-life", "aztu-polyclinic", "clubs",
    "unions-and-organizations", "alliances-and-organizations", "trade-union", "student-trade-union", "student-youth-organization",
    "international-partnership", "double-degree-programs", "international-projects", "partner-universities",
    "exchange-programs", "orhun-exchange-program", "privacy-policy", "terms-conditions",
    "education-and-programs", "higher-education-institute-hei", "faculties",
    "international-relations", "specialties", "departments",
    "specializations", "dean", "deputy-deans", "scientific-council", "academic-staff", "staff", "contact",
    "qa",
    ]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip Next.js internals, static files, and API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const firstSegment = segments[0];

  // Internal folder check
  if (INTERNAL_FOLDERS.includes(firstSegment)) {
    if (request.headers.get("x-middleware-rewrite") === "true") {
        return NextResponse.next();
    }
  }

  // Language prefix check
  if (SUPPORTED_LANGS.includes(firstSegment)) {
    const lang = firstSegment as "az" | "en";
    let segments_rest = segments.slice(1);

    if (segments_rest.length > 0) {
        let needsRedirect = false;
        const translatedSegments = segments_rest.map((seg) => {
            const translated = SLUG_MAP[seg];
            if (translated) {
                const isEn = EN_SLUGS.has(seg);
                if (lang === "az" && isEn) {
                    needsRedirect = true;
                    return translated;
                } else if (lang === "en" && !isEn) {
                    needsRedirect = true;
                    return translated;
                }
            }
            return seg;
        });

        if (needsRedirect) {
            return NextResponse.redirect(new URL(`/${lang}/${translatedSegments.join("/")}`, request.url));
        }
    }

    // Rewrite logic to actual file structure
    if (segments_rest[0] === "research" || segments_rest[0] === "tedqiqat") {
        segments_rest[0] = "tedqiqat";
        if (segments_rest[1] === "research-activity" || segments_rest[1] === "tedqiqat-fealiyyeti") segments_rest[1] = "tedqiqat-fealiyyeti";
        if (segments_rest[1] === "performance-and-evaluation" || segments_rest[1] === "performans-ve-qiymetlendirme") segments_rest[1] = "performans-ve-qiymetlendirme";
        if (segments_rest[1] === "conferences-and-events" || segments_rest[1] === "konfranslar-ve-tedbirler") segments_rest[1] = "konfranslar-ve-tedbirler";
        if (segments_rest[1] === "publications-and-broadcasting" || segments_rest[1] === "nesrler-ve-yayim") segments_rest[1] = "nesrler-ve-yayim";
        
        if (segments_rest[1] === "nesrler-ve-yayim" && (segments_rest[2] === "open-access-policy" || segments_rest[2] === "aciq-giris-siyaseti")) {
            segments_rest = ["tedqiqat", "nesrler-ve-yayim", "aciq-giris-siyaseti"];
        } else if (segments_rest[2] === "scientific-journals" || segments_rest[2] === "elmi-jurnallar") {
            segments_rest[2] = "elmi-jurnallar";
            if (segments_rest[3] === "machine-science" || segments_rest[3] === "masin-elmi") segments_rest[3] = "masin-elmi";
            if (segments_rest[3] === "energy-sustainability-risks-and-decision-making" || segments_rest[3] === "enerji-davamliligi-riskler-ve-qerarlarin-qebul-edilmesi") segments_rest[3] = "enerji-davamliligi-riskler-ve-qerarlarin-qebul-edilmesi";
        }
    } else if (segments_rest[0] === "about" || segments_rest[0] === "haqqimizda") {
        segments_rest[0] = "haqqimizda";
        if (segments_rest[1] === "vision-mission" || segments_rest[1] === "vizyon-ve-missiya") {
            if (segments_rest[2] === "vizion-mission-goal" || segments_rest[2] === "vizyon-missiya-meqsed") {
                segments_rest = ["about", "vision-mission-goal"]; // Use internal app path
            } else if (segments_rest[2] === "vision" || segments_rest[2] === "vizyon") {
                segments_rest = ["about", "vision"];
            } else if (segments_rest[2] === "mission" || segments_rest[2] === "missiya") {
                segments_rest = ["about", "mission"];
            } else if (segments_rest[2] === "strategic-plan" || segments_rest[2] === "strateji-plan") {
                segments_rest = ["about", "strategic-plan"];
            } else if (segments_rest[2] === "history-of-aztu" || segments_rest[2] === "aztu-nun-tarixi") {
                segments_rest = ["about", "history"];
            } else if (segments_rest[2] === "75th-anniversary-film" || segments_rest[2] === "75-illik-yubiley-filmi") {
                segments_rest = ["about", "anniversary-film"];
            }
        } else if (segments_rest[1] === "leadership-and-management" || segments_rest[1] === "rehbetlik-ve-idareetme") {
            if (segments_rest[2] === "rector" || segments_rest[2] === "rektor") segments_rest = ["about", "rector"];
            else if (segments_rest[2] === "rectors-office" || segments_rest[2] === "rektorluq") segments_rest = ["about", "rectors-office"];
            else if (segments_rest[2] === "vice-rector" || segments_rest[2] === "prorektor") segments_rest = ["about", "vice-rector"];
            else if (segments_rest[2] === "scientific-board" || segments_rest[2] === "elmi-sura") segments_rest = ["about", "scientific-board"];
        }
    } else if (segments_rest[0] === "academic" || segments_rest[0] === "akademik") {
        if ((segments_rest[1] === "education-and-programs" || segments_rest[1] === "tehsil-ve-proqramlar") &&
            (segments_rest[2] === "higher-education-institute-hei" || segments_rest[2] === "yuksek-tehsil-institutu-yti")) {
            segments_rest = ["about", "hei"];
        } else if (segments_rest[1] === "faculties" || segments_rest[1] === "fakulteler") {
            if (segments_rest[2]) {
                const facultySlug = segments_rest[2];
                if (segments_rest[3]) {
                    let aboutSub = segments_rest[3];
                    if (aboutSub === "about") aboutSub = "haqqimizda";
                    if (aboutSub === "international-relations") aboutSub = "beynelxalq-elaqeler";
                    if (aboutSub === "specialties" || aboutSub === "specializations") aboutSub = "ixtisaslar";
                    if (aboutSub === "departments") aboutSub = "kafedralar";

                    if (segments_rest[4]) {
                        let subSlug = segments_rest[4];
                        if (subSlug === "dean") subSlug = "dekan";
                        if (subSlug === "deputy-deans") subSlug = "dekan-muavinleri";
                        if (subSlug === "scientific-council") subSlug = "elmi-sura";
                        if (subSlug === "academic-staff") subSlug = "akademik-heyat";
                        if (subSlug === "staff") subSlug = "emekdaslar";
                        if (subSlug === "contact") subSlug = "elaqe";
                        segments_rest = ["faculties", facultySlug, aboutSub, subSlug];
                    } else {
                        segments_rest = ["faculties", facultySlug, aboutSub];
                    }
                } else {
                    segments_rest = ["faculties", facultySlug];
                }
            } else {
                segments_rest = ["faculties"];
            }
        }
    } else if (segments_rest[0] === "faculties" || segments_rest[0] === "fakulteler") {
        if (segments_rest[1]) {
            const facultySlug = segments_rest[1];
            if (segments_rest[2]) {
                let aboutSub = segments_rest[2];
                if (aboutSub === "about") aboutSub = "haqqimizda";
                if (aboutSub === "international-relations") aboutSub = "beynelxalq-elaqeler";
                if (aboutSub === "specialties" || aboutSub === "specializations") aboutSub = "ixtisaslar";
                if (aboutSub === "departments") aboutSub = "kafedralar";

                if (segments_rest[3]) {
                    let subSlug = segments_rest[3];
                    if (subSlug === "dean") subSlug = "dekan";
                    if (subSlug === "deputy-deans") subSlug = "dekan-muavinleri";
                    if (subSlug === "scientific-council") subSlug = "elmi-sura";
                    if (subSlug === "academic-staff") subSlug = "akademik-heyat";
                    if (subSlug === "staff") subSlug = "emekdaslar";
                    if (subSlug === "contact") subSlug = "elaqe";
                    segments_rest = ["faculties", facultySlug, aboutSub, subSlug];
                } else {
                    segments_rest = ["faculties", facultySlug, aboutSub];
                }
            } else {
                segments_rest = ["faculties", facultySlug];
            }
        } else {
            segments_rest = ["faculties"];
        }
    } else if (segments_rest[0] === "management" || segments_rest[0] === "idareetme") {
        segments_rest[0] = "idareetme";
    } else if (segments_rest[0] === "kts" || segments_rest[0] === "qa") {
        segments_rest[0] = "kts";
    } else if (segments_rest[0] === "community" || segments_rest[0] === "icma") {
        segments_rest[0] = "community";
        if (segments_rest[1] === "aztus-honors" || segments_rest[1] === "aztu-nun-fexrileri") {
            if (segments_rest[2] === "honorary-doctors" || segments_rest[2] === "fexri-doktorlar") {
                segments_rest = ["community", "honorary-doctors"];
            } else if (segments_rest[2] === "our-heroes" || segments_rest[2] === "qehremanlarimiz") {
                segments_rest = ["community", "our-heroes"];
            } else if (segments_rest[2] === "former-rectors" || segments_rest[2] === "sabiq-rektorlarimiz") {
                segments_rest = ["community", "former-rectors"];
            }
        } else if (segments_rest[1] === "campus-life" || segments_rest[1] === "kampus-heyati") {
            segments_rest[1] = "kampus-heyati";
            if (segments_rest[2] === "aztu-polyclinic" || segments_rest[2] === "aztu-poliklinikasi") {
                segments_rest = ["community", "kampus-heyati", "aztu-poliklinikasi"];
            } else if (segments_rest[2] === "clubs" || segments_rest[2] === "klublar") {
                segments_rest = ["community", "kampus-heyati", "klublar"];
            }
        } else if (segments_rest[1] === "unions-and-organizations" || segments_rest[1] === "alliances-and-organizations" || segments_rest[1] === "ittifaq-ve-teskilatlar") {
            segments_rest[1] = "ittifaq-ve-teskilatlar";
            if (segments_rest[2] === "trade-union" || segments_rest[2] === "hemkarlar-ittifaqi") {
                segments_rest = ["community", "ittifaq-ve-teskilatlar", "hemkarlar-ittifaqi"];
            } else if (segments_rest[2] === "student-trade-union" || segments_rest[2] === "telebe-hemkarlar-ittifaqi") {
                segments_rest = ["community", "ittifaq-ve-teskilatlar", "telebe-hemkarlar-ittifaqi"];
            } else if (segments_rest[2] === "student-youth-organization" || segments_rest[2] === "telebe-gencler-teskilati") {
                segments_rest = ["community", "ittifaq-ve-teskilatlar", "telebe-gencler-teskilati"];
            }
        }
    }

    const targetPath = segments_rest.length > 0 ? `/${segments_rest.join("/")}` : "/";
    const rewriteUrl = new URL(targetPath, request.url);
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-middleware-rewrite", "true");

    const response = NextResponse.rewrite(rewriteUrl, {
        request: { headers: requestHeaders },
    });
    response.cookies.set("aztu-lang", lang, { path: "/", sameSite: "lax" });
    return response;
  }

  const cookieLang = request.cookies.get("aztu-lang")?.value;
  const targetLang = (cookieLang === "az" || cookieLang === "en") ? cookieLang : DEFAULT_LANG;
  return NextResponse.redirect(new URL(`/${targetLang}${pathname}`, request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.mp4|.*\\.png|.*\\.jpeg|.*\\.jpg).*)",
  ],
};
