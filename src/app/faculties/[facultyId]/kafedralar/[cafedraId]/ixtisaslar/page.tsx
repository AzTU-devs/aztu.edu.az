"use client";

import SectionBlock from "@/components/shared/SectionBlock";
import SchoolIcon from "@mui/icons-material/School";
import { CafedraSpecialization } from "@/types/cafedra";

const specializations: CafedraSpecialization[] = [
  {
    id: 1,
    name: "Kafedra ixtisası 1",
    code: "050XXX",
    degree: "bachelor",
    duration_years: 4,
    description: "İxtisas haqqında ümumi məlumat.",
  },
  {
    id: 2,
    name: "Kafedra ixtisası 2",
    code: "060XXX",
    degree: "master",
    duration_years: 2,
    description: "Magistr proqramı haqqında məlumat.",
  },
];

const degreeLabel: Record<string, string> = {
  bachelor: "Bakalavr",
  master: "Magistr",
  phd: "Doktorantura",
};

const degreeBadgeColor: Record<string, string> = {
  bachelor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
  master: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
  phd: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
};

export default function CafedraIxtisaslarPage() {
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
      {Object.entries(grouped).map(([degree, specs]) => (
        <SectionBlock key={degree} title={`${degreeLabel[degree]} ixtisasları`} accent>
          <div className="space-y-3">
            {specs.map((spec) => (
              <div
                key={spec.id}
                className="flex items-start gap-4 bg-gray-50 dark:bg-slate-700/40 rounded-xl p-4 border border-gray-100 dark:border-slate-600"
              >
                <div className="w-10 h-10 rounded-xl bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center flex-shrink-0">
                  <SchoolIcon sx={{ fontSize: 20, color: "#1a2355" }} />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="font-bold text-[#1a2355] dark:text-white text-sm">
                      {spec.name}
                    </span>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${degreeBadgeColor[spec.degree]}`}
                    >
                      {degreeLabel[spec.degree]}
                    </span>
                    {spec.code && (
                      <span className="text-xs text-gray-400 dark:text-slate-500 font-mono">
                        {spec.code}
                      </span>
                    )}
                  </div>
                  {spec.description && (
                    <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
                      {spec.description}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">
                    Müddəti: {spec.duration_years} il
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>
      ))}
    </div>
  );
}
