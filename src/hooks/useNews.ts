"use client";

import { useEffect, useState } from "react";
import { getNewsList, getNewsById } from "@/services/newsService/newsService";
import type { NewsListItem, NewsDetail } from "@/types/news";
import type { Lang } from "@/util/apiClient";

type ListParams = {
  categoryId?: string;
  start?: number;
  end?: number;
  lang?: Lang;
};

export function useNewsList(params: ListParams) {
  const { categoryId, start, end, lang } = params;
  const [list, setList] = useState<NewsListItem[]>([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setListLoading(true);
    setListError(null);
    getNewsList({ categoryId, start, end, lang })
      .then((data) => {
        if (!cancelled) setList(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setListError(
            (err as { message?: string })?.message ?? "Failed to fetch news list",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setListLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [categoryId, start, end, lang]);

  return { list, listLoading, listError };
}

export function useNewsDetail(id: number, lang?: Lang) {
  const [detail, setDetail] = useState<NewsDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setDetailLoading(true);
    setDetailError(null);
    setDetail(null);
    getNewsById(id, lang)
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setDetailError("News not found");
        } else {
          setDetail(data);
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setDetailError(
            (err as { message?: string })?.message ?? "Failed to fetch news detail",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [id, lang]);

  return { detail, detailLoading, detailError };
}
