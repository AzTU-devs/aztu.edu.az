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

/**
 * The main site and the majors portal are DIFFERENT backends with DIFFERENT codes,
 * so a cafedra's majors URL cannot be derived from its main `cafedra_code` — it must
 * be mapped explicitly. This table maps each main-site `cafedra_code` (the value used
 * as the `[cafedraId]` route param) to the majors portal's `{ faculty, cafedra }` codes.
 *
 * Verified 2026-07 against both live APIs (api.aztu.edu.az & api-majors.aztu.edu.az).
 * A cafedra's specializations then live at:
 *   https://majors.aztu.edu.az/<lang>/faculties/<faculty>/<cafedra>
 */
const CAFEDRA_MAJORS_MAP: Record<string, { faculty: string; cafedra: string }> = {
    // İnformasiya texnologiyaları və telekommunikasiya → ITT
    computer_technologies: { faculty: "ITT", cafedra: "comp_tech" },
    radio_engineering_telecommunications: { faculty: "ITT", cafedra: "RT" },
    cybersecurity: { faculty: "ITT", cafedra: "KB" },
    engineering_mathematics_artificial_intelligence: { faculty: "ITT", cafedra: "MRSİ" },
    // Nəqliyyat və logistika → NL
    transport_logistics_traffic_safety: { faculty: "NL", cafedra: "NLHT" },
    transport_technics_and_management_technologies: { faculty: "NL", cafedra: "NTİT" },
    // Energetika → ENERGETIKA
    "electrical-engineering": { faculty: "ENERGETIKA", cafedra: "EEA" },
    "energy-efficiency": { faculty: "ENERGETIKA", cafedra: "EEYET" },
    "engineering-physics": { faculty: "ENERGETIKA", cafedra: "MFE" },
    // Maşınqayırma və metallurgiya → MM
    KIMYA_EKO: { faculty: "MM", cafedra: "KTTEE" },
    machine_engineering_technology: { faculty: "MM", cafedra: "MT" },
    metallurgy_materials_technology: { faculty: "MM", cafedra: "MMT" },
    machine_design_mechatronics_industrial_technologies: { faculty: "MM", cafedra: "MDMST" },
    mechanics: { faculty: "MM", cafedra: "MEXANIKA" },
    // Xüsusi texnika və texnologiya → XTT
    special_technologies_and_equipment: { faculty: "XTT", cafedra: "XTA" },
    defense_systems_and_technological_integration: { faculty: "XTT", cafedra: "MSTİ" },
    // Sənaye iqtisadiyyatı və menecment → SİM
    industrial_engineering_and_sustainable_economy: { faculty: "SİM", cafedra: "SMDİ" },
    foreign_languages: { faculty: "SİM", cafedra: "XD" },
    humanities: { faculty: "SİM", cafedra: "HF" },
    business_management: { faculty: "SİM", cafedra: "Bİ" },
    "650955": { faculty: "SİM", cafedra: "RİMT" },
};

// Case-insensitive index so lookups survive casing differences in the route param.
const CAFEDRA_MAJORS_LC: Record<string, { faculty: string; cafedra: string }> = Object.fromEntries(
    Object.entries(CAFEDRA_MAJORS_MAP).map(([k, v]) => [k.toLowerCase(), v])
);

/**
 * External URL for a specific cafedra's specializations on the majors portal.
 * Falls back to the faculty-level majors page (department list) when the cafedra
 * isn't mapped, so the button still lands somewhere useful. Returns null only when
 * neither the cafedra nor the faculty can be resolved.
 */
export function getMajorsCafedraUrl(
    cafedraCode: string | null | undefined,
    facultyIdentifier: string | null | undefined,
    lang: string = "az"
): string | null {
    const safeLang = lang === "en" ? "en" : "az";
    const key = cafedraCode?.trim();
    const entry = key ? (CAFEDRA_MAJORS_MAP[key] ?? CAFEDRA_MAJORS_LC[key.toLowerCase()]) : undefined;
    if (entry) {
        return `${MAJORS_BASE}/${safeLang}/faculties/${encodeURIComponent(entry.faculty)}/${encodeURIComponent(entry.cafedra)}`;
    }
    // Unknown cafedra → faculty-level department list on the majors portal.
    return getMajorsUrl(facultyIdentifier, safeLang);
}
