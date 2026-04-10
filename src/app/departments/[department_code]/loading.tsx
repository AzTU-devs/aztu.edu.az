import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function DepartmentDetailLoading() {
  return (
    <>
      <main className="min-h-screen bg-gray-50 dark:bg-slate-900">
        {/* Page Banner */}
        <div className="bg-[#1a2355] px-4 md:px-10 lg:px-20 pt-40 pb-16 animate-pulse">
          <nav className="flex items-center gap-1.5 text-white/40 text-xs mb-6">
            <div className="w-16 h-3 bg-white/20 rounded" />
            <ChevronRightIcon sx={{ fontSize: 13 }} />
            <div className="w-16 h-3 bg-white/20 rounded" />
            <ChevronRightIcon sx={{ fontSize: 13 }} />
            <div className="w-24 h-3 bg-white/20 rounded" />
          </nav>
          <div className="h-10 w-3/4 bg-white/20 rounded mb-4" />
        </div>

        {/* Content Skeleton */}
        <div className="px-4 md:px-10 lg:px-20 py-12">
          <div className="max-w-7xl mx-auto space-y-12 animate-pulse">
            <div className="h-64 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="h-48 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8" />
              <div className="h-48 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8" />
            </div>
            <div className="h-96 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-8" />
          </div>
        </div>
      </main>
      </>
  );
}
