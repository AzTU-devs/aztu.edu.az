import apiClient, { API_BASE_URL } from "@/util/apiClient";
import type { Lang } from "@/util/apiClient";

export type HeroCertificateFamily = "world" | "europe" | "subject" | "other";

/**
 * Who attested the certificate.
 *  - "qs"   — QS, a ranking body: the row carries a rank_label and a family.
 *  - "aqas" — AQAS, a German programme-accreditation agency: per-programme,
 *             NO rank position and no family.
 */
export type HeroCertificateIssuer = "qs" | "aqas";

const FAMILIES: readonly string[] = ["world", "europe", "subject", "other"];

/**
 * BACKWARD COMPATIBILITY — the load-bearing function in this file.
 *
 * The DEPLOYED backend does not send `issuer` at all, and the public site is
 * live against it. So the test is always "is it 'aqas'?" and NEVER "is it
 * 'qs'?": a missing, null, empty or unrecognised issuer resolves to "qs",
 * which is byte-for-byte the code path the site takes today.
 */
export function normaliseIssuer(value: unknown): HeroCertificateIssuer {
    return typeof value === "string" && value.trim().toLowerCase() === "aqas" ? "aqas" : "qs";
}

/** AQAS rows have no family; a pre-migration row always has one. Anything the
 *  UI does not know how to label becomes null rather than leaking into a
 *  Record lookup as the group key "null"/"undefined". */
function normaliseFamily(value: unknown): HeroCertificateFamily | null {
    if (typeof value !== "string") return null;
    const family = value.trim().toLowerCase();
    return FAMILIES.includes(family) ? (family as HeroCertificateFamily) : null;
}

/** AQAS rows have no rank_label. Value is NOT trimmed — "=30" and "801-850"
 *  must reach the hero exactly as the editor typed them. */
function normaliseRankLabel(value: unknown): string | null {
    if (typeof value !== "string" || value.trim() === "") return null;
    return value;
}

/**
 * The shape the hero consumes. `issuer` is guaranteed present here because
 * getHeroCertificates() normalises it on read — components must never have to
 * defend against the old payload themselves.
 */
export interface HeroCertificate {
    certificate_id: number;
    issuer: HeroCertificateIssuer;
    rank_label: string | null;
    family: HeroCertificateFamily | null;
    image: string | null;
    document: string | null;
    external_url: string | null;
    /** "YYYY-MM-DD" or null */
    issued_date: string | null;
    display_order: number;
    is_active: boolean;
    title: string | null;
    kicker: string | null;
    signer: string | null;
}

/** What the API actually puts on the wire. Every field the migration touches is
 *  optional here, because the currently-deployed backend omits `issuer` and the
 *  next one may send null for rank_label / family. */
type RawHeroCertificate = Omit<HeroCertificate, "issuer" | "rank_label" | "family"> & {
    issuer?: string | null;
    rank_label?: string | null;
    family?: string | null;
};

/**
 * Resolves a stored file path (image / document) to a usable URL.
 * The backend returns ABSOLUTE urls when PUBLIC_BASE_URL is set, and
 * relative "static/..." paths otherwise — both are handled here.
 */
export function getCertificateFileUrl(path?: string | null): string | undefined {
    // Called during render for every sheet and every filmstrip thumb. A
    // non-string here (malformed payload) would throw on .startsWith and, with
    // no error.tsx in this app, take the whole homepage down.
    if (!path || typeof path !== "string") return undefined;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    // Same env-with-hardcoded-fallback the rest of the repo uses (layout.tsx,
    // Footer, PageHero, util/fetchers). Without the fallback a missing env var
    // resolves certificate images against the Next origin and 404s them.
    const base = (API_BASE_URL || "http://api-aztu.karamshukurlu.site").replace(/\/$/, "");
    const cleanPath = path.replace(/^\//, "");
    if (cleanPath.startsWith("static/") || cleanPath.startsWith("media/")) {
        return `${base}/${cleanPath}`;
    }
    return `${base}/static/${cleanPath}`;
}

/**
 * Fetches the public hero ranking certificates.
 * NEVER throws: returns [] on 204 (empty body), on any non-200 and on any error,
 * so the hero can always fall back to video-only rendering.
 *
 * `lang` is optional — apiClient already sets Accept-Language from LanguageContext,
 * but passing it explicitly avoids the setDefaultLang mount race on /en/ pages.
 */
export const getHeroCertificates = async (lang?: Lang): Promise<HeroCertificate[]> => {
    try {
        const response = await apiClient.get("/api/hero-certificate/public", {
            headers: lang ? { "Accept-Language": lang } : undefined,
        });

        // 204 carries no body at all — never touch response.data before this check.
        if (response.status === 204 || response.status !== 200) return [];

        const data = response.data;
        if (!data || data.status_code !== 200 || !Array.isArray(data.certificates)) return [];

        const certificates = data.certificates as RawHeroCertificate[];

        // Drop null/non-object entries and anything explicitly deactivated.
        // The /public endpoint should already filter, so this is a no-op in the
        // normal case; an absent is_active is treated as active.
        const usable = certificates
            .filter((cert) => cert && typeof cert === "object" && cert.is_active !== false)
            // Normalise the three fields the issuer migration touches, so a
            // payload from the OLD backend (no `issuer` key) becomes an
            // ordinary QS certificate and renders exactly as it does today.
            .map<HeroCertificate>((cert) => ({
                ...cert,
                issuer: normaliseIssuer(cert.issuer),
                rank_label: normaliseRankLabel(cert.rank_label),
                family: normaliseFamily(cert.family),
            }));

        // The API already orders these, but sort defensively.
        return usable.sort((a, b) => (a?.display_order ?? 0) - (b?.display_order ?? 0));
    } catch (error) {
        console.warn("Error fetching hero certificates:", error);
        return [];
    }
};
