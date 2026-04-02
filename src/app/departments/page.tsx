import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import DepartmentCard from "@/components/department/DepartmentCard";
import { getDepartments } from "@/services/departmentService/departmentService";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Şöbələr | Azərbaycan Texniki Universiteti",
  description: "Azərbaycan Texniki Universitetinin bütün şöbələrinin siyahısı.",
};

export default async function DepartmentsPage() {
  const departments = await getDepartments({ start: 0, end: 50, lang: "az" });

  return (
    <>
      <HeaderChanger />
      <main className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
        {/* Page Banner with refined styling */}
        <div className="relative bg-[#1a2355] px-4 md:px-10 lg:px-20 pt-40 pb-20 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/10 rounded-full blur-2xl -ml-20 -mb-20 pointer-events-none" />

          <div className="relative z-10">
            <nav className="flex items-center gap-1.5 text-white/40 text-xs mb-8 flex-wrap uppercase tracking-widest font-bold">
              <Link href="/" className="hover:text-white transition-colors">Ana səhifə</Link>
              <ChevronRightIcon sx={{ fontSize: 13 }} />
              <span className="text-white/80">Şöbələr</span>
            </nav>
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                Universitet <br /> <span className="text-[#ee7c7e]">Şöbələri</span>
              </h1>
              <div className="w-20 h-1.5 bg-[#ee7c7e] rounded-full mb-8" />
              <p className="text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl font-medium">
                Azərbaycan Texniki Universitetinin inzibati və akademik idarəetməsini təmin edən bütün şöbələr barədə ətraflı məlumat.
              </p>
            </div>
          </div>
        </div>

        {/* Content with improved grid and spacing */}
        <section className="px-4 md:px-10 lg:px-20 py-16 lg:py-24 max-w-screen-2xl mx-auto">
          {departments === "ERROR" ? (
            <div className="text-center py-24 px-6 bg-red-50 dark:bg-red-950/20 rounded-3xl border border-red-100 dark:border-red-900/30">
              <h3 className="text-red-500 dark:text-red-400 font-bold text-xl mb-2">Xəta baş verdi</h3>
              <p className="text-red-400 dark:text-red-500/70">Zəhmət olmasa bir az sonra yenidən cəhd edin.</p>
            </div>
          ) : departments.length === 0 ? (
            <div className="text-center py-32 px-6 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm">
              <p className="text-gray-400 dark:text-slate-500 font-bold text-xl uppercase tracking-widest">
                Şöbə tapılmadı.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {departments.map((dept, i) => (
                <DepartmentCard key={dept.id} department={dept} index={i} />
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
