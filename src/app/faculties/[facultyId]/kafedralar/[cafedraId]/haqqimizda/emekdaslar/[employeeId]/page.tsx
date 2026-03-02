"use client";

import { use } from "react";
import Link from "next/link";
import { getCafedraEmployeeById } from "@/data/staticFaculties";
import SectionBlock from "@/components/shared/SectionBlock";
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

  if (!employee) {
    return (
      <div className="space-y-6">
        <SectionBlock title="Əməkdaş tapılmadı" accent>
          <p className="text-sm text-gray-500 dark:text-slate-400">
            Bu əməkdaş haqqında məlumat mövcud deyil.
          </p>
          <Link
            href={`/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda/emekdaslar`}
            className="inline-flex items-center gap-1.5 mt-4 text-sm text-[#1a2355] dark:text-blue-400 hover:underline font-medium"
          >
            <ArrowBackIcon sx={{ fontSize: 16 }} />
            Əməkdaşlar siyahısına qayıt
          </Link>
        </SectionBlock>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SectionBlock accent>
        <Link
          href={`/faculties/${facultyId}/kafedralar/${cafedraId}/haqqimizda/emekdaslar`}
          className="inline-flex items-center gap-1.5 mb-6 text-sm text-[#1a2355] dark:text-blue-400 hover:underline font-medium"
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          Əməkdaşlar siyahısına qayıt
        </Link>

        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Photo */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <div className="w-36 h-36 rounded-2xl bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center overflow-hidden">
              {employee.photo_url ? (
                <img
                  src={employee.photo_url}
                  alt={employee.full_name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <PersonIcon sx={{ fontSize: 64, color: "#1a2355" }} />
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-3">
            <div>
              <h1 className="text-xl font-bold text-[#1a2355] dark:text-white leading-snug">
                {employee.full_name}
              </h1>
              <p className="text-sm text-gray-600 dark:text-slate-300 mt-1">
                {employee.position}
              </p>
              {employee.academic_degree && (
                <p className="text-sm text-[#ee7c7e] font-medium mt-0.5">
                  {employee.academic_degree}
                </p>
              )}
            </div>

            {/* Contact */}
            <div className="flex flex-wrap gap-4 pt-2">
              {employee.email && (
                <a
                  href={`mailto:${employee.email}`}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300 hover:text-[#1a2355] dark:hover:text-white transition-colors"
                >
                  <EmailIcon sx={{ fontSize: 18, color: "#1a2355" }} />
                  {employee.email}
                </a>
              )}
              {employee.phone && (
                <a
                  href={`tel:${employee.phone}`}
                  className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-300 hover:text-[#1a2355] dark:hover:text-white transition-colors"
                >
                  <PhoneIcon sx={{ fontSize: 18, color: "#1a2355" }} />
                  {employee.phone}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        {employee.bio && (
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-slate-700">
            <h2 className="text-sm font-bold text-[#1a2355] dark:text-white mb-3 uppercase tracking-wide">
              Haqqında
            </h2>
            <p className="text-sm text-gray-600 dark:text-slate-300 leading-relaxed">
              {employee.bio}
            </p>
          </div>
        )}
      </SectionBlock>
    </div>
  );
}
