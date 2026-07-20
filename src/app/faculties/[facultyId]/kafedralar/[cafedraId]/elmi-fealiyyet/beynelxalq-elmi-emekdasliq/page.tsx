"use client";

import PublicIcon from "@mui/icons-material/Public";
import { FacultyPanel, EmptyState } from "@/components/faculty/ui";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import { useLanguage } from "@/context/LanguageContext";
import { useScientificActivity } from "@/context/ScientificActivityContext";

export default function BeynelxalqElmiEmekdasliqPage() {
  const { lang: currentLang } = useLanguage();
  const { data, loading } = useScientificActivity();

  const intro = data?.sections.international_cooperation.intro_html;

  return (
    <div className="space-y-8">
      <FacultyPanel
        title={currentLang === "az" ? "Beynəlxalq elmi əməkdaşlıq" : "International Scientific Cooperation"}
        eyebrow={currentLang === "az" ? "Elmi fəaliyyət" : "Scientific Activity"}
        icon={PublicIcon}
      >
        {loading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-6 animate-pulse rounded-xl bg-slate-100 dark:bg-white/5" />
            ))}
          </div>
        ) : intro ? (
          <SanitizedHtml
            html={intro}
            className="max-w-3xl text-sm leading-relaxed text-slate-600 dark:text-slate-300"
          />
        ) : (
          <EmptyState
            icon={PublicIcon}
            title={currentLang === "az" ? "Məlumat tapılmadı" : "No data found"}
            hint={
              currentLang === "az"
                ? "Beynəlxalq elmi əməkdaşlıq məlumatı hələ əlavə edilməyib."
                : "No international cooperation information has been added yet."
            }
          />
        )}
      </FacultyPanel>
    </div>
  );
}
