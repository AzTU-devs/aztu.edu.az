import apiClient from "@/util/apiClient";

export interface ArticleCounters {
  scopus: string | null;
  wos: string | null;
}

export const getArticleCounters = async (): Promise<ArticleCounters> => {
  try {
    const res = await apiClient.get("/api/article/counters");
    if (res.data.status_code === 200 && res.data.data) {
      return res.data.data as ArticleCounters;
    }
  } catch {}
  return { scopus: null, wos: null };
};
