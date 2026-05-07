import apiClient, { Lang } from "@/util/apiClient";
import type { SearchResponse, SearchResults } from "@/types/search";

const EMPTY_RESULTS: SearchResults = {};

export const searchAll = async (
    query: string,
    lang: Lang = "az",
    options: { signal?: AbortSignal; limit?: number } = {},
): Promise<SearchResponse> => {
    const { signal, limit } = options;
    const params = new URLSearchParams({ q: query, lang });
    if (limit) params.set("limit", String(limit));

    try {
        const response = await apiClient.get(`/api/search?${params.toString()}`, {
            headers: { "Accept-Language": lang },
            signal,
        });
        const data = response.data as Partial<SearchResponse>;
        if (data?.status_code === 200) {
            return {
                status_code: 200,
                query: data.query ?? query,
                lang: data.lang ?? lang,
                results: data.results ?? EMPTY_RESULTS,
                total: data.total ?? 0,
                degraded: Boolean(data.degraded),
            };
        }
        return {
            status_code: data?.status_code ?? 500,
            query,
            lang,
            results: EMPTY_RESULTS,
            total: 0,
            degraded: true,
        };
    } catch (error) {
        if ((error as { name?: string })?.name === "CanceledError") {
            throw error;
        }
        return {
            status_code: 0,
            query,
            lang,
            results: EMPTY_RESULTS,
            total: 0,
            degraded: true,
        };
    }
};
