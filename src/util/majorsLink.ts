import { slugify } from "@/util/slugify";

/**
 * External "İxtisaslar" (specializations) portal.
 * Each faculty maps to a code under https://majors.aztu.edu.az/<lang>/faculties/<code>
 *
 *   ITT        → İnformasiya texnologiyaları və telekommunikasiya
 *   NL         → Nəqliyyat və logistika
 *   ENERGETIKA → Energetika
 *   MM         → Maşınqayırma və metallurgiya
 *   XTT        → Xüsusi texnika və texnologiya
 *   SİM        → Sənaye iqtisadiyyatı və menecment
 */
const MAJORS_BASE = "https://majors.aztu.edu.az";

// First matching rule wins — keywords are matched against the slugified faculty
// title/slug (Azerbaijani letters folded to latin), so both "İnformasiya…" and
// "informasiya-texnologiyalari-…" resolve to the same code.
const MAJORS_RULES: { code: string; keywords: string[] }[] = [
    { code: "ITT", keywords: ["informasiya", "telekommunikasiya", "itt"] },
    { code: "NL", keywords: ["neqliyyat", "logistika"] },
    { code: "ENERGETIKA", keywords: ["energetika", "enerji"] },
    { code: "MM", keywords: ["masinqayirma", "metallurgiya"] },
    { code: "XTT", keywords: ["xususi"] },
    { code: "SİM", keywords: ["senaye", "iqtisadiyyat", "menecment"] },
];

/** Resolve a faculty (by slug, code or raw title) to its majors-portal code. */
export function getMajorsCode(facultyIdentifier: string | null | undefined): string | null {
    if (!facultyIdentifier) return null;

    // Direct code match (e.g. the API already returns "ITT" / "SİM").
    const raw = facultyIdentifier.trim();
    const direct = MAJORS_RULES.find((r) => r.code.toLowerCase() === raw.toLowerCase());
    if (direct) return direct.code;

    const normalized = slugify(raw);
    const rule = MAJORS_RULES.find((r) => r.keywords.some((k) => normalized.includes(k)));
    return rule ? rule.code : null;
}

/** Full external URL for a faculty's specializations, or null when unknown. */
export function getMajorsUrl(
    facultyIdentifier: string | null | undefined,
    lang: string = "az"
): string | null {
    const code = getMajorsCode(facultyIdentifier);
    if (!code) return null;
    const safeLang = lang === "en" ? "en" : "az";
    return `${MAJORS_BASE}/${safeLang}/faculties/${encodeURIComponent(code)}`;
}
