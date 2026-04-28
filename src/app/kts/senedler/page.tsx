"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import KtsSidebar from "@/components/kts/KtsSidebar";
import { useLanguage } from "@/context/LanguageContext";
import DescriptionIcon from "@mui/icons-material/Description";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AnimatePresence } from "framer-motion";

function getEmbedUrl(url: string): string {
  // Google Drive file
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
  if (driveMatch) return `https://drive.google.com/file/d/${driveMatch[1]}/preview`;
  // Google Docs
  const docsMatch = url.match(/docs\.google\.com\/document\/d\/([^/]+)/);
  if (docsMatch) return `https://docs.google.com/document/d/${docsMatch[1]}/preview`;
  // Google Sheets
  const sheetsMatch = url.match(/docs\.google\.com\/spreadsheets\/d\/([^/]+)/);
  if (sheetsMatch) return `https://docs.google.com/spreadsheets/d/${sheetsMatch[1]}/htmlview`;
  // Google Drive folder
  if (url.includes("drive.google.com/open") || url.includes("drive.google.com/drive")) return url;
  return url;
}

const DOCUMENTS = [
  {
    titleAz: "Keyfiyyətin təminatı şöbəsinin əsasnaməsi",
    titleEn: "Quality Assurance Department Regulation",
    url: "https://drive.google.com/file/d/1F3LTa7sA4r6Qw5o31Ir1gF1fu4OLknJn/view?usp=sharing",
  },
  {
    titleAz: "Keyfiyyət Təminatı Siyasəti",
    titleEn: "Quality Assurance Policy",
    url: "https://drive.google.com/file/d/1i_yFVqCjRS1bvEMYIK-5-QN-E0C14Qyu/view?usp=sharing",
  },
  {
    titleAz: "Keyfiyyət Təminatı Bələdçisi",
    titleEn: "Quality Assurance Guide",
    url: "https://www.aztu.edu.az/sub_site/web_admin/upload/files/aztu.edu.az/menus/4-2025/Keyfiyy%C9%99t%20T%C9%99minat%C4%B1%20B%C9%99l%C9%99d%C3%A7isi-_compressed.pdf",
  },
  {
    titleAz: "Daxili Qiymətləndirmə və Özünüqiymətləndirmə Mexanizmləri",
    titleEn: "Internal Evaluation and Self-Assessment Mechanisms",
    url: "https://drive.google.com/file/d/1w38z-p0IvWUoQGvcL3DG4-RUNg0b014C/view",
  },
  {
    titleAz: "ISO və digər keyfiyyət standartlarına uyğunluq prosedurları",
    titleEn: "ISO and Other Quality Standards Compliance Procedures",
    url: "https://docs.google.com/document/d/1NnCSd7tqjlXuve6oYDajatmx5AHsrR9a/edit",
  },
  {
    titleAz: "Məmnuniyyət Ölçülməsi və Keyfiyyətin İnkişafı Üçün Sorğu Metodologiya Sənədi",
    titleEn: "Survey Methodology Document for Satisfaction Measurement and Quality Development",
    url: "https://docs.google.com/document/d/11-z86YYwhufZCzY8XpLQHWrN1aMtlVn4/edit",
  },
  {
    titleAz: "Akademik mükəmməllik və keyfiyyətin artırılması qaydaları",
    titleEn: "Academic Excellence and Quality Improvement Rules",
    url: "https://docs.google.com/document/d/1kIAQS7-h0mvk3erks7awz4RaFqlvbmiP/edit",
  },
  {
    titleAz: "Tədris Proqramlarının Akkreditasiyası və Yenilənməsi Qaydaları",
    titleEn: "Academic Program Accreditation and Update Rules",
    url: "https://drive.google.com/file/d/1R6y__P0IishZNB7JTXx-aa3psL-qBgNM/view",
  },
  {
    titleAz: "Təhsilalanların Qiymətləndirilməsi və İmtahanların Təşkili Qaydaları",
    titleEn: "Student Assessment and Examination Organization Rules",
    url: "https://drive.google.com/file/d/1RBnk3DyUzEpr4nxS0XPPEZ1bayHH0fTh/view?usp=drive_link",
  },
  {
    titleAz: "KTŞ Fəaliyyət Planı",
    titleEn: "QA Department Activity Plan",
    url: "https://docs.google.com/spreadsheets/d/1F3hWcYDHn0rbKCbhWF0Tu3xY21M-1gtB/edit",
  },
  {
    titleAz: "CDIO Yanaşmasının Tətbiqi və Nəzarət Mexanizmləri",
    titleEn: "CDIO Approach Implementation and Control Mechanisms",
    url: "https://drive.google.com/file/d/12OE03VCeB46yeq4qV1YYFTlHdnoC-rMg/view",
  },
  {
    titleAz: "AzTU Süni intellekt",
    titleEn: "AzTU Artificial Intelligence",
    url: "https://docs.google.com/document/d/1sEbWgJixURPmhkCIKs5WR7A0EYkbD_zQ/edit",
  },
  {
    titleAz: "Keyfiyyət mədəniyyəti",
    titleEn: "Quality Culture",
    url: "https://docs.google.com/document/d/1_WE-Bc5M18ytzBuMp9nyqSzsa1lYetz3/edit",
  },
  {
    titleAz: "AzTU Struktur bölmələr və onların rəhbərləri",
    titleEn: "AzTU Structural Units and Their Heads",
    url: "https://drive.google.com/open?id=1I3sVyRG2DFrb2mG-9IggkyE2cn0sawhf",
  },
  {
    titleAz: "KTŞ Struktur sənədi",
    titleEn: "QA Department Structure Document",
    url: "https://docs.google.com/document/d/1hzu4rmOxTdkGalUZ37gIiHW9pL32kZYv/edit",
  },
  {
    titleAz: "Audit planı",
    titleEn: "Audit Plan",
    url: "https://docs.google.com/document/d/1r_zZQ1Y0IKYk-oRuifjxJHrra1I_sRmg/edit",
  },
];

function DocCard({ doc, index, lang }: { doc: typeof DOCUMENTS[0]; index: number; lang: "az" | "en" }) {
  const [expanded, setExpanded] = useState(false);
  const title = lang === "az" ? doc.titleAz : doc.titleEn;
  const embedUrl = getEmbedUrl(doc.url);
  const isFolderLink = doc.url.includes("drive.google.com/open") || doc.url.includes("drive.google.com/drive");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="bg-white/80 dark:bg-[#0d1b3e]/80 backdrop-blur-xl rounded-[2rem] border-2 border-[#1a2355]/5 dark:border-white/5 overflow-hidden shadow-lg hover:border-[#ee7c7e]/20 transition-all duration-300"
    >
      <div className="flex items-center gap-4 px-6 py-4">
        <div className="w-10 h-10 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0">
          <DescriptionIcon sx={{ fontSize: 20 }} className="text-[#ee7c7e]" />
        </div>
        <span className="flex-1 font-bold text-[#1a2355] dark:text-white text-sm leading-snug">
          {title}
        </span>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 flex items-center justify-center text-[#1a2355]/50 dark:text-white/50 hover:bg-[#ee7c7e] hover:text-white transition-all duration-200"
            title={lang === "az" ? "Yeni sekmədə aç" : "Open in new tab"}
          >
            <OpenInNewIcon sx={{ fontSize: 16 }} />
          </a>
          {!isFolderLink && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="w-8 h-8 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 flex items-center justify-center text-[#1a2355]/50 dark:text-white/50 hover:bg-[#1a2355] hover:text-white transition-all duration-200"
              title={expanded ? (lang === "az" ? "Bağla" : "Close") : (lang === "az" ? "Önizləmə" : "Preview")}
            >
              <ExpandMoreIcon
                sx={{ fontSize: 18 }}
                className={`transition-transform duration-300 ${expanded ? "rotate-180" : ""}`}
              />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && !isFolderLink && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 600 }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden bg-gray-50 dark:bg-[#050d20]"
          >
            <iframe
              src={embedUrl}
              className="w-full h-[600px] border-0"
              loading="lazy"
              title={title}
              allow="autoplay"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SenedlerPage() {
  const { lang } = useLanguage();

  const copy = {
    az: {
      eyebrow: "Keyfiyyətin Təminatı",
      title: "Sənədlər",
      description: "Keyfiyyətin Təminatı Şöbəsinin fəaliyyətini tənzimləyən əsasnamə, siyasət və prosedur sənədləri.",
      breadcrumb: "Sənədlər",
      count: "sənəd",
    },
    en: {
      eyebrow: "Quality Assurance",
      title: "Documents",
      description: "Regulations, policies, and procedural documents governing the activities of the Quality Assurance Department.",
      breadcrumb: "Documents",
      count: "documents",
    },
  }[lang];

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
          { label: lang === "az" ? "KTŞ" : "QA", href: `/${lang}/${lang === "az" ? "kts" : "qa"}` },
          { label: copy.breadcrumb },
        ]}
        eyebrow={copy.eyebrow}
      />

      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 -mt-16">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-8 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_12px_rgba(238,124,126,0.4)]" />
              <span className="text-sm font-black text-[#1a2355]/50 dark:text-white/40 uppercase tracking-widest">
                {DOCUMENTS.length} {copy.count}
              </span>
            </div>
            {DOCUMENTS.map((doc, idx) => (
              <DocCard key={idx} doc={doc} index={idx} lang={lang} />
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
