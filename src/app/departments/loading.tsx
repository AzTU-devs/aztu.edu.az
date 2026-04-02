import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import Link from "next/link";

export default function DepartmentsLoading() {
  return (
    <>
      <HeaderChanger />
      <main className="min-h-screen bg-gray-50 dark:bg-slate-900">
        {/* Page Banner */}
        <div className="bg-[#1a2355] px-4 md:px-10 lg:px-20 pt-40 pb-16 animate-pulse">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs mb-6">
            <div className="w-16 h-3 bg-white/20 rounded" />
            <ChevronRightIcon sx={{ fontSize: 13 }} />
            <div className="w-12 h-3 bg-white/20 rounded" />
          </nav>
          <div className="h-10 w-48 bg-white/20 rounded mb-4" />
          <div className="h-4 w-96 bg-white/20 rounded" />
        </div>

        {/* Content Skeleton */}
        <section className="px-4 md:px-10 lg:px-20 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 h-48"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-slate-700" />
                  <div className="w-16 h-6 rounded-full bg-gray-200 dark:bg-slate-700" />
                </div>
                <div className="h-6 w-3/4 bg-gray-200 dark:bg-slate-700 rounded mb-4" />
                <div className="mt-auto h-4 w-24 bg-gray-200 dark:bg-slate-700 rounded" />
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
