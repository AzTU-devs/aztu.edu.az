"use client";

import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import { CafedraNews } from "@/types/cafedra";
import ArticleIcon from "@mui/icons-material/Article";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

export default function CafedraXeberlerPage() {
  const news: CafedraNews[] = [
    {
      id: 1,
      title: "Kafedra əməkdaşları beynəlxalq konfransda iştirak etdi",
      summary: "Kafedramızın professor-müəllim heyəti İstanbul Texniki Universitetində keçirilən «Kompüter Elmləri və Mühəndislik» beynəlxalq konfransında elmi məruzələrlə çıxış etdi. Konfransda 20-dən artıq ölkədən 300-dən çox alim iştirak etmişdir.",
      date: "15 fevral 2026",
      image_url: "https://ui-avatars.com/api/?name=Konfrans&background=1a2355&color=fff&size=200",
    },
    {
      id: 2,
      title: "Tələbələr üçün süni intellekt üzrə seminar keçirildi",
      summary: "Kafedra tərəfindən təşkil olunan «Süni intellekt: nəzəriyyə və praktika» adlı seminar böyük maraqla qarşılandı. Seminarda 150-dən artıq tələbə iştirak etmiş, sualların cavablandırılması üçün əlavə vaxt ayrılmışdır.",
      date: "3 mart 2026",
      image_url: "https://ui-avatars.com/api/?name=Seminar&background=ee7c7e&color=fff&size=200",
    },
    {
      id: 3,
      title: "Kafedra əməkdaşı beynəlxalq qrant qazandı",
      summary: "Kafedramızın dosenti Vüsal Nəsirov Avropa Komissiyasının Horizon Europe proqramı çərçivəsində beynəlxalq tədqiqat qrantı qazanmışdır. Layihə 3 il müddətinə nəzərdə tutulmuş olub, kibertəhlükəsizlik sahəsini əhatə edir.",
      date: "20 yanvar 2026",
    },
    {
      id: 4,
      title: "Yeni tədris laboratoriyası açıldı",
      summary: "Kafedranın nəzdində müasir avadanlıqlarla təchiz olunmuş yeni tədris laboratoriyası istifadəyə verilmişdir. Laboratoriyada 30 iş yeri mövcuddur və tələbələr ən son texnologiyalarla işləmək imkanı əldə edirlər.",
      date: "10 yanvar 2026",
    },
  ];

  return (
    <div className="space-y-6">
      <SectionBlock title="Xəbərlər" accent>
        {news.length === 0 ? (
          <ComingSoon label="Kafedra xəbərləri tezliklə əlavə olunacaq" />
        ) : (
          <div className="space-y-4">
            {news.map((item) => (
              <div
                key={item.id}
                className="flex gap-5 bg-gray-50 dark:bg-slate-700/40 border border-gray-100 dark:border-slate-600 rounded-2xl p-5 hover:shadow-sm transition-shadow"
              >
                {/* Image or icon */}
                <div className="w-20 h-20 rounded-xl bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
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
                  <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed mb-3">
                    {item.summary}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-gray-400 dark:text-slate-500">
                    <CalendarTodayIcon sx={{ fontSize: 12 }} />
                    {item.date}
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
