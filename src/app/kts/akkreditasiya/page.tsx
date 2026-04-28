"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import KtsSidebar from "@/components/kts/KtsSidebar";
import { useLanguage } from "@/context/LanguageContext";
import VerifiedIcon from "@mui/icons-material/Verified";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const ACCREDITATION_DATA = {
  az: {
    eyebrow: "Keyfiyyətin Təminatı",
    title: "Akkreditasiya",
    description: "AzTU-nun institusional və proqram akkreditasiyası haqqında məlumat və sənədlər.",
    breadcrumb: "Akkreditasiya",
    sections: [
      {
        type: "institutional",
        title: "İnstitusional Akkreditasiya",
        body: "İnstitusional akkreditasiya — təhsil müəssisəsinin fəaliyyətinin qəbul olunmuş dövlət təhsil standartlarına uyğunluğunun yoxlanılmasıdır. Hər 5 ildən bir Təhsildə Keyfiyyətin Təminatı Agentliyi tərəfindən həyata keçirilir və müvəffəqiyyətli keçirildiyi halda sertifikat verilir.",
        docs: [
          {
            title: "AzTU Yekun Hesabat — İnstitusional Akkreditasiya",
            url: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/11-2024/AzTU_Yekun%20Hesabat_TKTA_sayt_compressed.pdf",
            embedUrl: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/11-2024/AzTU_Yekun%20Hesabat_TKTA_sayt_compressed.pdf",
          },
          {
            title: "İnstitusional Akkreditasiya Sertifikatı",
            url: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/11-2024/sekil%20(4).pdf",
            embedUrl: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/11-2024/sekil%20(4).pdf",
          },
        ],
      },
      {
        type: "program",
        title: "Proqram Akkreditasiyası",
        body: "Proqram akkreditasiyası tədris proqramlarını tədris planı standartları, müəllim heyətinin ixtisası və əmək bazarına uyğunluğu baxımından qiymətləndirir. Keyfiyyətin Təminatı Agentliyi və ya ENQA üzvü olan təşkilatlar tərəfindən həyata keçirilə bilər.",
        docs: [
          {
            title: "Akkreditasiya Olunmuş Proqramlar Hesabatı — Enerji Klasteri",
            url: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/11-2024/Abschlussbericht%20Fachsiegel%20TU%20Baku%20et%20al-%20Cluster%20Energie%202015-06-26_compressed.pdf",
            embedUrl: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/11-2024/Abschlussbericht%20Fachsiegel%20TU%20Baku%20et%20al-%20Cluster%20Energie%202015-06-26_compressed.pdf",
          },
        ],
      },
    ],
  },
  en: {
    eyebrow: "Quality Assurance",
    title: "Accreditation",
    description: "Information and documents on AzTU's institutional and program accreditation.",
    breadcrumb: "Accreditation",
    sections: [
      {
        type: "institutional",
        title: "Institutional Accreditation",
        body: "Institutional accreditation verifies that an educational institution's activities comply with accepted state education standards. It is conducted every 5 years by the Quality Assurance Agency in Education and results in a certificate upon successful completion.",
        docs: [
          {
            title: "AzTU Final Report — Institutional Accreditation",
            url: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/11-2024/AzTU_Yekun%20Hesabat_TKTA_sayt_compressed.pdf",
            embedUrl: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/11-2024/AzTU_Yekun%20Hesabat_TKTA_sayt_compressed.pdf",
          },
          {
            title: "Institutional Accreditation Certificate",
            url: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/11-2024/sekil%20(4).pdf",
            embedUrl: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/11-2024/sekil%20(4).pdf",
          },
        ],
      },
      {
        type: "program",
        title: "Program Accreditation",
        body: "Program accreditation evaluates teaching programs against curriculum standards, faculty qualifications, and labor market alignment. It may be conducted by the Quality Assurance Agency or ENQA member organizations.",
        docs: [
          {
            title: "Accredited Programs Report — Energy Cluster",
            url: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/11-2024/Abschlussbericht%20Fachsiegel%20TU%20Baku%20et%20al-%20Cluster%20Energie%202015-06-26_compressed.pdf",
            embedUrl: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/11-2024/Abschlussbericht%20Fachsiegel%20TU%20Baku%20et%20al-%20Cluster%20Energie%202015-06-26_compressed.pdf",
          },
        ],
      },
    ],
  },
};

export default function AkkreditasiyaPage() {
  const { lang } = useLanguage();
  const copy = ACCREDITATION_DATA[lang];

  return (
    <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden bg-white dark:bg-[#080f25]">
      <div className="bg-mesh opacity-100" />
      <div className="bg-grid-premium opacity-10" />
      <div className="fixed top-1/4 -left-20 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />
      <div className="fixed bottom-1/4 -right-20 w-96 h-96 bg-[#ee7c7e]/5 blur-[120px] rounded-full pointer-events-none" style={{ animationDelay: "2s" }} />

      <PageHero
        title={copy.title}
        description={copy.description}
        breadcrumbs={[
          { label: lang === "az" ? "QA" : "QA", href: `/${lang}/${lang === "az" ? "kts" : "qa"}` },
          { label: copy.breadcrumb },
        ]}
        eyebrow={copy.eyebrow}
      />

      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 -mt-16">
          <div className="lg:col-span-8 space-y-12">
            {copy.sections.map((section, sIdx) => (
              <motion.div
                key={section.type}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: sIdx * 0.1, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Section header */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-[#ee7c7e] flex items-center justify-center shrink-0 shadow-lg shadow-[#ee7c7e]/20">
                    <VerifiedIcon sx={{ color: "white", fontSize: 20 }} />
                  </div>
                  <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tight">
                    {section.title}
                  </h2>
                </div>

                {/* Description card */}
                <div className="bg-white/80 dark:bg-[#0d1b3e]/80 backdrop-blur-xl rounded-[2rem] border-2 border-[#1a2355]/5 dark:border-white/5 p-8 shadow-lg relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ee7c7e] to-transparent opacity-20" />
                  <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed font-medium">
                    {section.body}
                  </p>
                </div>

                {/* Documents */}
                <div className="space-y-6">
                  {section.docs.map((doc, dIdx) => (
                    <motion.div
                      key={dIdx}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: dIdx * 0.1 }}
                      className="bg-white/70 dark:bg-[#0d1b3e]/70 backdrop-blur-xl rounded-[2rem] border-2 border-[#1a2355]/5 dark:border-white/5 overflow-hidden shadow-lg hover:border-[#ee7c7e]/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-4 px-8 py-5 border-b border-[#1a2355]/5 dark:border-white/5">
                        <div className="w-10 h-10 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0">
                          <PictureAsPdfIcon sx={{ fontSize: 20 }} className="text-[#ee7c7e]" />
                        </div>
                        <span className="flex-1 font-bold text-[#1a2355] dark:text-white text-sm leading-snug">
                          {doc.title}
                        </span>
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 flex items-center gap-2 text-xs font-black text-[#ee7c7e] hover:text-[#1a2355] dark:hover:text-white transition-colors uppercase tracking-widest"
                        >
                          {lang === "az" ? "Aç" : "Open"}
                          <OpenInNewIcon sx={{ fontSize: 14 }} />
                        </a>
                      </div>
                      <div className="w-full h-[600px] bg-gray-50 dark:bg-[#050d20]">
                        <iframe
                          src={doc.embedUrl}
                          className="w-full h-full border-0"
                          loading="lazy"
                          title={doc.title}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-4">
            <KtsSidebar />
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
