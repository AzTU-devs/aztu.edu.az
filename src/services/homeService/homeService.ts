import type { Lang } from "@/util/apiClient";
import type { HomePage } from "@/types/home";

/**
 * Home page metric groups (hero rail + count-up figures).
 *
 * Fetches through this app's own `/api/home/[pageKey]` route rather than the
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
export const getHomePage = async (
    pageKey: string = "home",
    lang: Lang = "az"
): Promise<HomePage | null> => {
    try {
        const response = await fetch(`/api/home/${pageKey}?lang=${lang}`, {
            headers: { "Accept-Language": lang },
        });

        if (response.status === 404) {
            console.info(
                `[home] "${pageKey}" is not published yet — showing the built-in copy.`
            );
            return null;
        }

        if (!response.ok) {
            console.warn(
                `[home] "${pageKey}" failed with HTTP ${response.status} — showing the built-in copy.`
            );
            return null;
        }

        const data = await response.json();
        if (data?.status_code === 200 && data?.page) {
            return data.page as HomePage;
        }

        console.warn(`[home] "${pageKey}" returned an unexpected body:`, data);
        return null;
    } catch (error) {
        console.warn(`[home] "${pageKey}" could not be reached:`, error);
        return null;
    }
};
