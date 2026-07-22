"use client";

import { use } from "react";
import Link from "next/link";
import { getCafedraEmployeeById } from "@/data/staticFaculties";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

interface Props {
  params: Promise<{ facultyId: string; cafedraId: string; employeeId: string }>;
}

export default function CafedraEmployeeDetailPage({ params }: Props) {
  const { facultyId, cafedraId, employeeId } = use(params);
  const employee = getCafedraEmployeeById(Number(employeeId));

  const backLink = (
    <Link
      href={`/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda/emekdaslar`}
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a2355] transition hover:text-[#ee7c7e] dark:text-white"
    >
      <ArrowBackIcon sx={{ fontSize: 16 }} />
      Əməkdaşlar siyahısına qayıt
    </Link>
  );

  if (!employee) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/10 dark:bg-[#101733]">
        <h1 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">Əməkdaş tapılmadı</h1>
        <p className="mb-5 text-sm text-slate-500 dark:text-slate-400">Bu əməkdaş haqqında məlumat mövcud deyil.</p>
        {backLink}
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {backLink}

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#101733] md:p-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:gap-8">
          <div className="h-32 w-32 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 dark:border-white/10 dark:bg-[#161f42]">
            {employee.photo_url ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={employee.photo_url} alt={employee.full_name} className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-full w-full items-center justify-center">
                <PersonIcon sx={{ fontSize: 56 }} className="text-slate-300 dark:text-slate-600" />
              </span>
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-xl font-bold leading-snug tracking-tight text-slate-900 dark:text-white">
              {employee.full_name}
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{employee.position}</p>
            {employee.academic_degree && (
              <p className="mt-0.5 text-sm font-medium text-[#ee7c7e]">{employee.academic_degree}</p>
            )}

            <div className="mt-4 flex flex-wrap gap-2.5">
              {employee.email && (
                <a
                  href={`mailto:${employee.email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-[#ee7c7e] hover:text-[#ee7c7e] dark:border-white/10 dark:text-white"
                >
                  <EmailIcon sx={{ fontSize: 16 }} />
                  {employee.email}
                </a>
              )}
              {employee.phone && (
                <a
                  href={`tel:${employee.phone}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:border-[#ee7c7e] hover:text-[#ee7c7e] dark:border-white/10 dark:text-white"
                >
                  <PhoneIcon sx={{ fontSize: 16 }} />
                  {employee.phone}
                </a>
              )}
            </div>
          </div>
        </div>

        {employee.bio && (
          <div className="mt-8 border-t border-slate-100 pt-6 dark:border-white/10">
            <h2 className="mb-3 text-[11px] font-semibold uppercase tracking-wider text-[#ee7c7e]">Haqqında</h2>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{employee.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}
