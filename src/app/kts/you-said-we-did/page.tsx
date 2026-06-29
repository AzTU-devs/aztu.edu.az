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
  created_at: string;
  updated_at: string | null;
};

function FeedbackCard({
  item,
  index,
  lang,
  youSaidLabel,
  weDidLabel,
}: {
  item: FeedbackItem;
  index: number;
  lang: "az" | "en";
  youSaidLabel: string;
  weDidLabel: string;
}) {
  const youSaid = lang === "az" ? item.you_said_az : item.you_said_en;
  const weDid = lang === "az" ? item.we_did_az : item.we_did_en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-white/80 dark:bg-[#0d1b3e]/80 backdrop-blur-xl rounded-[2rem] border-2 border-[#1a2355]/30 dark:border-white/5 overflow-hidden shadow-lg hover:border-[#ee7c7e]/20 transition-all duration-300"
    >
      <div className="p-6 md:p-7 border-b border-[#1a2355]/10 dark:border-white/5">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center bg-[#1a2355]/10 dark:bg-white/5 text-[#1a2355] dark:text-white">
            <RecordVoiceOverIcon sx={{ fontSize: 18 }} />
          </span>
          <span className="text-xs font-black uppercase tracking-widest text-[#1a2355]/60 dark:text-white/50">
            {youSaidLabel}
          </span>
        </div>
        <p className="text-base leading-relaxed font-medium text-[#1a2355] dark:text-white/90 whitespace-pre-line">
          {youSaid}
        </p>
      </div>
      <div className="p-6 md:p-7 bg-[#ee7c7e]/5 dark:bg-[#ee7c7e]/10">
        <div className="flex items-center gap-3 mb-3">
          <span className="w-9 h-9 shrink-0 rounded-xl flex items-center justify-center bg-[#ee7c7e]/15 text-[#ee7c7e]">
            <CheckCircleIcon sx={{ fontSize: 18 }} />
          </span>
          <span className="text-xs font-black uppercase tracking-widest text-[#ee7c7e]">
            {weDidLabel}
          </span>
        </div>
        <p className="text-base leading-relaxed font-medium text-gray-700 dark:text-gray-200 whitespace-pre-line">
          {weDid}
        </p>
      </div>
    </motion.div>
  );
}

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
                    className="h-48 rounded-[2rem] bg-[#1a2355]/5 dark:bg-white/5 animate-pulse"
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
                {items.map((item, idx) => (
                  <FeedbackCard
                    key={item.id}
                    item={item}
                    index={idx}
                    lang={lang}
                    youSaidLabel={copy.youSaidLabel}
                    weDidLabel={copy.weDidLabel}
                  />
                ))}
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
