import type { Lang } from "@/util/apiClient";
import type { ResearchPage } from "@/types/research";

/**
 * Research section editorial pages ("Tədqiqat").
 *
 * Fetches through this app's own `/api/research/[pageKey]` proxy, for the same
 * reason as the About service: the backend authorises browser traffic by
 * `Origin` and the proxy attaches the server-only API key instead.
 *
 * A `null` result means "render the built-in copy" — the page may not be
 * published yet, and the site must never go blank. The reason is logged rather
 * than swallowed, so a real failure is distinguishable from an unpublished page.
 */
export const getResearchPage = async (
    pageKey: string,
    lang: Lang = "az"
): Promise<ResearchPage | null> => {
    try {
        const response = await fetch(`/api/research/${pageKey}?lang=${lang}`, {
            headers: { "Accept-Language": lang },
        });

        if (response.status === 404) {
            console.info(
                `[research] "${pageKey}" is not published yet — showing the built-in copy.`
            );
            return null;
        }

        if (!response.ok) {
            console.warn(
                `[research] "${pageKey}" failed with HTTP ${response.status} — showing the built-in copy.`
            );
            return null;
        }

        const data = await response.json();
        if (data?.status_code === 200 && data?.page) {
            return data.page as ResearchPage;
        }

        console.warn(`[research] "${pageKey}" returned an unexpected body:`, data);
        return null;
    } catch (error) {
        console.warn(`[research] "${pageKey}" could not be reached:`, error);
        return null;
    }
};
