"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FacultyPanel } from "@/components/faculty/ui";
import ComingSoon from "@/components/shared/ComingSoon";
import NewspaperIcon from "@mui/icons-material/Newspaper";
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
      <FacultyPanel
        title={currentLang === "az" ? "Kafedra xəbərləri" : "Department News"}
        eyebrow={currentLang === "az" ? "Yeniliklər" : "Updates"}
        icon={NewspaperIcon}
      >
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {currentLang === "az"
            ? "Kafedranın elmi, tədris və sosial fəaliyyəti ilə bağlı ən son yeniliklər və elanlar."
            : "The latest news and announcements regarding the department's scientific, academic, and social activities."}
        </p>

        {loading ? (
          <div className="grid grid-cols-1 gap-6">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-56 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
            ))}
          </div>
        ) : news.length === 0 ? (
          <ComingSoon label={currentLang === "az" ? "Xəbərlər tezliklə əlavə olunacaq" : "News will be added soon"} />
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {news.map((item, idx) => (
              <motion.div
                key={item.news_id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: Math.min(idx * 0.05, 0.3), duration: 0.4 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-[#101733] dark:hover:border-white/20 md:flex-row"
              >
                {/* Image */}
                <div className="relative h-52 w-full shrink-0 overflow-hidden bg-slate-100 dark:bg-[#161f42] md:h-auto md:w-64 lg:w-72">
                  {item.cover_image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={resolveImageUrl(item.cover_image)}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center text-slate-300 dark:text-slate-600">
                      <NewspaperIcon sx={{ fontSize: 44 }} />
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col p-6 md:p-7">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="inline-flex items-center rounded-full border border-[#ee7c7e]/30 bg-[#ee7c7e]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#e05b5d] dark:text-[#fb7185]">
                      {currentLang === "az" ? "Xəbər" : "News"}
                    </span>
                    {item.created_at && (
                      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                        <CalendarTodayIcon sx={{ fontSize: 14 }} />
                        {new Date(item.created_at).toLocaleDateString(currentLang === "az" ? "az-AZ" : "en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    )}
                  </div>

                  <h3 className="mb-3 text-lg font-bold leading-snug tracking-tight text-slate-900 transition-colors group-hover:text-[#ee7c7e] dark:text-white md:text-xl">
                    {item.title}
                  </h3>

                  <p className="mb-6 line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {stripHtml(item.html_content)}
                  </p>

                  <Link
                    href={`/${currentLang}/news/${item.news_id}`}
                    className="mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#1a2355] transition-colors group-hover:text-[#ee7c7e] dark:text-white"
                  >
                    {currentLang === "az" ? "Ətraflı oxu" : "Read more"}
                    <ArrowForwardIcon sx={{ fontSize: 16 }} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </FacultyPanel>
    </div>
  );
}
