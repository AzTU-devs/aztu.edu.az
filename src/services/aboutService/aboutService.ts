import apiClient, { type Lang } from "@/util/apiClient";
import type { AboutPage } from "@/types/about";

/**
 * About section ("Haqqımızda").
 *
 * The API serves a page only once an editor has published it; an unpublished
 * page 404s. Callers are expected to treat `null` as "fall back to the built-in
 * copy" rather than as an error, so the site never shows a blank screen while
 * the content is still being entered.
 */
export const getAboutPage = async (
    pageKey: string,
    lang: Lang = "az"
): Promise<AboutPage | null> => {
    try {
        const response = await apiClient.get(
            `/api/about/public/pages/${pageKey}?lang=${lang}`,
            { headers: { "Accept-Language": lang } }
        );

        if (response.data?.status_code === 200 && response.data?.page) {
            return response.data.page as AboutPage;
        }
        return null;
    } catch {
        // Unpublished (404) or unreachable — both mean "use the fallback".
        return null;
    }
};
