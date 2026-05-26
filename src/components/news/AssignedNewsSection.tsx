"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { NewsListItem } from "@/types/news";
import { getNewsByFaculty, getNewsByCafedra } from "@/services/newsService/newsService";
import { useLanguage } from "@/context/LanguageContext";
import { API_BASE_URL } from "@/util/apiClient";

interface Props {
    facultyCode?: string;
    cafedraCode?: string;
    limit?: number;
}

function resolveImageUrl(path?: string | null): string {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    const base = (API_BASE_URL || "").replace(/\/$/, "");
    return `${base}/${path.replace(/^\//, "")}`;
}

export default function AssignedNewsSection({ facultyCode, cafedraCode, limit = 6 }: Props) {
    const { lang } = useLanguage();
    const [items, setItems] = useState<NewsListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        const loader = cafedraCode
            ? getNewsByCafedra(cafedraCode, { start: 0, end: limit, lang })
            : facultyCode
                ? getNewsByFaculty(facultyCode, { start: 0, end: limit, lang })
                : Promise.resolve([] as NewsListItem[]);
        loader.then((res) => {
            if (cancelled) return;
            setItems(Array.isArray(res) ? res : []);
        }).finally(() => {
            if (!cancelled) setLoading(false);
        });
        return () => { cancelled = true; };
    }, [facultyCode, cafedraCode, lang, limit]);

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="h-56 rounded-2xl bg-gray-100 dark:bg-white/5 animate-pulse" />
                ))}
            </div>
        );
    }

    if (!items.length) return null;

    const title = lang === "az" ? "Xəbərlər" : "News";

    return (
        <section className="space-y-6">
            <h3 className="text-xl font-black tracking-tight text-[#1a2355] dark:text-white">{title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {items.map((n) => (
                    <Link
                        key={n.news_id}
                        href={`/${lang}/news/${n.news_id}`}
                        className="group rounded-2xl overflow-hidden border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm hover:shadow-xl transition-all"
                    >
                        {n.cover_image && (
                            <div className="aspect-[16/10] w-full overflow-hidden">
                                <img
                                    src={resolveImageUrl(n.cover_image)}
                                    alt={n.title || ""}
                                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                                />
                            </div>
                        )}
                        <div className="p-4 space-y-2">
                            <p className="text-sm font-bold text-[#1a2355] dark:text-white line-clamp-2 group-hover:text-[#ee7c7e] transition-colors">
                                {n.title}
                            </p>
                            {n.created_at && (
                                <p className="text-[11px] text-gray-500 dark:text-white/40 font-medium">
                                    {new Date(n.created_at).toLocaleDateString(lang === "az" ? "az-AZ" : "en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
