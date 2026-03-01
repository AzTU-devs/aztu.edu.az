"use client";

import Link from "next/link";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import { STATIC_FACULTIES, getCafedrasByFacultyId } from "@/data/staticFaculties";
import SchoolIcon from "@mui/icons-material/School";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuBookIcon from "@mui/icons-material/MenuBook";

export default function FacultiesPage() {
  return (
    <>
      <HeaderChanger />
      <main className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
        {/* Page Banner */}
        <div className="bg-[#1a2355] px-4 md:px-10 lg:px-20 pt-40 pb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Fakültələr
          </h1>
          <p className="text-white/70 text-base max-w-xl">
            Azərbaycan Texniki Universitetinin akademik fakültələri ilə tanış olun.
          </p>
        </div>

        {/* Content */}
        <section className="px-4 md:px-10 lg:px-20 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STATIC_FACULTIES.filter((f) => f.is_active).map((faculty) => {
              const cafedraCount = getCafedrasByFacultyId(faculty.faculty_id).length;
              return (
                <Link
                  key={faculty.faculty_id}
                  href={`/faculties/${faculty.faculty_id}/haqqimizda`}
                  className="group bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center">
                      <SchoolIcon sx={{ color: "#1a2355" }} />
                    </div>
                    {faculty.short_name && (
                      <span className="text-xs font-bold text-[#1a2355] dark:text-blue-300 bg-[#1a2355]/10 dark:bg-[#1a2355]/20 px-3 py-1 rounded-full">
                        {faculty.short_name}
                      </span>
                    )}
                  </div>

                  {/* Name */}
                  <h2 className="text-[#1a2355] dark:text-white font-bold text-base leading-snug">
                    {faculty.name}
                  </h2>

                  {/* Description */}
                  {faculty.description && (
                    <p className="text-gray-500 dark:text-slate-400 text-sm flex-1 line-clamp-3 leading-relaxed">
                      {faculty.description}
                    </p>
                  )}

                  {/* Cafedra count */}
                  {cafedraCount > 0 && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-400 dark:text-slate-500">
                      <MenuBookIcon sx={{ fontSize: 14 }} />
                      {cafedraCount} kafedra
                    </div>
                  )}

                  {/* CTA */}
                  <div className="group/btn flex items-center gap-1 text-[#1a2355] dark:text-blue-400 font-semibold text-sm mt-auto w-fit">
                    Ətraflı bax
                    <ChevronRightIcon
                      sx={{ fontSize: 18 }}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
