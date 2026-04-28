"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import KtsSidebar from "@/components/kts/KtsSidebar";
import { useLanguage } from "@/context/LanguageContext";
import PollIcon from "@mui/icons-material/Poll";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import AssessmentIcon from "@mui/icons-material/Assessment";

const SURVEYS = {
  az: [
    {
      title: "Sorğu nəticələrinin icra vəziyyətinin monitorinqi",
      description: "Sorğu nəticələrinin icrası və məmnuniyyətin ölçülməsi üzrə monitorinq sənədi",
      surveyUrl: null,
      reportUrl: null,
    },
    {
      title: "Ümumi tələbə məmnunluq sorğusu",
      description: "Ümumi tələbə məmnunluq səviyyəsini ölçən sorğu",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
    {
      title: "Əcnəbi tələbələrlə sorğu",
      description: "Xarici tələbələrin universitetdəki təcrübəsini qiymətləndirən sorğu",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
    {
      title: "I kurs tələbə məmnunluq sorğusu",
      description: "Birinci kurs tələbələrinin ilk il təcrübəsini ölçən sorğu",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
    {
      title: "AzTU məzunlarının əmək bazarındakı performansının qiymətləndirilməsi",
      description: "Məzunların iş bazarındakı fəaliyyətini izləyən sorğu",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
    {
      title: "Akademik heyətin məmnuniyyət sorğusu",
      description: "Müəllim və akademik heyətin iş məmnuniyyətini ölçən sorğu",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
    {
      title: "Xarici dilin tədrisinin qiymətləndirilməsi",
      description: "Xarici dil dərslərinin keyfiyyətini qiymətləndirən sorğu",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
    {
      title: "İnzibati heyətin məmnunluq sorğusu",
      description: "İnzibati işçilərin iş şəraitindən məmnuniyyətini ölçən sorğu",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
    {
      title: "Məzun sorğusu 2025",
      description: "2025-ci il üçün məzun geri bildiriş sorğusu",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
    {
      title: "Tələbələrin demoqrafik göstəriciləri ilə bağlı sorğu",
      description: "Tələbə populyasiyasının demoqrafik xüsusiyyətlərini müəyyən edən sorğu",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
  ],
  en: [
    {
      title: "Monitoring of Survey Results Implementation",
      description: "Document monitoring the implementation of survey results and satisfaction measurement",
      surveyUrl: null,
      reportUrl: null,
    },
    {
      title: "General Student Satisfaction Survey",
      description: "Survey measuring the overall student satisfaction level",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
    {
      title: "International Students Survey",
      description: "Survey evaluating the university experience of international students",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
    {
      title: "First-Year Student Satisfaction Survey",
      description: "Survey measuring first-year students' experience in their inaugural year",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
    {
      title: "Graduate Job Market Performance Assessment",
      description: "Survey tracking graduates' performance in the labor market",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
    {
      title: "Academic Staff Satisfaction Survey",
      description: "Survey measuring faculty and academic staff job satisfaction",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
    {
      title: "Foreign Language Instruction Assessment",
      description: "Survey assessing the quality of foreign language courses",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
    {
      title: "Administrative Staff Satisfaction Survey",
      description: "Survey measuring administrative employees' satisfaction with working conditions",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
    {
      title: "Graduate Survey 2025",
      description: "Graduate feedback survey for the year 2025",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
    {
      title: "Student Demographic Data Survey",
      description: "Survey identifying demographic characteristics of the student population",
      surveyUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
      reportUrl: "https://www.aztu.edu.az/sub_site/az/quality-assurance-114/page/sorgular-894",
    },
  ],
};

export default function SorgularPage() {
  const { lang } = useLanguage();
  const surveys = SURVEYS[lang];

  const copy = {
    az: {
      eyebrow: "Keyfiyyətin Təminatı",
      title: "Sorğular",
      description: "Tələbə, məzun, akademik və inzibati heyətin məmnuniyyətini ölçən sorğular.",
      breadcrumb: "Sorğular",
      viewReport: "Hesabata bax",
      takeSurvey: "Sorğuya qoşul",
    },
    en: {
      eyebrow: "Quality Assurance",
      title: "Surveys",
      description: "Surveys measuring satisfaction among students, graduates, academic and administrative staff.",
      breadcrumb: "Surveys",
      viewReport: "View Report",
      takeSurvey: "Take Survey",
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
          { label: lang === "az" ? "QA" : "QA", href: `/${lang}/${lang === "az" ? "kts" : "qa"}` },
          { label: copy.breadcrumb },
        ]}
        eyebrow={copy.eyebrow}
      />

      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 -mt-16">
          <div className="lg:col-span-8 space-y-5">
            {surveys.map((survey, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="bg-white/80 dark:bg-[#0d1b3e]/80 backdrop-blur-xl rounded-[2rem] border-2 border-[#1a2355]/5 dark:border-white/5 p-6 shadow-lg hover:border-[#ee7c7e]/25 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/3 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform pointer-events-none" />
                <div className="flex items-start gap-5 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-[#1a2355]/5 dark:bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-[#ee7c7e]/10 transition-colors duration-300">
                    <PollIcon sx={{ fontSize: 24 }} className="text-[#ee7c7e]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div>
                        <span className="text-[10px] font-black text-[#ee7c7e] uppercase tracking-[0.2em] mb-1 block">
                          #{idx + 1}
                        </span>
                        <h3 className="font-black text-[#1a2355] dark:text-white text-base leading-snug mb-2">
                          {survey.title}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                          {survey.description}
                        </p>
                      </div>
                      {(survey.reportUrl || survey.surveyUrl) && (
                        <div className="flex items-center gap-2 shrink-0 flex-wrap">
                          {survey.reportUrl && (
                            <a
                              href={survey.reportUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 text-[#1a2355] dark:text-white text-xs font-bold hover:bg-[#1a2355] hover:text-white transition-all duration-200"
                            >
                              <AssessmentIcon sx={{ fontSize: 14 }} />
                              {copy.viewReport}
                            </a>
                          )}
                          {survey.surveyUrl && (
                            <a
                              href={survey.surveyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#ee7c7e] text-white text-xs font-bold hover:bg-[#ee7c7e]/80 transition-all duration-200"
                            >
                              <OpenInNewIcon sx={{ fontSize: 14 }} />
                              {copy.takeSurvey}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
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
