import type { Lang } from "@/util/apiClient";

/**
 * The Higher Education Institute (YTİ) portal sections.
 *
 * The institute is reached at
 *   /az/akademik/tehsil-ve-proqramlar/yuksek-tehsil-institutu-yti/…
 *   /en/academic/education-and-programs/higher-education-institute-hei/…
 * and middleware rewrites both onto the physical /about/hei/<az-slug> tree, so
 * the AZ slug is the route directory name and the EN slug exists only in URLs.
 * Keep this table, `middleware.ts` (HEI_SUB_MAP) and the route folders in sync.
 */
export const HEI_SECTIONS = [
    { az: "haqqimizda", en: "about" },
    { az: "doktorantura", en: "doctoral-studies" },
    { az: "rehberlik", en: "leadership" },
    { az: "emekdaslar", en: "staff" },
    { az: "idare-heyeti", en: "management-board" },
    { az: "elaqe", en: "contact" },
] as const;

export type HeiSectionSlug = (typeof HEI_SECTIONS)[number]["az"];

/** Institute root, in the language the visitor is browsing. */
export function heiBasePath(lang: Lang): string {
    return lang === "az"
        ? "/az/akademik/tehsil-ve-proqramlar/yuksek-tehsil-institutu-yti"
        : "/en/academic/education-and-programs/higher-education-institute-hei";
}

export function heiSectionPath(lang: Lang, section: HeiSectionSlug): string {
    const entry = HEI_SECTIONS.find((s) => s.az === section);
    return `${heiBasePath(lang)}/${lang === "az" ? entry?.az : entry?.en}`;
}
