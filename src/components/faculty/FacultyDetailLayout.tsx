"use client";

import { use, useState } from "react";
import Link from "next/link";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import FacultySidebar from "@/components/faculty/FacultySidebar";
import { getFacultyById } from "@/data/staticFaculties";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  children: React.ReactNode;
  params: Promise<{ facultyId: string }>;
}

export default function FacultyDetailLayout({ children, params }: Props) {
  const { facultyId } = use(params);
  const faculty = getFacultyById(Number(facultyId));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <HeaderChanger />
      <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors">
        {/* ── Banner ── */}
        <div className="bg-[#1a2355] px-4 md:px-10 lg:px-20 pt-40 pb-12">
          <nav className="flex items-center gap-1.5 text-white/50 text-sm mb-4 flex-wrap">
            <Link
              href="/"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <HomeIcon sx={{ fontSize: 15 }} />
              Ana səhifə
            </Link>
            <ChevronRightIcon sx={{ fontSize: 14 }} />
            <Link href="/faculties" className="hover:text-white transition-colors">
              Fakültələr
            </Link>
            <ChevronRightIcon sx={{ fontSize: 14 }} />
            <span className="text-white/80 truncate max-w-[200px]">
              {faculty?.name ?? "Fakültə"}
            </span>
          </nav>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 leading-tight">
            {faculty?.name ?? "Fakültə"}
          </h1>
          {faculty?.short_name && (
            <span className="inline-block mt-2 text-sm font-semibold bg-white/10 text-white/90 px-4 py-1 rounded-full border border-white/20">
              {faculty.short_name}
            </span>
          )}
        </div>

        {/* ── Mobile sidebar toggle ── */}
        <div className="lg:hidden px-4 md:px-10 py-3 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-between">
          <span className="text-sm font-semibold text-[#1a2355] dark:text-white">
            Naviqasiya
          </span>
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? (
              <CloseIcon sx={{ color: "#1a2355" }} />
            ) : (
              <MenuIcon sx={{ color: "#1a2355" }} />
            )}
          </button>
        </div>

        {/* ── Mobile sidebar overlay ── */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 z-40 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          >
            <div
              className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-slate-800 overflow-y-auto pt-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-4 pb-4">
                <FacultySidebar facultyId={facultyId} />
              </div>
            </div>
          </div>
        )}

        {/* ── Main layout ── */}
        <div className="flex flex-col lg:flex-row px-4 md:px-10 lg:px-20 py-10 gap-8 max-w-screen-2xl mx-auto">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-64 flex-shrink-0">
            <div className="sticky top-6">
              <FacultySidebar facultyId={facultyId} />
            </div>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
      <Footer />
    </>
  );
}
