import apiClient, { API_BASE_URL } from "@/util/apiClient";
import type { Lang } from "@/util/apiClient";

export type HeroCertificateFamily = "world" | "europe" | "subject" | "other";

export interface HeroCertificate {
    certificate_id: number;
    rank_label: string;
    family: HeroCertificateFamily;
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

        const certificates = data.certificates as HeroCertificate[];

        // Drop null/non-object entries and anything explicitly deactivated.
        // The /public endpoint should already filter, so this is a no-op in the
        // normal case; an absent is_active is treated as active.
        const usable = certificates.filter(
            (cert) => cert && typeof cert === "object" && cert.is_active !== false
        );

        // The API already orders these, but sort defensively.
        return usable.sort((a, b) => (a?.display_order ?? 0) - (b?.display_order ?? 0));
    } catch (error) {
        console.warn("Error fetching hero certificates:", error);
        return [];
    }
};
