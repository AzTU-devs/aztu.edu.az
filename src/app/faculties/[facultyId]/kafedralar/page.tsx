"use client";

import { use } from "react";
import Link from "next/link";
import { getCafedrasByFacultyId } from "@/data/staticFaculties";
import SectionBlock from "@/components/shared/SectionBlock";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Props {
  params: Promise<{ facultyId: string }>;
}

export default function FacultyKafedralarPage({ params }: Props) {
  const { facultyId } = use(params);
  const cafedras = getCafedrasByFacultyId(Number(facultyId));

  return (
    <div className="space-y-6">
      <SectionBlock title="Kafedralar" accent>
        {cafedras.length === 0 && (
          <p className="text-center text-gray-400 dark:text-slate-500 py-12 text-sm">
            Bu fakültəyə aid kafedra tapılmadı.
          </p>
        )}

        {cafedras.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cafedras.map((c) => (
              <Link
                key={c.cafedra_id}
                href={`/faculties/${facultyId}/kafedralar/${c.cafedra_id}/giris`}
                className="group flex flex-col gap-3 bg-gray-50 dark:bg-slate-700/40 border border-gray-100 dark:border-slate-600 rounded-2xl p-5 hover:border-[#1a2355]/30 dark:hover:border-[#1a2355]/40 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center">
                    <MenuBookIcon sx={{ fontSize: 20, color: "#1a2355" }} />
                  </div>
                  {c.short_name && (
                    <span className="text-xs font-bold text-[#1a2355] dark:text-blue-300 bg-[#1a2355]/10 dark:bg-[#1a2355]/20 px-3 py-1 rounded-full">
                      {c.short_name}
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-[#1a2355] dark:text-white text-sm leading-snug">
                  {c.name}
                </h3>

                {c.description && (
                  <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {c.description}
                  </p>
                )}

                <div className="flex items-center gap-1 text-xs text-[#1a2355] dark:text-blue-400 font-semibold mt-auto">
                  Ətraflı bax
                  <ChevronRightIcon
                    sx={{ fontSize: 14 }}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}
      </SectionBlock>
    </div>
  );
}
