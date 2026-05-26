"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLanguage } from "@/context/LanguageContext";
import { getNewsByCafedra } from "@/services/newsService/newsService";
import type { NewsListItem } from "@/types/news";
import { API_BASE_URL } from "@/util/apiClient";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

function resolveImageUrl(path?: string | null): string {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const base = (API_BASE_URL || "").replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}

function stripHtml(html?: string): string {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

export default function CafedraXeberlerPage({ params }: Props) {
  const { cafedraId } = use(params);
  const { lang: currentLang } = useLanguage();
  const [news, setNews] = useState<NewsListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    getNewsByCafedra(cafedraId, { start: 0, end: 30, lang: currentLang })
      .then((res) => {
        if (cancelled) return;
        setNews(Array.isArray(res) ? res : []);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, [cafedraId, currentLang]);

  return (
    <div className="space-y-6">
      <SectionBlock title={currentLang === "az" ? "Kafedra xəbərləri" : "Department News"} accent>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl">
          {currentLang === "az"
            ? "Kafedranın elmi, tədris və sosial fəaliyyəti ilə bağlı ən son yeniliklər və elanlar."
            : "The latest news and announcements regarding the department's scientific, academic, and social activities."}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 gap-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-56 rounded-[2.5rem] bg-gray-100 dark:bg-slate-800 animate-pulse" />
            ))}
          </div>
        ) : news.length === 0 ? (
          <ComingSoon label={currentLang === "az" ? "Xəbərlər tezliklə əlavə olunacaq" : "News will be added soon"} />
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {news.map((item, idx) => (
              <motion.div
                key={item.news_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white dark:bg-slate-800 border-2 border-gray-50 dark:border-slate-700 rounded-[2.5rem] overflow-hidden hover:border-[#ee7c7e] hover:shadow-2xl hover:shadow-[#1a2355]/5 transition-all duration-500 flex flex-col md:flex-row"
              >
                <div className="w-full md:w-64 lg:w-80 h-64 md:h-auto overflow-hidden flex-shrink-0">
                  {item.cover_image && (
                    <img
                      src={resolveImageUrl(item.cover_image)}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  )}
                </div>

                <div className="p-8 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1 rounded-full bg-[#ee7c7e]/10 text-[#ee7c7e] text-[9px] font-black uppercase tracking-widest">
                      {currentLang === "az" ? "Xəbər" : "News"}
                    </div>
                    {item.created_at && (
                      <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                        <CalendarTodayIcon sx={{ fontSize: 14 }} />
                        {new Date(item.created_at).toLocaleDateString(currentLang === "az" ? "az-AZ" : "en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </div>
                    )}
                  </div>

                  <h3 className="text-xl lg:text-2xl font-black text-[#1a2355] dark:text-white mb-4 group-hover:text-[#ee7c7e] transition-colors duration-300 leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {stripHtml(item.html_content)}
                  </p>

                  <Link
                    href={`/${currentLang}/news/${item.news_id}`}
                    className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#1a2355] dark:text-blue-400 group-hover:text-[#ee7c7e] transition-colors"
                  >
                    {currentLang === "az" ? "Ətraflı oxu" : "Read more"}
                    <ArrowForwardIcon sx={{ fontSize: 16 }} className="transition-transform group-hover:translate-x-2" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </SectionBlock>
    </div>
  );
}
