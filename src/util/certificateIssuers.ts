import type { HeroCertificateIssuer } from "@/services/heroCertificateService/heroCertificateService";

/**
 * The bodies that attest AzTU's certificates: their own mark, and the name they
 * are known by.
 *
 * Shared by the home-page hero strip and the quality-assurance page so the two
 * cannot drift — an issuer added here appears in both.
 *
 * Names are brands, so they are deliberately not translated.
 */
export const ISSUERS: Record<HeroCertificateIssuer, { logo: string; name: string }> = {
    qs: { logo: "/certificate_issuers/qs.jpeg", name: "QS" },
    aqas: { logo: "/certificate_issuers/aqas.webp", name: "AQAS" },
    staregister: { logo: "/certificate_issuers/staregister.png", name: "STAR Register" },
    greenmetric: { logo: "/logos/greenmetric-logo.svg", name: "UI GreenMetric" },
};

/** Display order. An issuer missing from this list is appended, never dropped. */
export const ISSUER_ORDER: HeroCertificateIssuer[] = ["qs", "aqas", "greenmetric", "staregister"];

/**
 * Issuers that state a position rather than attesting a programme. Mirrors
 * RANKING_ISSUERS in the backend's app/services/hero_certificate.py, which is
 * what decides whether a row is allowed to carry a rank_label.
 */
const RANKING_ISSUERS: HeroCertificateIssuer[] = ["qs", "greenmetric"];

export const issuerRanks = (issuer: HeroCertificateIssuer): boolean =>
    RANKING_ISSUERS.includes(issuer);

/**
 * Buckets certificates by issuer in display order.
 *
 * Unknown issuers are appended rather than dropped, so a body added in the CMS
 * before it is added here still shows up.
 */
export function groupByIssuer<T extends { issuer: HeroCertificateIssuer }>(
    items: T[]
): { issuer: HeroCertificateIssuer; items: T[] }[] {
    const buckets = new Map<HeroCertificateIssuer, T[]>();
    for (const item of items) {
        const bucket = buckets.get(item.issuer);
        if (bucket) bucket.push(item);
        else buckets.set(item.issuer, [item]);
    }
    const known = ISSUER_ORDER.filter((issuer) => buckets.has(issuer));
    const extra = [...buckets.keys()].filter((issuer) => !ISSUER_ORDER.includes(issuer));
    return [...known, ...extra].map((issuer) => ({
        issuer,
        items: buckets.get(issuer) ?? [],
    }));
}
