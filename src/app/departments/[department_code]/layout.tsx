import { use, Suspense } from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import DepartmentSidebar from "@/components/department/DepartmentSidebar";
import { getDepartmentByCode } from "@/services/departmentService/departmentService";
import type { Lang } from "@/util/apiClient";

interface Props {
  children: React.ReactNode;
  params: Promise<{ department_code: string }>;
}

export default async function DepartmentLayout({ children, params }: Props) {
  const { department_code } = await params;
  const cookieStore = await cookies();
  const lang = (cookieStore.get("aztu-lang")?.value as Lang) || "az";
  const department = await getDepartmentByCode(department_code, lang);

  if (!department) {
    return children;
  }

  return (
    <>
      <HeaderChanger />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
        {/* Banner with refined background */}
        <div className="relative bg-[#1a2355] px-4 md:px-10 lg:px-20 pt-44 pb-16 overflow-hidden">
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#ee7c7e]/10 rounded-full blur-3xl" />

          <div className="relative z-10 w-full">
            <nav className="flex items-center gap-2 text-white/40 text-[10px] md:text-xs mb-8 flex-wrap uppercase tracking-widest font-black">
              <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                <HomeIcon sx={{ fontSize: 14 }} />
                {lang === "az" ? "Ana səhifə" : "Home"}
              </Link>
              <ChevronRightIcon sx={{ fontSize: 12 }} />
              <Link href="/departments" className="hover:text-white transition-colors">
                {lang === "az" ? "Şöbələr" : "Departments"}
              </Link>
              <ChevronRightIcon sx={{ fontSize: 12 }} />
              <span className="text-white/90 truncate max-w-[200px]">
                {department.department_name}
              </span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-1 bg-[#ee7c7e] rounded-full" />
                   <span className="text-[#ee7c7e] font-black tracking-widest text-xs uppercase">{department.department_code}</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1]">
                  {department.department_name}
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Main layout with sticky sidebar and better spacing */}
        <div className="flex flex-col lg:flex-row px-4 md:px-10 lg:px-20 py-12 lg:py-20 gap-10 lg:gap-16 w-full">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-72 flex-shrink-0">
            <div className="sticky top-28">
              <DepartmentSidebar departmentCode={department_code} lang={lang} />
            </div>
          </aside>

          {/* Mobile view Sidebar (Quick access buttons) */}
          <div className="lg:hidden flex overflow-x-auto gap-3 pb-4 no-scrollbar -mx-4 px-4">
             <Link 
               href={`/departments/${department_code}/haqqimizda`}
               className="whitespace-nowrap px-6 py-3 rounded-2xl bg-white dark:bg-slate-800 text-[#1a2355] dark:text-white font-bold text-sm shadow-sm border border-gray-100 dark:border-slate-700"
             >
               {lang === "az" ? "Haqqımızda" : "About"}
             </Link>
             <Link 
               href={`/departments/${department_code}/rehberlik`}
               className="whitespace-nowrap px-6 py-3 rounded-2xl bg-white dark:bg-slate-800 text-[#1a2355] dark:text-white font-bold text-sm shadow-sm border border-gray-100 dark:border-slate-700"
             >
               {lang === "az" ? "Rəhbərlik" : "Director"}
             </Link>
             <Link 
               href={`/departments/${department_code}/emekdaslar`}
               className="whitespace-nowrap px-6 py-3 rounded-2xl bg-white dark:bg-slate-800 text-[#1a2355] dark:text-white font-bold text-sm shadow-sm border border-gray-100 dark:border-slate-700"
             >
               {lang === "az" ? "Əməkdaşlar" : "Workers"}
             </Link>
          </div>

          {/* Content area with improved typography */}
          <main className="flex-1 min-w-0">
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
               {children}
             </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}
