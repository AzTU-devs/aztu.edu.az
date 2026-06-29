"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import KtsSidebar from "@/components/kts/KtsSidebar";
import { useLanguage } from "@/context/LanguageContext";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";

const YOU_SAID_WE_DID_API = "https://api-plan-report.aztu.edu.az/api/you-said-we-did";

type FeedbackItem = {
  id: number;
  you_said_az: string;
  you_said_en: string;
  we_did_az: string;
  we_did_en: string;
  status: "in_progress" | "done";
  created_at: string;
  updated_at: string | null;
};

export default function YouSaidWeDidPage() {
  const { lang } = useLanguage();
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetch(YOU_SAID_WE_DID_API)
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((data) => {
        if (cancelled) return;
        setItems(Array.isArray(data?.items) ? data.items : []);
      })
      .catch(() => {
        if (!cancelled) setItems([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const copy = {
    az: {
      eyebrow: "Keyfiyyətin Təminatı",
      title: "Siz dediniz, biz etdik",
      description:
        "Maraqlı tərəflərin geribildirimləri əsasında universitetin həyata keçirdiyi konkret addımlar və təkmilləşdirmələr.",
      breadcrumb: "Siz dediniz, biz etdik",
      youSaidLabel: "Siz dediniz",
      weDidLabel: "Biz etdik",
      statusLabel: "Status",
      statusInProgress: "İcradadır",
      statusDone: "Tamamlandı",
      count: "qeyd",
      empty: "Hələlik məlumat yoxdur.",
    },
    en: {
      eyebrow: "Quality Assurance",
      title: "You Said, We Did",
      description:
        "Concrete actions and improvements the university has implemented based on stakeholder feedback.",
      breadcrumb: "You Said, We Did",
      youSaidLabel: "You said",
      weDidLabel: "We did",
      statusLabel: "Status",
      statusInProgress: "In progress",
      statusDone: "Done",
      count: "entries",
      empty: "No entries yet.",
    },
  }[lang];

  return (
    <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden bg-page dark:bg-[#080f25]">
      <div className="bg-mesh opacity-100" />
      <div className="bg-grid-premium opacity-10" />
      <div className="fixed top-1/4 -left-20 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="fixed bottom-1/4 -right-20 w-96 h-96 bg-[#ee7c7e]/5 blur-[120px] rounded-full pointer-events-none" style={{ animationDelay: "2s" }} />

      <PageHero
        title={copy.title}
        description={copy.description}
        breadcrumbs={[
          { label: lang === "az" ? "KTŞ" : "QA", href: `/${lang}/${lang === "az" ? "kts" : "qa"}` },
          { label: copy.breadcrumb },
        ]}
        eyebrow={copy.eyebrow}
      />

      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 -mt-16">
          <div className="lg:col-span-8 space-y-4">
            {loading ? (
              <div className="space-y-4">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-20 rounded-2xl bg-[#1a2355]/5 dark:bg-white/5 animate-pulse"
                  />
                ))}
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-[2rem] border-2 border-dashed border-[#1a2355]/15 dark:border-white/10 p-16 text-center">
                <ForumOutlinedIcon sx={{ fontSize: 40 }} className="text-[#1a2355]/30 dark:text-white/20" />
                <p className="text-[#1a2355]/50 dark:text-white/40 font-medium">{copy.empty}</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-2 h-8 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_12px_rgba(238,124,126,0.4)]" />
                  <span className="text-sm font-black text-[#1a2355]/50 dark:text-white/40 uppercase tracking-widest">
                    {items.length} {copy.count}
                  </span>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="overflow-hidden rounded-[2rem] border-2 border-[#1a2355]/20 dark:border-white/5 shadow-2xl shadow-blue-900/5 bg-white/80 dark:bg-[#0d1b3e]/80 backdrop-blur-xl"
                >
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left">
                      <thead>
                        <tr className="bg-[#1a2355] text-white">
                          <th className="w-16 px-4 py-5 text-center text-xs font-black uppercase tracking-widest">
                            #
                          </th>
                          <th className="px-6 py-5 text-xs font-black uppercase tracking-widest">
                            <span className="inline-flex items-center gap-2">
                              <RecordVoiceOverIcon sx={{ fontSize: 18 }} className="text-[#ee7c7e]" />
                              {copy.youSaidLabel}
                            </span>
                          </th>
                          <th className="px-6 py-5 text-xs font-black uppercase tracking-widest">
                            <span className="inline-flex items-center gap-2">
                              <CheckCircleIcon sx={{ fontSize: 18 }} className="text-[#ee7c7e]" />
                              {copy.weDidLabel}
                            </span>
                          </th>
                          <th className="px-6 py-5 text-xs font-black uppercase tracking-widest whitespace-nowrap">
                            {copy.statusLabel}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((item, idx) => (
                          <tr
                            key={item.id}
                            className="border-t border-[#1a2355]/10 dark:border-white/5 odd:bg-transparent even:bg-[#1a2355]/[0.025] dark:even:bg-white/[0.02] hover:bg-[#ee7c7e]/5 dark:hover:bg-[#ee7c7e]/10 transition-colors duration-200 align-top"
                          >
                            <td className="px-4 py-5 text-center">
                              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 text-[#1a2355] dark:text-white font-black text-sm">
                                {idx + 1}
                              </span>
                            </td>
                            <td className="px-6 py-5 text-[#1a2355] dark:text-white/90 text-sm md:text-base leading-relaxed font-medium whitespace-pre-line min-w-[220px] border-r border-[#1a2355]/10 dark:border-white/5">
                              {lang === "az" ? item.you_said_az : item.you_said_en}
                            </td>
                            <td className="px-6 py-5 text-gray-700 dark:text-gray-200 text-sm md:text-base leading-relaxed font-medium whitespace-pre-line min-w-[220px]">
                              {lang === "az" ? item.we_did_az : item.we_did_en}
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                                  item.status === "in_progress"
                                    ? "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                                    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                                }`}
                              >
                                <span
                                  className={`h-1.5 w-1.5 rounded-full ${
                                    item.status === "in_progress" ? "bg-amber-500" : "bg-emerald-500"
                                  }`}
                                />
                                {item.status === "in_progress" ? copy.statusInProgress : copy.statusDone}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </>
            )}
          </div>

          <div className="lg:col-span-4">
            <KtsSidebar />
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
