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
  // Google Drive open?id= (file shared via "open" link)
  const openMatch = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
  if (openMatch) return `https://drive.google.com/file/d/${openMatch[1]}/preview`;
  // Google Docs
  const docsMatch = url.match(/docs\.google\.com\/document\/d\/([^/]+)/);
  if (docsMatch) return `https://docs.google.com/document/d/${docsMatch[1]}/preview`;
  // Google Sheets
  const sheetsMatch = url.match(/docs\.google\.com\/spreadsheets\/d\/([^/]+)/);
  if (sheetsMatch) return `https://docs.google.com/spreadsheets/d/${sheetsMatch[1]}/htmlview`;
  // Google Drive folder
  if (url.includes("drive.google.com/drive")) return url;
  return url;
}

const DOCUMENTS = [
  {
    titleAz: "Keyfiyyətin Təminatı şöbəsinin Əsasnaməsi",
    titleEn: "Statute of the Quality Assurance Department",
    urlAz: "https://drive.google.com/file/d/1F3LTa7sA4r6Qw5o31Ir1gF1fu4OLknJn/view?usp=sharing",
    urlEn: "https://drive.google.com/file/d/1gfhM6YWmApJyYm4735mlaJOJa99UXX-P/view?usp=sharing",
  },
  {
    titleAz: "Keyfiyyət Təminatı Siyasəti",
    titleEn: "Quality Assurance Policy",
    urlAz: "https://drive.google.com/file/d/1i_yFVqCjRS1bvEMYIK-5-QN-E0C14Qyu/view?usp=sharing",
    urlEn: "https://drive.google.com/file/d/175ji-fV4JDoV5svo7CEgjPVLO8HA7tqq/view?usp=sharing",
  },
  {
    titleAz: "Keyfiyyət Təminatı Bələdçisi",
    titleEn: "Quality Assurance Guideline Book",
    urlAz: "https://drive.google.com/file/d/10nd-_mm6ZcKWEUiO95nrJcfgptCbk_f8/view?usp=sharing",
    urlEn: "https://drive.google.com/file/d/1Pw8dPAuwlMi0vyhBn3tPv2Eb1JrOK8jf/view?usp=sharing",
  },
  {
    titleAz: "Azərbaycan Texniki Universitetində Daxili Qiymətləndirmə və Özünüqiymətləndirmə Mexanizmləri",
    titleEn: "Internal Evaluation and Self-Assessment Mechanisms at Azerbaijan Technical University",
    urlAz: "https://drive.google.com/file/d/1w38z-p0IvWUoQGvcL3DG4-RUNg0b014C/view?usp=sharing",
    urlEn: "https://drive.google.com/file/d/11SE586a4d4KesjHjWtfmT1gsg41bo9Q5/view?usp=sharing",
  },
  {
    titleAz: "ISO və digər keyfiyyət standartlarına uyğunluq prosedurları",
    titleEn: "Procedures for Compliance with ISO and Other Quality Standards",
    urlAz: "https://docs.google.com/document/d/1NnCSd7tqjlXuve6oYDajatmx5AHsrR9a/edit",
    urlEn: "https://drive.google.com/file/d/12_XVDR0ujfMPaNTn1ek2UopXrzdFys6n/view?usp=sharing",
  },
  {
    titleAz: "Məmnuniyyət Ölçülməsi və Keyfiyyətin İnkişafı Üçün Sorğu Metodologiya Sənədi",
    titleEn: "Survey Methodology for Measuring Satisfaction and Enhancing Quality",
    urlAz: "https://docs.google.com/document/d/11-z86YYwhufZCzY8XpLQHWrN1aMtlVn4/edit",
    urlEn: "https://drive.google.com/file/d/1xoUojwevxb2Q73A0vDYKtsenbsSNWqdN/view?usp=sharing",
  },
  {
    titleAz: "Akademik Mükəmməllik və Keyfiyyətin Artırılması Qaydaları",
    titleEn: "Academic Performance and Quality Enhancement Mechanisms",
    urlAz: "https://docs.google.com/document/d/1kIAQS7-h0mvk3erks7awz4RaFqlvbmiP/edit",
    urlEn: "https://drive.google.com/file/d/1EvE57lpUJyOWXxQ9j_mO1Bp0I_Nb97_N/view?usp=sharing",
  },
  {
    titleAz: "Tədris Proqramlarının Akkreditasiyası və Yenilənməsi Qaydaları",
    titleEn: "Accreditation and Renewal Guidelines for Educational Programs",
    urlAz: "https://drive.google.com/file/d/1LNS-K9XMGGyKypD0kFu3AAWVmPHlB1ll/view?usp=sharing",
    urlEn: "https://drive.google.com/file/d/14nEM2SNKeWGafeaocNAnS_IWqKuRLYrU/view?usp=sharing",
  },
  {
    titleAz: "Azərbaycan Texniki Universitetində təhsilalanların Qiymətləndirilməsi və İmtahanların təşkili Qaydaları",
    titleEn: "Students' Assessment and Exam Organization Regulations",
    urlAz: "https://drive.google.com/file/d/1RBnk3DyUzEpr4nxS0XPPEZ1bayHH0fTh/view?usp=drive_link",
    urlEn: "https://drive.google.com/file/d/1I9Ret5O1XuKv1nOn7s814JPo-okFd50y/view?usp=drive_link",
  },
  {
    titleAz: "KTŞ Fəaliyyət Planı",
    titleEn: "QA Department Activity Plan",
    urlAz: "https://docs.google.com/spreadsheets/d/1F3hWcYDHn0rbKCbhWF0Tu3xY21M-1gtB/edit",
    urlEn: "",
  },
  {
    titleAz: "CDIO Yanaşmasının Tətbiqi və Nəzarət Mexanizmləri",
    titleEn: "Implementation and Control Mechanisms of the CDIO Approach",
    urlAz: "https://docs.google.com/document/d/1z6ljrzuKYwJx_E7sqbLQRP5xh--2J3Bv/edit",
    urlEn: "https://drive.google.com/file/d/1dSY7Cl-aG6o_gGF5YUOJ3CVYVbpmOyfY/view?usp=sharing",
  },
  {
    titleAz: "AzTU Süni intellekt",
    titleEn: "Policy document on the application of Artificial Intelligence",
    urlAz: "https://docs.google.com/document/d/1zf1An_Qfb2vENkfQrjfg9gGYX7yqKFjV/edit",
    urlEn: "https://drive.google.com/file/d/1cw-Q8YR0KxTBGGKrmWNqOi6AZuyfj28g/view?usp=sharing",
  },
  {
    titleAz: "Keyfiyyət mədəniyyəti",
    titleEn: "Quality culture",
    urlAz: "https://docs.google.com/document/d/1_WE-Bc5M18ytzBuMp9nyqSzsa1lYetz3/edit",
    urlEn: "https://drive.google.com/file/d/1TEzRjrAZkSlbEwzmmJbmBT7yNyWzQQxj/view?usp=sharing",
  },
  {
    titleAz: "AzTU Struktur bölmələr və onların rəhbərləri",
    titleEn: "AzTU Structural Units and Their Heads",
    urlAz: "https://drive.google.com/open?id=1I3sVyRG2DFrb2mG-9IggkyE2cn0sawhf",
    urlEn: "https://drive.google.com/file/d/1TfBxjZI7mdOPYqKUAWf9Ey9CjAYEs9pZ/view",
  },
  {
    titleAz: "KTŞ Struktur sənədi",
    titleEn: "Quality Assurance Governance of Azerbaijan Technical University",
    urlAz: "https://docs.google.com/document/d/1hzu4rmOxTdkGalUZ37gIiHW9pL32kZYv/edit",
    urlEn: "https://drive.google.com/file/d/1dpgeuHDfxb2zVtjaz_Pqf-cA8PqTdIbS/view?usp=sharing",
  },
  {
    titleAz: "Audit planı",
    titleEn: "Audit Plan",
    urlAz: "https://docs.google.com/document/d/1-O46w0GSGrifJYb10xiof-qsudpmHnYV/edit",
    urlEn: "",
  },
  {
    titleAz: "Audit uyğunsuzluq aktı",
    titleEn: "Audit Non-conformity Report",
    urlAz: "https://docs.google.com/document/d/1w5NgaVqZFZGe776pTZmSoBE6Du5qIbd_/edit",
    urlEn: "",
  },
  {
    titleAz: "Audit razılaşdırma sənədi",
    titleEn: "Audit Agreement Document",
    urlAz: "https://docs.google.com/document/d/1r_zZQ1Y0IKYk-oRuifjxJHrra1I_sRmg/edit",
    urlEn: "",
  },
  {
    titleAz: "Audit siyasəti sənədi",
    titleEn: "Audit Policy Document",
    urlAz: "https://docs.google.com/document/d/1r_zZQ1Y0IKYk-oRuifjxJHrra1I_sRmg/edit",
    urlEn: "",
  },
  {
    titleAz: "AzTU-da Tələbə Dəstəyi və Xidmətlərin Keyfiyyətinin Yoxlanılması Mexanizmi",
    titleEn: "Mechanism for Checking the Quality of Student Support and Services at AzTU",
    urlAz: "https://docs.google.com/document/d/1_yCrw5BnfWe3oD9wLHx7SvjkFD-wBPFQ/edit",
    urlEn: "",
  },
  {
    titleAz: "AzTU Keyfiyyətin Təminatı və Tədris-Öyrənmə Mərkəzinin 2022–2024-cü illər üzrə fəaliyyəti",
    titleEn: "The Activities of the Quality Assurance and Teaching–Learning Center of Azerbaijan Technical University for the Years 2022–2024",
    urlAz: "",
    urlEn: "https://drive.google.com/file/d/1CWpdqSrP4gEXNMlDJCUts5u1oKaZQVtj/view?usp=sharing",
  },
  {
    titleAz: "AzTU-da tədris olunan fənlərin proqram və tədris materiallarının mövcud vəziyyətinin təhlili üzrə HESABAT",
    titleEn: "REPORT on the analysis of the current state of the programs and teaching materials of the subjects taught at AZTU",
    urlAz: "",
    urlEn: "https://drive.google.com/file/d/1SClk5FLo2BnRjbV4C6QxBpQt3vo2snx1/view?usp=sharing",
  },
  {
    titleAz: "Azərbaycan Texniki Universitetinin veb-saytının mövcud vəziyyətinin monitorinqi",
    titleEn: "Monitoring of the Current State of the Website of Azerbaijan Technical University",
    urlAz: "",
    urlEn: "https://drive.google.com/file/d/1PIOezYkkk_8FvdyZTVSX89r64K9-NISE/view?usp=sharing",
  },
  {
    titleAz: "Akkreditasiya qiymətləndirməsi nəticəsində yekun hesabatda Akkreditasiya Komissiyasının verdiyi tövsiyə və tapşırıqların icra vəziyyətinin monitorinqi",
    titleEn: "Monitoring the Implementation Status of the Recommendations and Instructions Provided by the Accreditation Commission in the Final Report as a Result of the Accreditation Evaluation",
    urlAz: "",
    urlEn: "https://drive.google.com/file/d/1T5FgYZt_jGQWeLX-oY3QWbCUSSOr8EoZ/view?usp=sharing",
  },
  {
    titleAz: "I kurs Tələbə sorğu hesabatı payız 2026",
    titleEn: "First-year Student Survey Report, Autumn 2026",
    urlAz: "https://drive.google.com/open?id=1iE-Nz4k7B50b_oSN9NEsOHqSP6JN8msy",
    urlEn: "https://drive.google.com/open?id=1iE-Nz4k7B50b_oSN9NEsOHqSP6JN8msy",
  },
  {
    titleAz: "Ümumi Tələbə Məmnuniyyəti Sorğu Hesabatı",
    titleEn: "General Student Satisfaction Survey Report",
    urlAz: "",
    urlEn: "https://docs.google.com/document/d/1ncCfvLGxXCp_y5A5EYWbueIDVoW5NHvU/edit",
  },
  {
    titleAz: "Beynəlxalq Tələbələrin Sorğusu üzrə Hesabat",
    titleEn: "REPORT ON THE SURVEY OF INTERNATIONAL STUDENTS",
    urlAz: "",
    urlEn: "https://docs.google.com/document/d/12wZlY8JjavUHbzD17l150UglCi4IZyP_/edit",
  },
];

function DocCard({ doc, index, lang }: { doc: typeof DOCUMENTS[0]; index: number; lang: "az" | "en" }) {
  const [expanded, setExpanded] = useState(false);
  const title = lang === "az" ? doc.titleAz : doc.titleEn;
  // Use the document in the active language, falling back to the other language when missing.
  const url = lang === "az" ? (doc.urlAz || doc.urlEn) : (doc.urlEn || doc.urlAz);
  const embedUrl = getEmbedUrl(url);
  const isFolderLink = url.includes("drive.google.com/drive");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="bg-white/80 dark:bg-[#0d1b3e]/80 backdrop-blur-xl rounded-[1.5rem] border-2 border-[#1a2355]/30 dark:border-white/5 overflow-hidden shadow-lg hover:border-[#ee7c7e]/20 transition-all duration-300"
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
            href={url}
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
