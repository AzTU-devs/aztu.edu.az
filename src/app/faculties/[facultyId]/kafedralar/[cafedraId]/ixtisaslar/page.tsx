"use client";

import SectionBlock from "@/components/shared/SectionBlock";
import SchoolIcon from "@mui/icons-material/School";
import { CafedraSpecialization } from "@/types/cafedra";
import { useLanguage } from "@/context/LanguageContext";

export default function CafedraIxtisaslarPage() {
  const { lang } = useLanguage();

  const specializations: CafedraSpecialization[] = [
    {
      id: 1,
      name: lang === "az" ? "Kafedra ixtisası 1" : "Department Specialization 1",
      code: "050XXX",
      degree: "bachelor",
      duration_years: 4,
      description: lang === "az" ? "İxtisas haqqında ümumi məlumat." : "General information about the specialization.",
    },
    {
      id: 2,
      name: lang === "az" ? "Kafedra ixtisası 2" : "Department Specialization 2",
      code: "060XXX",
      degree: "master",
      duration_years: 2,
      description: lang === "az" ? "Magistr proqramı haqqında məlumat." : "Information about the master's program.",
    },
  ];

  const degreeLabels: Record<string, string> = {
    bachelor: lang === "az" ? "Bakalavr" : "Bachelor",
    master: lang === "az" ? "Magistr" : "Master",
    phd: lang === "az" ? "Doktorantura" : "PhD",
  };

  const degreeBadgeColors: Record<string, string> = {
    bachelor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    master: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    phd: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
  };

  const grouped = specializations.reduce<Record<string, CafedraSpecialization[]>>(
    (acc, s) => {
      if (!acc[s.degree]) acc[s.degree] = [];
      acc[s.degree].push(s);
      return acc;
    },
    {}
  );

  return (
    <div className="space-y-6">
      {Object.entries(grouped).length === 0 ? (
        <SectionBlock accent>
            <div className="text-center py-10">
                <p className="text-gray-500">{lang === "az" ? "Məlumat tapılmadı" : "No information found"}</p>
            </div>
        </SectionBlock>
      ) : (
        Object.entries(grouped).map(([degree, specs]) => (
          <SectionBlock key={degree} title={`${degreeLabels[degree]} ${lang === "az" ? "ixtisasları" : "specializations"}`} accent>
            <div className="space-y-4">
              {specs.map((spec) => (
                <div
                  key={spec.id}
                  className="flex items-start gap-4 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl p-5 hover:border-[#ee7c7e] hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1a2355]/5 dark:bg-[#1a2355]/20 flex items-center justify-center flex-shrink-0 text-[#1a2355] dark:text-blue-400 group-hover:bg-[#ee7c7e]/10 group-hover:text-[#ee7c7e] transition-colors">
                    <SchoolIcon sx={{ fontSize: 24 }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h4 className="font-bold text-[#1a2355] dark:text-white text-base">
                        {spec.name}
                      </h4>
                      <span
                        className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${degreeBadgeColors[spec.degree]}`}
                      >
                        {degreeLabels[spec.degree]}
                      </span>
                      {spec.code && (
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-slate-500 bg-gray-50 dark:bg-slate-700/50 px-2 py-1 rounded-lg">
                          {spec.code}
                        </span>
                      )}
                    </div>
                    {spec.description && (
                      <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed mb-2">
                        {spec.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e]" />
                        {lang === "az" ? "Müddəti" : "Duration"}: {spec.duration_years} {lang === "az" ? "il" : "years"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionBlock>
        ))
      )}
    </div>
  );
}
