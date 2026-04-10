"use client";

import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import type { NewsListItem } from "@/types/news";
import ArticleIcon from "@mui/icons-material/Article";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { useLanguage } from "@/context/LanguageContext";

export default function CafedraXeberlerPage() {
  const { lang } = useLanguage();
  // Using a partial match for the interface or cast for static data
  const news: any[] = [
    {
      news_id: 1,
      title: lang === "az" ? "Kafedra əməkdaşları beynəlxalq konfransda iştirak etdi" : "Department staff participated in an international conference",
      html_content: lang === "az" ? "Kafedramızın professor-müəllim heyəti İstanbul Texniki Universitetində keçirilən «Kompüter Elmləri və Mühəndislik» beynəlxalq konfransında elmi məruzələrlə çıxış etdi." : "Our department's faculty members presented scientific reports at the 'Computer Science and Engineering' international conference held at Istanbul Technical University.",
      created_at: "2026-02-15",
      cover_image: "https://ui-avatars.com/api/?name=Konfrans&background=1a2355&color=fff&size=200",
    },
    {
      news_id: 2,
      title: lang === "az" ? "Tələbələr üçün süni intellekt üzrə seminar keçirildi" : "AI seminar held for students",
      html_content: lang === "az" ? "Kafedra tərəfindən təşkil olunan «Süni intellekt: nəzəriyyə və praktika» adlı seminar böyük maraqla qarşılandı." : "The 'Artificial Intelligence: Theory and Practice' seminar organized by the department was met with great interest.",
      created_at: "2026-03-03",
      cover_image: "https://ui-avatars.com/api/?name=Seminar&background=ee7c7e&color=fff&size=200",
    },
  ];

  return (
    <div className="space-y-6">
      <SectionBlock title={lang === "az" ? "Xəbərlər" : "News"} accent>
        {news.length === 0 ? (
          <ComingSoon label={lang === "az" ? "Kafedra xəbərləri tezliklə əlavə olunacaq" : "Department news will be added soon"} />
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <div
                key={item.news_id}
                className="flex gap-5 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-5 hover:border-[#ee7c7e] hover:shadow-lg transition-all"
              >
                {/* Image or icon */}
                <div className="w-20 h-20 rounded-xl bg-[#1a2355]/5 dark:bg-[#1a2355]/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {item.cover_image ? (
                    <img
                      src={item.cover_image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <ArticleIcon sx={{ fontSize: 32, color: "#1a2355" }} />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-[#1a2355] dark:text-white text-sm mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-3 line-clamp-2">
                    {item.html_content.replace(/<[^>]*>?/gm, '')}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500">
                    <CalendarTodayIcon sx={{ fontSize: 12 }} />
                    {item.created_at}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </SectionBlock>
    </div>
  );
}

