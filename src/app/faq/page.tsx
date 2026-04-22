"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import { useLanguage } from "@/context/LanguageContext";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

type FAQItem = {
    question: string;
    answer: string;
};

type Dict = {
    eyebrow: string;
    title: string;
    description: string;
    breadcrumb: string;
    faqs: FAQItem[];
};

const COPY: Record<"az" | "en", Dict> = {
    az: {
        eyebrow: "Tez-tez verilən suallar",
        title: "FAQ",
        description: "Azərbaycan Texniki Universiteti haqqında ən çox verilən suallar və onların cavabları.",
        breadcrumb: "FAQ",
        faqs: [
            {
                question: "AzTU-ya necə qəbul olmaq olar?",
                answer: "Universitetimizə qəbul Dövlət İmtahan Mərkəzi (DİM) tərəfindən keçirilən mərkəzləşdirilmiş qəbul imtahanları vasitəsilə həyata keçirilir. Bakalavr pilləsi üçün I qrup üzrə imtahan vermək lazımdır."
            },
            {
                question: "Xarici tələbələr üçün qəbul qaydaları necədir?",
                answer: "Xarici vətəndaşlar universitetimizə müsahibə əsasında qəbul ola bilərlər. Ətraflı məlumat üçün Beynəlxalq Əlaqələr şöbəsinə müraciət edə bilərsiniz."
            },
            {
                question: "Universitetdə yataqxana varmı?",
                answer: "Bəli, universitetimizin tələbə şəhərciyi və müasir standartlara cavab verən yataqxanası mövcuddur. Yataqxanada qalmaq üçün tələbə xidmətləri bölməsinə müraciət etməlisiniz."
            },
            {
                question: "Təhsil haqqını hissə-hissə ödəmək mümkündürmü?",
                answer: "Bəli, təhsil haqqını semestrlər üzrə iki hissəyə bölərək ödəmək mümkündür. Xüsusi hallarda rektorluğa müraciət edərək əlavə güzəştlər əldə edilə bilər."
            },
            {
                question: "Erasmus+ və digər mübadilə proqramlarında iştirak etmək olar?",
                answer: "AzTU bir çox Avropa universitetləri ilə Erasmus+ tərəfdaşlıq müqavilələrinə malikdir. Yüksək akademik göstəriciləri olan tələbələr bu proqramlara qoşula bilərlər."
            }
        ]
    },
    en: {
        eyebrow: "Frequently Asked Questions",
        title: "FAQ",
        description: "Find answers to common questions about Azerbaijan Technical University.",
        breadcrumb: "FAQ",
        faqs: [
            {
                question: "How can I apply to AzTU?",
                answer: "Admission to our university is carried out through centralized entrance exams organized by the State Examination Center (SEC). For undergraduate studies, you need to take exams in the 1st group."
            },
            {
                question: "What are the admission rules for international students?",
                answer: "International citizens can be admitted to our university based on an interview. For more information, please contact the International Relations Department."
            },
            {
                question: "Is there a dormitory at the university?",
                answer: "Yes, our university has a campus and a dormitory that meets modern standards. To stay in the dormitory, you should contact the student services department."
            },
            {
                question: "Is it possible to pay tuition fees in installments?",
                answer: "Yes, it is possible to pay tuition fees in two installments per semester. In special cases, additional concessions can be obtained by applying to the Rector's office."
            },
            {
                question: "Can I participate in Erasmus+ and other exchange programs?",
                answer: "AzTU has Erasmus+ partnership agreements with many European universities. Students with high academic performance can join these programs."
            }
        ]
    },
};

export default function FAQPage() {
    const { lang } = useLanguage();
    const t = COPY[lang];
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden">
            <div className="bg-mesh" />
            <div className="bg-grid-premium" />

            <PageHero
                title={t.title}
                description={t.description}
                breadcrumbs={[{ label: t.breadcrumb }]}
                eyebrow={t.eyebrow}
            />

            <PageContainer>
                <div className="max-w-4xl mx-auto relative z-10 py-10">
                    <div className="space-y-4">
                        {t.faqs.map((faq, index) => (
                            <FAQAccordion
                                key={index}
                                faq={faq}
                                isOpen={activeIndex === index}
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            />
                        ))}
                    </div>
                </div>
            </PageContainer>
        </main>
    );
}

function FAQAccordion({ 
    faq, 
    isOpen, 
    onClick 
}: { 
    faq: FAQItem; 
    isOpen: boolean; 
    onClick: () => void;
}) {
    return (
        <div className={`overflow-hidden rounded-[2rem] border-2 transition-all duration-500 ${
            isOpen 
            ? "bg-white dark:bg-slate-900 border-[#ee7c7e] shadow-2xl shadow-[#ee7c7e]/10 scale-[1.02]" 
            : "bg-white/50 dark:bg-slate-900/50 border-[#1a2355]/10 dark:border-white/10 hover:border-[#ee7c7e]/30"
        }`}>
            <button
                onClick={onClick}
                className="w-full flex items-center justify-between p-8 text-left cursor-pointer"
            >
                <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                        isOpen 
                        ? "bg-[#ee7c7e] text-white rotate-[360deg]" 
                        : "bg-[#1a2355]/5 dark:bg-white/5 text-[#ee7c7e]"
                    }`}>
                        <HelpOutlineIcon sx={{ fontSize: 24 }} />
                    </div>
                    <h3 className={`text-lg md:text-xl font-black tracking-tight transition-colors duration-500 ${
                        isOpen ? "text-[#1a2355] dark:text-white" : "text-[#1a2355]/70 dark:text-white/70"
                    }`}>
                        {faq.question}
                    </h3>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${
                    isOpen 
                    ? "border-[#ee7c7e] text-[#ee7c7e] rotate-180" 
                    : "border-[#1a2355]/10 dark:border-white/10 text-[#1a2355]/30 dark:text-white/30"
                }`}>
                    <ExpandMoreIcon sx={{ fontSize: 20 }} />
                </div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    >
                        <div className="px-8 pb-8 pl-[90px] text-gray-600 dark:text-gray-300 text-lg leading-relaxed font-medium">
                            <div className="h-[2px] w-12 bg-[#ee7c7e]/20 mb-6 rounded-full" />
                            {faq.answer}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
