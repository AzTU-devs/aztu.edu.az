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
                question: "AzTU-nu fərqləndirən nədir?",
                answer: "AzTU güclü mühəndislik ənənələrinə malik aparıcı texniki ali təhsil müəssisəsidir və müdafiə sənayesi daxil olmaqla strateji əhəmiyyətli sahələr üçün mütəxəssis hazırlığında xüsusi rola malikdir. Universitet praktik yönümlü təhsilə üstünlük verir və tələbə dostu qiymətləndirmə sistemi tətbiq edir."
            },
            {
                question: "Qəbul tələbləri hansılardır?",
                answer: "Yerli abituriyentlər üçün qəbul milli mərkəzləşdirilmiş imtahan sistemi vasitəsilə həyata keçirilir. Xarici tələbələr isə birbaşa universitetə müraciət edə bilər və qəbul akademik göstəricilər və tələb olunan sənədlər əsasında aparılır."
            },
            {
                question: "Tədris proqramları nə qədər tez-tez yenilənir?",
                answer: "AzTU-da tədris proqramları təxminən hər 4–5 ildən bir mütəmadi olaraq yenilənir. Bu yenilənmələr əmək bazarının tələbləri, işəgötürən rəyləri, beynəlxalq təcrübə və texnoloji yeniliklər əsasında aparılır. Seçilmiş xüsusi qruplarda bu proses daha dinamik şəkildə həyata keçirilir."
            },
            {
                question: "Tədris daha çox nəzəri, yoxsa praktik yönümlüdür?",
                answer: "AzTU-da tədris əsasən praktik yönümlüdür. Tələbələr laboratoriya işləri, tətbiqi layihələr və istehsalat təcrübələri vasitəsilə real iş mühitinə uyğun bilik və bacarıqlar əldə edirlər."
            },
            {
                question: "Proqramlar əmək bazarının tələblərinə uyğundurmu?",
                answer: "Bəli, proqramlar əmək bazarının mövcud tələblərinə uyğun hazırlanır. Texniki biliklərlə yanaşı, tələbələrdə analitik düşüncə, idarəetmə və problem həll etmə bacarıqları da formalaşdırılır."
            },
            {
                question: "AzTU-da dərsləri kimlər tədris edir?",
                answer: "Dərslər təcrübəli professor-müəllim heyəti tərəfindən tədris olunur. Bununla yanaşı, sənaye mütəxəssisləri də tədris prosesinə cəlb edilərək praktik biliklərin ötürülməsinə töhfə verirlər."
            },
            {
                question: "Müəllimlərlə dərsdən kənar əlaqə mümkündürmü?",
                answer: "Müəllimlərlə qəbul saatları, fərdi görüşlər və elektron platformalar vasitəsilə əlaqə saxlamaq mümkündür. Bəzi hallarda iş yükü səbəbindən gecikmələr olsa da, tələbə təşkilatları bu prosesdə dəstək göstərir."
            },
            {
                question: "Təcrübə və praktiki imkanlar varmı?",
                answer: "Tələbələr il ərzində müxtəlif yerli və beynəlxalq təcrübə və inkişaf proqramlarında aktiv iştirak edirlər. Seçim zamanı əsasən akademik göstəricilər və ixtisas üzrə biliklər nəzərə alınır."
            },
            {
                question: "Məzunlar əsasən hansı sahələrdə işləyir?",
                answer: "Məzunlar əsasən energetika, informasiya texnologiyaları, telekommunikasiya, istehsalat, nəqliyyat, logistika və müdafiə sənayesi kimi mühəndislik və texnologiya yönümlü sahələrdə fəaliyyət göstərirlər."
            },
            {
                question: "AzTU-da tələbə həyatı necədir?",
                answer: "Tələbə həyatı aktiv və çoxşaxəlidir. Universitetdə mədəni tədbirlər, idman yarışları, intellektual oyunlar və peşəkar inkişaf proqramları təşkil olunur. Mövcud imkanlara baxmayaraq, tələbə aktivliyinin artırılması prioritet istiqamətlərdən biridir."
            },
            {
                question: "Universitet tələbələrin rifahını necə dəstəkləyir?",
                answer: "AzTU tələbələrin psixoloji və sosial rifahını maarifləndirici tədbirlər, təlimlər və fərdi konsultasiyalar vasitəsilə dəstəkləyir. Eyni zamanda tələbələr universitetin kampus daxilində fəaliyyət göstərən poliklinikasının tibbi xidmətlərindən istifadə edə bilirlər. Bu sahədə xidmətlərin daha da genişləndirilməsi istiqamətində işlər davam etdirilir."
            },
            {
                question: "Bakıda tələbə üçün aylıq yaşayış xərci nə qədərdir?",
                answer: "Orta aylıq yaşayış xərci həyat tərzindən asılı olaraq 400–800 AZN aralığında dəyişir. Əsas xərclər kirayə, qidalanma və nəqliyyatdır."
            },
            {
                question: "Yataqxana mövcuddurmu?",
                answer: "Universitetin yataqxana infrastrukturu mövcud olsa da, hazırda istifadədə deyil. Bu səbəbdən tələbələr əsasən kirayə mənzillərdə, çox vaxt paylaşılmış formada yaşayırlar."
            },
            {
                question: "Nəqliyyat imkanları necədir?",
                answer: "Universitet şəhərin əlverişli ərazisində yerləşir və metro, avtobus və digər ictimai nəqliyyat vasitələri ilə rahat əlçatandır."
            },
            {
                question: "Təhsil haqqı nə qədərdir?",
                answer: "İllik təhsil haqqı ixtisasdan asılı olaraq təxminən 1900–2200 AZN təşkil edir."
            },
            {
                question: "Təqaüd və maliyyə dəstəyi varmı?",
                answer: "Tələbələr dövlət təqaüdlərindən, akademik göstəricilərə əsaslanan təqaüdlərdən və sosial dəstək proqramlarından yararlana bilirlər."
            },
            {
                question: "Tibbi xidmətlər mövcuddurmu?",
                answer: "Tələbələr üçün tibbi xidmətlər universitetə bağlı səhiyyə müəssisəsi, o cümlədən universitet poliklinikası vasitəsilə təmin olunur."
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
                question: "What distinguishes AzTU?",
                answer: "AzTU stands out as a leading technical institution with a strong engineering tradition and a unique role in preparing specialists for strategically important sectors, including the defense industry. The university emphasizes practice-oriented education and maintains a student-friendly academic assessment system."
            },
            {
                question: "What are the admission requirements?",
                answer: "Admission to AzTU for local applicants is conducted through the national centralized examination system. International applicants may apply directly to the university, with admission based on academic qualifications and required documentation in line with institutional criteria."
            },
            {
                question: "How often are academic programs updated?",
                answer: "Academic programs at AzTU are regularly reviewed and updated approximately every 4–5 academic years. These updates are based on labor market needs, employer feedback, international academic practices, and technological advancements. In selected excellence-based groups, this process is implemented more dynamically."
            },
            {
                question: "What is the balance between theoretical and practical learning?",
                answer: "Education at AzTU is predominantly practice-oriented. Students gain hands-on experience through laboratory work, applied projects, and industrial training, ensuring strong alignment between academic knowledge and real-world application."
            },
            {
                question: "Are the programs aligned with current labor market demands?",
                answer: "Yes, academic programs are designed to reflect current labor market requirements. In addition to technical expertise, students develop analytical, managerial, and problem-solving skills, preparing them for both industrial and business environments."
            },
            {
                question: "Who teaches at AzTU?",
                answer: "Courses are delivered by experienced academic staff, including professors and lecturers, as well as industry professionals who contribute practical insights to the learning process."
            },
            {
                question: "How accessible are professors outside of class?",
                answer: "Faculty members are generally accessible through office hours, individual consultations, and digital communication platforms. While occasional delays may occur due to workload, institutional student bodies support communication and issue resolution."
            },
            {
                question: "What internship and practical experience opportunities are available?",
                answer: "Students actively participate in a wide range of national and international internship and development programs. Selection is typically based on academic performance and subject-specific knowledge."
            },
            {
                question: "What career paths do graduates typically pursue?",
                answer: "Graduates primarily work in engineering and technology-driven sectors such as energy, information technologies, telecommunications, manufacturing, transport, logistics, and defense-related industries."
            },
            {
                question: "What is student life like at AzTU?",
                answer: "Student life is dynamic and diverse, offering opportunities in cultural activities, sports, academic competitions, and professional development initiatives. While opportunities are extensive, increasing student engagement remains an ongoing priority."
            },
            {
                question: "Does the university support student wellbeing?",
                answer: "AzTU provides support for students’ psychological and social wellbeing through awareness programs, training sessions, and individual consultations. Students also have access to medical services through the on-campus university polyclinic. Ongoing efforts are focused on further strengthening and institutionalizing these support services."
            },
            {
                question: "What are the average living costs for students in Baku?",
                answer: "The average monthly cost of living ranges between 400–800 AZN, depending on lifestyle. Major expenses include accommodation, food, and transportation."
            },
            {
                question: "Are dormitory facilities available?",
                answer: "Although the university has dormitory infrastructure, it is currently not operational. As a result, students typically rely on private rental housing, often sharing accommodation to reduce costs."
            },
            {
                question: "What are the transportation options?",
                answer: "The university is located in a well-connected area of the city, with convenient access to metro, bus, and other public transportation options."
            },
            {
                question: "What are the tuition fees?",
                answer: "Annual tuition fees generally range between 1900–2200 AZN, depending on the program."
            },
            {
                question: "Are scholarships or financial aid options available?",
                answer: "Students may benefit from government-funded scholarships, merit-based financial support, and institutional social assistance programs aimed at supporting academically successful and financially disadvantaged students."
            },
            {
                question: "Are healthcare services available for students?",
                answer: "Students have access to medical services through a designated student healthcare facility, including the university polyclinic."
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
                <div className="max-w-7xl mx-auto relative z-10 py-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
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
