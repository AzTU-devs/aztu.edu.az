import type { Lang } from "@/util/apiClient";
import type { AboutPage } from "@/types/about";

/**
 * About section ("Haqqımızda").
 *
 * Fetches through this app's own `/api/about/[pageKey]` route rather than the
 * backend directly. The backend's public API authorises browser traffic by
 * `Origin`, which only matches on aztu.edu.az — a direct call therefore 401s on
 * localhost. The proxy runs server-side and attaches the API key instead, so
 * the page behaves identically in development and production.
 *
 * A `null` result means "render the built-in copy": the page may simply not be
 * published yet, and the site must never go blank while content is being
 * entered. Because that is indistinguishable from a real failure at the call
 * site, the reason is logged rather than swallowed.
 */
export const getAboutPage = async (
    pageKey: string,
    lang: Lang = "az"
): Promise<AboutPage | null> => {
    try {
        const response = await fetch(`/api/about/${pageKey}?lang=${lang}`, {
            headers: { "Accept-Language": lang },
        });

        if (response.status === 404) {
            console.info(
                `[about] "${pageKey}" is not published yet — showing the built-in copy.`
            );
            return null;
        }

        if (!response.ok) {
            console.warn(
                `[about] "${pageKey}" failed with HTTP ${response.status} — showing the built-in copy.`
            );
            return null;
        }

        const data = await response.json();
        if (data?.status_code === 200 && data?.page) {
            return data.page as AboutPage;
        }

        console.warn(`[about] "${pageKey}" returned an unexpected body:`, data);
        return null;
    } catch (error) {
        console.warn(`[about] "${pageKey}" could not be reached:`, error);
        return null;
    }
};
