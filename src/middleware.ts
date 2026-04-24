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
  "community",
  "elaqe",
  "privacy-policy",
  "terms-conditions",
  "beynelmillesme"
];

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

  // 1. If it's an internal folder path (no lang prefix), let it pass to serve the file
  // only if it's an internal rewrite (to avoid infinite loops).
  // Direct hits will fall through to the language redirect at the bottom.
  if (INTERNAL_FOLDERS.includes(firstSegment)) {
    if (request.headers.get("x-middleware-rewrite") === "true") {
        return NextResponse.next();
    }
  }

  // 2. If the first segment is a supported language
  if (SUPPORTED_LANGS.includes(firstSegment)) {
    const lang = firstSegment as "az" | "en";
    let segments_rest = segments.slice(1);

    // Canonical Redirects (Cross-language mapping for UX consistency)
    if (segments_rest[0] === "contact-us" || segments_rest[0] === "elaqe") {
        if (lang === "az" && segments_rest[0] === "contact-us") {
            return NextResponse.redirect(new URL("/az/elaqe", request.url));
        }
        if (lang === "en" && segments_rest[0] === "elaqe") {
            return NextResponse.redirect(new URL("/en/contact-us", request.url));
        }
    }

    // Privacy Policy
    if (segments_rest[0] === "privacy-policy" || segments_rest[0] === "mexfilik-siyaseti") {
        if (lang === "az" && segments_rest[0] === "privacy-policy") {
            return NextResponse.redirect(new URL("/az/mexfilik-siyaseti", request.url));
        }
        if (lang === "en" && segments_rest[0] === "mexfilik-siyaseti") {
            return NextResponse.redirect(new URL("/en/privacy-policy", request.url));
        }
    }

    // Terms & Conditions
    if (segments_rest[0] === "terms-and-conditions" || segments_rest[0] === "sertler-ve-qaydalar") {
        if (lang === "az" && segments_rest[0] === "terms-and-conditions") {
            return NextResponse.redirect(new URL("/az/sertler-ve-qaydalar", request.url));
        }
        if (lang === "en" && segments_rest[0] === "sertler-ve-qaydalar") {
            return NextResponse.redirect(new URL("/en/terms-and-conditions", request.url));
        }
    }

    if (segments_rest[0] === "management" || segments_rest[0] === "idareetme") {
        if (lang === "az" && segments_rest[0] === "management") {
            const newPath = ["idareetme"];
            if (segments_rest[1] === "structural-units") newPath.push("struktur-bolmeler");
            else if (segments_rest[1]) newPath.push(segments_rest[1]);
            if (segments_rest[2]) newPath.push(segments_rest[2]); 
            if (segments_rest[3] === "about") newPath.push("haqqimizda");
            else if (segments_rest[3] === "leadership") newPath.push("rehberlik");
            else if (segments_rest[3] === "staff") newPath.push("emekdaslar");
            else if (segments_rest[3]) newPath.push(segments_rest[3]);
            return NextResponse.redirect(new URL(`/az/${newPath.join("/")}`, request.url));
        }
        if (lang === "en" && segments_rest[0] === "idareetme") {
            const newPath = ["management"];
            if (segments_rest[1] === "struktur-bolmeler") newPath.push("structural-units");
            else if (segments_rest[1]) newPath.push(segments_rest[1]);
            if (segments_rest[2]) newPath.push(segments_rest[2]); 
            if (segments_rest[3] === "haqqimizda") newPath.push("about");
            else if (segments_rest[3] === "rehberlik") newPath.push("leadership");
            else if (segments_rest[3] === "emekdaslar") newPath.push("staff");
            else if (segments_rest[3]) newPath.push(segments_rest[3]);
            return NextResponse.redirect(new URL(`/en/${newPath.join("/")}`, request.url));
        }
    }

    if (segments_rest[0] === "research" || segments_rest[0] === "tedqiqat") {
        if (lang === "az" && segments_rest[0] === "research") {
            const newPath = ["tedqiqat"];
            if (segments_rest[1] === "research-activity") newPath.push("tedqiqat-fealiyyeti");
            else if (segments_rest[1] === "performance-and-evaluation") newPath.push("performans-ve-qiymetlendirme");
            else if (segments_rest[1] === "conferences-and-events") newPath.push("konfranslar-ve-tedbirler");
            else if (segments_rest[1]) newPath.push(segments_rest[1]);
            
            if (segments_rest[2] === "research-institutes") newPath.push("tedqiqat-institutlari");
            else if (segments_rest[2] === "research-laboratories") newPath.push("tedqiqat-laboratoriyalari");
            else if (segments_rest[2] === "internal-grant-programs") newPath.push("daxili-qrant-proqramlari");
            else if (segments_rest[2] === "seminars-and-trainings") newPath.push("seminarlar-ve-telimler");
            else if (segments_rest[2] === "research-projects") newPath.push("tedqiqat-layiheleri");
            else if (segments_rest[2] === "intellectual-property-and-patents") newPath.push("eqli-mulkiyyet-ve-patentler");
            else if (segments_rest[2] === "scientific-journals") newPath.push("elmi-jurnallar");
            else if (segments_rest[2]) newPath.push(segments_rest[2]);
            
            if (segments_rest[3] === "machine-science") newPath.push("masin-elmi");
            else if (segments_rest[3] === "energy-sustainability-risks-and-decision-making") newPath.push("enerji-davamliligi-riskler-ve-qerarlarin-qebul-edilmesi");
            else if (segments_rest[3]) newPath.push(segments_rest[3]); 

            if (segments_rest[4] === "director") newPath.push("direktor");
            else if (segments_rest[4] === "staff") newPath.push("heyet");
            else if (segments_rest[4] === "contact") newPath.push("elaqe");
            else if (segments_rest[4]) newPath.push(segments_rest[4]);
            return NextResponse.redirect(new URL(`/az/${newPath.join("/")}`, request.url));
        }
        if (lang === "en" && segments_rest[0] === "tedqiqat") {
            const newPath = ["research"];
            if (segments_rest[1] === "tedqiqat-fealiyyeti") newPath.push("research-activity");
            else if (segments_rest[1] === "performans-ve-qiymetlendirme") newPath.push("performance-and-evaluation");
            else if (segments_rest[1] === "konfranslar-ve-tedbirler") newPath.push("conferences-and-events");
            else if (segments_rest[1]) newPath.push(segments_rest[1]);
            
            if (segments_rest[2] === "tedqiqat-institutlari") segments_rest[2] = "research-institutes";
            else if (segments_rest[2] === "tedqiqat-laboratoriyalari") segments_rest[2] = "research-laboratories";
            else if (segments_rest[2] === "daxili-qrant-proqramlari") segments_rest[2] = "internal-grant-programs";
            else if (segments_rest[2] === "seminarlar-ve-telimler") segments_rest[2] = "seminars-and-trainings";
            else if (segments_rest[2] === "tedqiqat-layiheleri") segments_rest[2] = "research-projects";
            else if (segments_rest[2] === "eqli-mulkiyyet-ve-patentler") segments_rest[2] = "intellectual-property-and-patents";
            else if (segments_rest[2] === "elmi-jurnallar") segments_rest[2] = "scientific-journals";

            if (segments_rest[2] === "scientific-journals") {
                if (segments_rest[3] === "masin-elmi") segments_rest[3] = "machine-science";
                else if (segments_rest[3] === "enerji-davamliligi-riskler-ve-qerarlarin-qebul-edilmesi") segments_rest[3] = "energy-sustainability-risks-and-decision-making";
            }

            if (segments_rest[2]) newPath.push(segments_rest[2]);
            if (segments_rest[3]) newPath.push(segments_rest[3]); 

            if (segments_rest[4] === "direktor") newPath.push("director");
            else if (segments_rest[4] === "heyet") newPath.push("staff");
            else if (segments_rest[4] === "elaqe") newPath.push("contact");
            else if (segments_rest[4]) newPath.push(segments_rest[4]);
            return NextResponse.redirect(new URL(`/en/${newPath.join("/")}`, request.url));
        }
    }

    // Rector Page Redirects
    if (segments_rest[0] === "about" || segments_rest[0] === "haqqimizda") {
        // Partner Universities & Related Institutes Redirects
        const partnerSlugs = {
            en: "partner-universities-and-related-institutes",
            az: "terefdas-universitet-ve-elaqeli-institutlar"
        };

        if (lang === "az" && segments_rest[1] === partnerSlugs.en) {
            const sub = segments_rest[2];
            let newSub = sub;
            if (sub === "turkish-azerbaijani-university-tau") newSub = "turk-azerbaycan-universiteti-tau";
            if (sub === "institute-of-information-technologies") newSub = "informasiya-texnalogiyalari-institutu";
            if (sub === "management-systems-institute") newSub = "idareetme-sistemleri-insitutu";
            if (sub === "baku-technical-colleges") newSub = "baki-texniki-kollecleri";
            if (sub === "baku-state-college-of-communications-and-transport") newSub = "baki-rabite-ve-neqliyayt-dovlet-kollecleri";
            return NextResponse.redirect(new URL(`/az/haqqimizda/${partnerSlugs.az}/${newSub}`, request.url));
        }
        if (lang === "en" && segments_rest[1] === partnerSlugs.az) {
            const sub = segments_rest[2];
            let newSub = sub;
            if (sub === "turk-azerbaycan-universiteti-tau") newSub = "turkish-azerbaijani-university-tau";
            if (sub === "informasiya-texnalogiyalari-institutu") newSub = "institute-of-information-technologies";
            if (sub === "idareetme-sistemleri-insitutu") newSub = "management-systems-institute";
            if (sub === "baki-texniki-kollecleri") newSub = "baku-technical-colleges";
            if (sub === "baki-rabite-ve-neqliyayt-dovlet-kollecleri") newSub = "baku-state-college-of-communications-and-transport";
            return NextResponse.redirect(new URL(`/en/about/${partnerSlugs.en}/${newSub}`, request.url));
        }

        // Redirect short slugs to long slugs for consistency if requested (Optional, but usually better)
        if (segments_rest[1] === "tau" || segments_rest[1] === "iit" || segments_rest[1] === "ics" || segments_rest[1] === "baku-technical-colleges" || segments_rest[1] === "baku-state-colleges") {
            const mapping: Record<string, string> = {
                "tau": lang === "az" ? "turk-azerbaycan-universiteti-tau" : "turkish-azerbaijani-university-tau",
                "iit": lang === "az" ? "informasiya-texnalogiyalari-institutu" : "institute-of-information-technologies",
                "ics": lang === "az" ? "idareetme-sistemleri-insitutu" : "management-systems-institute",
                "baku-technical-colleges": lang === "az" ? "baki-texniki-kollecleri" : "baku-technical-colleges",
                "baku-state-colleges": lang === "az" ? "baki-rabite-ve-neqliyayt-dovlet-kollecleri" : "baku-state-college-of-communications-and-transport",
            };
            const parent = lang === "az" ? partnerSlugs.az : partnerSlugs.en;
            const prefix = lang === "az" ? "haqqimizda" : "about";
            return NextResponse.redirect(new URL(`/${lang}/${prefix}/${parent}/${mapping[segments_rest[1]]}`, request.url));
        }

        if (lang === "az" && segments_rest[0] === "about" && segments_rest[1] === "rector") {
            return NextResponse.redirect(new URL("/az/haqqimizda/rehbetlik-ve-idareetme/rektor", request.url));
        }
        if (lang === "en" && segments_rest[0] === "haqqimizda" && segments_rest[1] === "rehbetlik-ve-idareetme" && segments_rest[2] === "rektor") {
            return NextResponse.redirect(new URL("/en/about/leadership-and-management/rector", request.url));
        }

        // Vision & Mission Redirects
        if (segments_rest[1] === "vision-mission" || segments_rest[1] === "vizyon-ve-missiya") {
            const sub = segments_rest[2];
            // If already on the correct localized path, do nothing
            if (lang === "az" && segments_rest[0] === "haqqimizda" && segments_rest[1] === "vizyon-ve-missiya") {
                // Already correct AZ path
            } else if (lang === "en" && segments_rest[0] === "about" && segments_rest[1] === "vision-mission") {
                // Already correct EN path
            } else {
                // Incorrect localized parent slug, redirect to correct one
                const newParent = lang === "az" ? "haqqimizda/vizyon-ve-missiya" : "about/vision-mission";
                // Keep the sub-slug as is if it's already localized, or just pass it through
                const finalSub = sub || "vision"; 
                return NextResponse.redirect(new URL(`/${lang}/${newParent}/${finalSub}`, request.url));
            }
        }
        
        // Redirect old /rector to new nested path
        if (segments_rest[1] === "rector" || segments_rest[1] === "rektor") {
            const prefix = lang === "az" ? "haqqimizda/rehbetlik-ve-idareetme/rektor" : "about/leadership-and-management/rector";
            return NextResponse.redirect(new URL(`/${lang}/${prefix}`, request.url));
        }

        // Standard Vision/Mission/History Redirects (from top-level /about/...)
        if (segments_rest[1] === "vision" || segments_rest[1] === "vizyon") {
            const prefix = lang === "az" ? "haqqimizda/vizyon-ve-missiya/vizyon" : "about/vision-mission/vision";
            return NextResponse.redirect(new URL(`/${lang}/${prefix}`, request.url));
        }
        if (segments_rest[1] === "mission" || segments_rest[1] === "missiya") {
            const prefix = lang === "az" ? "haqqimizda/vizyon-ve-missiya/missiya" : "about/vision-mission/mission";
            return NextResponse.redirect(new URL(`/${lang}/${prefix}`, request.url));
        }
        if (segments_rest[1] === "history" || segments_rest[1] === "history-of-aztu" || segments_rest[1] === "aztu-nun-tarixi") {
            const prefix = lang === "az" ? "haqqimizda/vizyon-ve-missiya/aztu-nun-tarixi" : "about/vision-mission/history-of-aztu";
            return NextResponse.redirect(new URL(`/${lang}/${prefix}`, request.url));
        }
        if (segments_rest[1] === "75th-anniversary-film" || segments_rest[1] === "75-illik-yubiley-filmi") {
            const prefix = lang === "az" ? "haqqimizda/vizyon-ve-missiya/75-illik-yubiley-filmi" : "about/vision-mission/75th-anniversary-film";
            return NextResponse.redirect(new URL(`/${lang}/${prefix}`, request.url));
        }
    }

    // Community / ICMA Mapping
    if (segments_rest[0] === "community" || segments_rest[0] === "icma") {
        if (lang === "az" && segments_rest[0] === "community") {
            const newPath = ["icma"];
            if (segments_rest[1] === "aztus-honors") newPath.push("aztu-nun-fexrileri");
            else if (segments_rest[1]) newPath.push(segments_rest[1]);

            if (segments_rest[1] === "aztus-honors" && segments_rest[2] === "honorary-doctors") {
                newPath[1] = "aztu-nun-fexrileri";
                newPath.push("fexri-doktorlar");
            } else if (segments_rest[1] === "aztus-honors" && segments_rest[2] === "our-heroes") {
                newPath[1] = "aztu-nun-fexrileri";
                newPath.push("qehremanlarimiz");
            } else if (segments_rest[2]) {
                newPath.push(segments_rest[2]);
            }
            return NextResponse.redirect(new URL(`/az/${newPath.join("/")}`, request.url));
        }
        if (lang === "en" && segments_rest[0] === "icma") {
            const newPath = ["community"];
            if (segments_rest[1] === "aztu-nun-fexrileri") newPath.push("aztus-honors");
            else if (segments_rest[1]) newPath.push(segments_rest[1]);

            if (segments_rest[1] === "aztu-nun-fexrileri" && segments_rest[2] === "fexri-doktorlar") {
                newPath[1] = "aztus-honors";
                newPath.push("honorary-doctors");
            } else if (segments_rest[1] === "aztu-nun-fexrileri" && segments_rest[2] === "qehremanlarimiz") {
                newPath[1] = "aztus-honors";
                newPath.push("our-heroes");
            } else if (segments_rest[2]) {
                newPath.push(segments_rest[2]);
            }
            return NextResponse.redirect(new URL(`/en/${newPath.join("/")}`, request.url));
        }
    }

    // Internationalization Mapping
    if (segments_rest[0] === "internationalization" || segments_rest[0] === "beynelmillesme") {
        if (lang === "az" && segments_rest[0] === "internationalization") {
            const newPath = ["beynelmillesme"];
            if (segments_rest[1] === "international-partnership") newPath.push("beynelxalq-terefdasliq");
            else if (segments_rest[1]) newPath.push(segments_rest[1]);
            if (segments_rest[2] === "double-degree-programs") newPath.push("ikili-diplom-proqramlari");
            else if (segments_rest[2] === "international-projects") newPath.push("beynelxalq-layiheler");
            else if (segments_rest[2] === "partner-universities") newPath.push("terefdas-universitetler");
            else if (segments_rest[2]) newPath.push(segments_rest[2]);
            return NextResponse.redirect(new URL(`/az/${newPath.join("/")}`, request.url));
        }
        if (lang === "en" && segments_rest[0] === "beynelmillesme") {
            const newPath = ["internationalization"];
            if (segments_rest[1] === "beynelxalq-terefdasliq") newPath.push("international-partnership");
            else if (segments_rest[1]) newPath.push(segments_rest[1]);
            if (segments_rest[2] === "ikili-diplom-proqramlari") newPath.push("double-degree-programs");
            else if (segments_rest[2] === "beynelxalq-layiheler") newPath.push("international-projects");
            else if (segments_rest[2] === "terefdas-universitetler") newPath.push("partner-universities");
            else if (segments_rest[2]) newPath.push(segments_rest[2]);
            return NextResponse.redirect(new URL(`/en/${newPath.join("/")}`, request.url));
        }
    }

    // Academic & Faculties Redirects
    if (segments_rest[0] === "academic" || segments_rest[0] === "akademik" || segments_rest[0] === "faculties" || segments_rest[0] === "cafedras" || segments_rest[0] === "fakulteler") {
        // EN: academic/faculties
        // AZ: akademik/fakulteler
        
        if (lang === "az") {
            // Redirect academic/faculties or plain faculties to akademik/fakulteler
            if (segments_rest[0] === "academic" || segments_rest[0] === "faculties") {
                const newPath = ["akademik", "fakulteler"];
                // Skip the first segment(s) and take the rest
                const restIdx = segments_rest[0] === "faculties" ? 1 : 2;
                
                if (segments_rest[restIdx]) {
                    newPath.push(segments_rest[restIdx]); // faculty ID
                    if (segments_rest[restIdx + 1]) {
                        // Subpages mapping
                        const sub = segments_rest[restIdx + 1];
                        const mapping: Record<string, string> = {
                            "about": "haqqimizda",
                            "departments": "kafedralar",
                            "specializations": "ixtisaslar",
                            "international-relations": "beynelxalq-elaqeler"
                        };
                        newPath.push(mapping[sub] || sub);
                        
                        if (segments_rest[restIdx + 2]) {
                            const subSub = segments_rest[restIdx + 2];
                            const subSubMapping: Record<string, string> = {
                                "dean": "dekan",
                                "deputy-deans": "dekan-muavinleri",
                                "scientific-council": "elmi-sura",
                                "academic-staff": "akademik-heyat",
                                "staff": "emekdaslar",
                                "contact": "elaqe"
                            };
                            newPath.push(subSubMapping[subSub] || subSub);
                        }
                    }
                }
                return NextResponse.redirect(new URL(`/az/${newPath.join("/")}`, request.url));
            }
            // Redirect plain cafedras to akademik/cafedras
            if (segments_rest[0] === "cafedras") {
                const rest = segments_rest.slice(1);
                return NextResponse.redirect(new URL(`/az/akademik/cafedras/${rest.join("/")}`, request.url));
            }
        }
        
        if (lang === "en") {
            // Redirect plain cafedras or akademik/cafedras to academic/cafedras
            if ((segments_rest[0] === "akademik" && segments_rest[1] === "cafedras") || segments_rest[0] === "cafedras") {
                const rest = segments_rest[0] === "cafedras" ? segments_rest.slice(1) : segments_rest.slice(2);
                return NextResponse.redirect(new URL(`/en/academic/cafedras/${rest.join("/")}`, request.url));
            }

            // Redirect akademik/fakulteler or plain faculties to academic/faculties
            if (segments_rest[0] === "akademik" || segments_rest[0] === "fakulteler") {
                const newPath = ["academic", "faculties"];
                const restIdx = (segments_rest[0] === "fakulteler") ? 1 : 2;

                if (segments_rest[restIdx]) {
                    newPath.push(segments_rest[restIdx]); // faculty ID
                    if (segments_rest[restIdx + 1]) {
                        const sub = segments_rest[restIdx + 1];
                        const mapping: Record<string, string> = {
                            "haqqimizda": "about",
                            "kafedralar": "departments",
                            "ixtisaslar": "specializations",
                            "beynelxalq-elaqeler": "international-relations"
                        };
                        newPath.push(mapping[sub] || sub);
                        
                        if (segments_rest[restIdx + 2]) {
                            const subSub = segments_rest[restIdx + 2];
                            const subSubMapping: Record<string, string> = {
                                "dekan": "dean",
                                "dekan-muavinleri": "deputy-deans",
                                "elmi-sura": "scientific-council",
                                "akademik-heyat": "academic-staff",
                                "emekdaslar": "staff",
                                "elaqe": "contact"
                            };
                            newPath.push(subSubMapping[subSub] || subSub);
                        }
                    }
                }
                return NextResponse.redirect(new URL(`/en/${newPath.join("/")}`, request.url));
            }
        }
    }

    // 3. Perform Internal Rewriting to the actual filesystem folders (AZ names)
    // Management Mapping
    if (segments_rest[0] === "management") {
        segments_rest[0] = "idareetme";
        if (segments_rest[1] === "structural-units") segments_rest[1] = "struktur-bolmeler";
        if (segments_rest[3] === "about") segments_rest[3] = "haqqimizda";
        if (segments_rest[3] === "leadership") segments_rest[3] = "rehberlik";
        if (segments_rest[3] === "staff") segments_rest[3] = "emekdaslar";
    }
    // Research Mapping
    if (segments_rest[0] === "research") {
        segments_rest[0] = "tedqiqat";
        if (segments_rest[1] === "research-activity") segments_rest[1] = "tedqiqat-fealiyyeti";
        if (segments_rest[1] === "performance-and-evaluation") segments_rest[1] = "performans-ve-qiymetlendirme";
        if (segments_rest[1] === "conferences-and-events") segments_rest[1] = "konfranslar-ve-tedbirler";
        
        if (segments_rest[2] === "research-institutes") segments_rest[2] = "tedqiqat-institutlari";
        else if (segments_rest[2] === "research-laboratories") segments_rest[2] = "tedqiqat-laboratoriyalari";
        else if (segments_rest[2] === "internal-grant-programs") segments_rest[2] = "daxili-qrant-proqramlari";
        else if (segments_rest[2] === "seminars-and-trainings") segments_rest[2] = "seminarlar-ve-telimler";
        else if (segments_rest[2] === "research-projects") segments_rest[2] = "tedqiqat-layiheleri";
        else if (segments_rest[2] === "intellectual-property-and-patents") segments_rest[2] = "eqli-mulkiyyet-ve-patentler";
        else if (segments_rest[2] === "scientific-journals") segments_rest[2] = "elmi-jurnallar";

        if (segments_rest[2] === "elmi-jurnallar") {
            if (segments_rest[3] === "machine-science") segments_rest[3] = "masin-elmi";
            else if (segments_rest[3] === "energy-sustainability-risks-and-decision-making") segments_rest[3] = "enerji-davamliligi-riskler-ve-qerarlarin-qebul-edilmesi";
        }

        if (segments_rest[4] === "director") segments_rest[4] = "direktor";
        if (segments_rest[4] === "staff") segments_rest[4] = "heyet";
        if (segments_rest[4] === "contact") segments_rest[4] = "elaqe";
    }

    // Explicit Scientific Journals Mapping for long paths
    if ((segments_rest[0] === "research" || segments_rest[0] === "tedqiqat") && 
        (segments_rest[1] === "scientific-journals" || segments_rest[1] === "elmi-jurnallar")) {
        const sub = segments_rest[2];
        if (sub === "machine-science" || sub === "masin-elmi") {
            segments_rest = ["tedqiqat", "elmi-jurnallar", "machine-science"];
        } else if (sub === "energy-sustainability-risks-and-decision-making" || sub === "enerji-davamliligi-riskler-ve-qerarlarin-qebul-edilmesi") {
            segments_rest = ["tedqiqat", "elmi-jurnallar", "energy-sustainability-risks-and-decision-making"];
        }
    }
    // Academic Section Mapping
    if (segments_rest[0] === "academic" || segments_rest[0] === "akademik") {
        if (segments_rest[1] === "faculties" || segments_rest[1] === "fakulteler") {
            const rest = segments_rest.slice(2);
            segments_rest = ["faculties", ...rest];
        } else if (segments_rest[1]) {
            // General academic rewrite for other items like cafedras
            const other = segments_rest[1];
            const rest = segments_rest.slice(2);
            segments_rest = [other, ...rest];
        }
    }

    // Leadership & Management Mapping
    if ((segments_rest[0] === "about" || segments_rest[0] === "haqqimizda") && 
        (segments_rest[1] === "leadership-and-management" || segments_rest[1] === "rehbetlik-ve-idareetme")) {
        const sub = segments_rest[2];
        if (sub === "rector" || sub === "rektor") {
            segments_rest = ["about", "rector"];
        } else if (sub === "rectors-office" || sub === "rektorluq" || sub === "rektoratliq") {
            segments_rest = ["about", "rectors-office"];
        } else if (sub === "vice-rector" || sub === "prorektor") {
            segments_rest = ["about", "vice-rector"];
        } else if (sub === "scientific-board" || sub === "elmi-sura") {
            segments_rest = ["about", "scientific-board"];
        }
    }

    // Students Section Mapping
    if (segments_rest[0] === "students" || segments_rest[0] === "telebeler") {
        const sub = segments_rest[1];
        if (sub === "academic-calendar-and-rules" || sub === "tedris-teqvimi-ve-qaydalar") {
            const subSub = segments_rest[2];
            if (subSub === "2025-2026-academic-year-calendar" || subSub === "2025-2026-tedris-ili-teqvimi") {
                segments_rest = ["tehsil", "academic-calendar-2025"];
            } else if (subSub === "2026-2027-academic-year-calendar" || subSub === "2026-2027-tedris-ili-teqvimi") {
                segments_rest = ["tehsil", "academic-calendar-2026"];
            } else if (subSub === "assessment-and-examination-organization-rules" || subSub === "qiymetlendirme-ve-imtahan-teskili-qaydalari") {
                segments_rest = ["tehsil", "assessment-rules"];
            } else if (subSub === "credit-system-at-bachelors-and-masters-levels" || subSub === "bakalavr-ve-magistratura-seviyyelerinde-kredit-sistemi") {
                segments_rest = ["tehsil", "credit-system"];
            } else if (subSub === "lms-guidelines" || subSub === "lms-telimatlari") {
                segments_rest = ["tehsil", "lms-guidelines"];
            }
        } else if (sub === "academic-calendar-2025") {
            segments_rest = ["tehsil", "academic-calendar-2025"];
        } else if (sub === "academic-calendar-2026") {
            segments_rest = ["tehsil", "academic-calendar-2026"];
        }
    }

    // Vision & Mission Mapping
    if ((segments_rest[0] === "about" || segments_rest[0] === "haqqimizda") && 
        (segments_rest[1] === "vision-mission" || segments_rest[1] === "vizyon-ve-missiya")) {
        const sub = segments_rest[2];
        if (sub === "vision" || sub === "vizyon") {
            segments_rest = ["about", "vision"];
        } else if (sub === "mission" || sub === "missiya") {
            segments_rest = ["about", "mission"];
        } else if (sub === "strategic-plan" || sub === "strateji-plan") {
            segments_rest = ["about", "strategic-plan"];
        } else if (sub === "history-of-aztu" || sub === "aztu-nun-tarixi") {
            segments_rest = ["about", "history"];
        } else if (sub === "75th-anniversary-film" || sub === "75-illik-yubiley-filmi") {
            segments_rest = ["about", "anniversary-film"];
        }
    }

    // Faculties Mapping (EN slugs to AZ folders)
    if (segments_rest[0] === "faculties") {
        if (segments_rest[2] === "about") segments_rest[2] = "haqqimizda";
        if (segments_rest[2] === "departments") segments_rest[2] = "kafedralar";
        if (segments_rest[2] === "specializations") segments_rest[2] = "ixtisaslar";
        if (segments_rest[2] === "international-relations") segments_rest[2] = "beynelxalq-elaqeler";
        
        if (segments_rest[2] === "haqqimizda" && segments_rest[3]) {
            const subSub: Record<string, string> = {
                "dean": "dekan",
                "deputy-deans": "dekan-muavinleri",
                "scientific-council": "elmi-sura",
                "academic-staff": "akademik-heyat",
                "staff": "emekdaslar",
                "contact": "elaqe"
            };
            if (subSub[segments_rest[3]]) segments_rest[3] = subSub[segments_rest[3]];
        }
    }

    // Partner Universities & Related Institutes Mapping
    if ((segments_rest[0] === "about" || segments_rest[0] === "haqqimizda") && 
        (segments_rest[1] === "partner-universities-and-related-institutes" || segments_rest[1] === "terefdas-universitet-ve-elaqeli-institutlar")) {
        const sub = segments_rest[2];
        if (sub === "turkish-azerbaijani-university-tau" || sub === "turk-azerbaycan-universiteti-tau") {
            segments_rest = ["about", "tau"];
        } else if (sub === "institute-of-information-technologies" || sub === "informasiya-texnalogiyalari-institutu") {
            segments_rest = ["about", "iit"];
        } else if (sub === "management-systems-institute" || sub === "idareetme-sistemleri-insitutu") {
            segments_rest = ["about", "ics"];
        } else if (sub === "baku-technical-colleges" || sub === "baki-texniki-kollecleri") {
            segments_rest = ["about", "baku-technical-colleges"];
        } else if (sub === "baku-state-college-of-communications-and-transport" || sub === "baki-rabite-ve-neqliyayt-dovlet-kollecleri") {
            segments_rest = ["about", "baku-state-colleges"];
        }
    }

    // Community / ICMA Mapping (Rewrites)
    if (segments_rest[0] === "community" || segments_rest[0] === "icma") {
        const sub = segments_rest[1];
        const subSub = segments_rest[2];
        
        if ((sub === "aztus-honors" || sub === "aztu-nun-fexrileri") && 
            (subSub === "honorary-doctors" || subSub === "fexri-doktorlar")) {
            segments_rest = ["community", "honorary-doctors"];
        } else if ((sub === "aztus-honors" || sub === "aztu-nun-fexrileri") && 
            (subSub === "our-heroes" || subSub === "qehremanlarimiz")) {
            segments_rest = ["community", "our-heroes"];
        }
    }
    // Contact Us Mapping (top-level)
    if (segments_rest[0] === "contact-us" || segments_rest[0] === "elaqe") {
        segments_rest = ["elaqe"];
    }

    // Privacy Policy Mapping
    if (segments_rest[0] === "privacy-policy" || segments_rest[0] === "mexfilik-siyaseti") {
        segments_rest = ["privacy-policy"];
    }

    // Terms & Conditions Mapping
    if (segments_rest[0] === "terms-and-conditions" || segments_rest[0] === "sertler-ve-qaydalar") {
        segments_rest = ["terms-conditions"];
    }

    // Internationalization Mapping
    if (segments_rest[0] === "internationalization" || segments_rest[0] === "beynelmillesme") {
        const sub = segments_rest[1];
        const subSub = segments_rest[2];

        if ((sub === "international-partnership" || sub === "beynelxalq-terefdasliq") && 
            (subSub === "double-degree-programs" || subSub === "ikili-diplom-proqramlari")) {
            segments_rest = ["beynelmillesme", "beynelxalq-terefdasliq", "ikili-diplom-proqramlari"];

        } else if ((sub === "international-partnership" || sub === "beynelxalq-terefdasliq") && 
            (subSub === "international-projects" || subSub === "beynelxalq-layiheler")) {
            segments_rest = ["beynelmillesme", "beynelxalq-terefdasliq", "beynelxalq-layiheler"];

        } else if ((sub === "international-partnership" || sub === "beynelxalq-terefdasliq") && 
            (subSub === "partner-universities" || subSub === "terefdas-universitetler")) {
            segments_rest = ["beynelmillesme", "beynelxalq-terefdasliq", "terefdas-universitetler"];
        }
    }
    const targetPath = segments_rest.length > 0 ? `/${segments_rest.join("/")}` : "/";
    const rewriteUrl = new URL(targetPath, request.url);
    
    // Create new request headers with rewrite marker
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-middleware-rewrite", "true");

    const response = NextResponse.rewrite(rewriteUrl, {
        request: {
            headers: requestHeaders,
        },
    });
    response.cookies.set("aztu-lang", lang, { path: "/", sameSite: "lax" });
    return response;
  }

  // 4. No language prefix — redirect to preferred language
  const cookieLang = request.cookies.get("aztu-lang")?.value;
  const targetLang = (cookieLang === "az" || cookieLang === "en") ? cookieLang : DEFAULT_LANG;

  return NextResponse.redirect(new URL(`/${targetLang}${pathname}`, request.url));
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.svg|.*\\.mp4|.*\\.png|.*\\.jpeg|.*\\.jpg).*)",
  ],
};
