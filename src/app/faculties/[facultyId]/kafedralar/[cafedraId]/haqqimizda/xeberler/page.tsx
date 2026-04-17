"use client";

import { use, useEffect, useState } from "react";
import { motion } from "framer-motion";
import SectionBlock from "@/components/shared/SectionBlock";
import ComingSoon from "@/components/shared/ComingSoon";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default function CafedraXeberlerPage({ params }: Props) {
  const { lang: currentLang } = useLanguage();
  
  // Using static data as seen in the original file, but with improved layout
  const news: any[] = [
    {
      news_id: 1,
      title: currentLang === "az" ? "Kafedra əməkdaşları beynəlxalq konfransda iştirak etdi" : "Department staff participated in an international conference",
      summary: currentLang === "az" ? "Kafedramızın professor-müəllim heyəti İstanbul Texniki Universitetində keçirilən «Kompüter Elmləri və Mühəndislik» beynəlxalq konfransında elmi məruzələrlə çıxış etdi." : "Our department's faculty members presented scientific reports at the 'Computer Science and Engineering' international conference held at Istanbul Technical University.",
      created_at: "2026-02-15",
      cover_image: "https://images.unsplash.com/photo-1540575861501-7ad05823c9f5?auto=format&fit=crop&q=80&w=800",
    },
    {
      news_id: 2,
      title: currentLang === "az" ? "Tələbələr üçün süni intellekt üzrə seminar keçirildi" : "AI seminar held for students",
      summary: currentLang === "az" ? "Kafedra tərəfindən təşkil olunan «Süni intellekt: nəzəriyyə və praktika» adlı seminar böyük maraqla qarşılandı." : "The 'Artificial Intelligence: Theory and Practice' seminar organized by the department was met with great interest.",
      created_at: "2026-03-03",
      cover_image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    },
  ];

  return (
    <div className="space-y-6">
      <SectionBlock title={currentLang === "az" ? "Kafedra xəbərləri" : "Department News"} accent>
        <p className="text-sm text-gray-500 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl">
          {currentLang === "az" 
            ? "Kafedranın elmi, tədris və sosial fəaliyyəti ilə bağlı ən son yeniliklər və elanlar." 
            : "The latest news and announcements regarding the department's scientific, academic, and social activities."}
        </p>

        {news.length === 0 ? (
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
                  <img
                    src={item.cover_image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                <div className="p-8 flex-1 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1 rounded-full bg-[#ee7c7e]/10 text-[#ee7c7e] text-[9px] font-black uppercase tracking-widest">
                       {currentLang === "az" ? "Xəbər" : "News"}
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-wider">
                      <CalendarTodayIcon sx={{ fontSize: 14 }} />
                      {item.created_at}
                    </div>
                  </div>

                  <h3 className="text-xl lg:text-2xl font-black text-[#1a2355] dark:text-white mb-4 group-hover:text-[#ee7c7e] transition-colors duration-300 leading-tight">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-500 dark:text-slate-400 text-sm leading-relaxed mb-8 line-clamp-3">
                    {item.summary}
                  </p>

                  <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#1a2355] dark:text-blue-400 group-hover:text-[#ee7c7e] transition-colors">
                    {currentLang === "az" ? "Ətraflı oxu" : "Read more"}
                    <ArrowForwardIcon sx={{ fontSize: 16 }} className="transition-transform group-hover:translate-x-2" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </SectionBlock>
    </div>
  );
}
