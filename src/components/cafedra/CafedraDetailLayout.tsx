"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { getCafedraByCode } from "@/services/cafedraService/cafedraService";
import type { CafedraDetail } from "@/types/cafedra";
import CafedraSidebar from "@/components/cafedra/CafedraSidebar";
import { ScientificActivityProvider } from "@/context/ScientificActivityContext";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

interface Props {
    children: React.ReactNode;
    params: Promise<{ facultyId: string; cafedraId: string }>;
}

export default function CafedraDetailLayout({ children, params }: Props) {
    const { facultyId, cafedraId } = use(params);
    const { lang: currentLang } = useLanguage();
    const [cafedra, setCafedra] = useState<CafedraDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        setLoading(true);
        getCafedraByCode(cafedraId, currentLang)
            .then((result) => {
                if (result) setCafedra(result);
            })
            .finally(() => setLoading(false));
    }, [cafedraId, currentLang]);

    const t = {
        home: currentLang === "az" ? "Ana səhifə" : "Home",
        navigation: currentLang === "az" ? "Portal Naviqasiyası" : "Portal Navigation",
        menu: currentLang === "az" ? "Menyu" : "Menu",
        needHelp: currentLang === "az" ? "Köməyə ehtiyacınız var?" : "Need help?",
        contactText: currentLang === "az" ? "Kafedra ilə bağlı suallarınız üçün bizimlə əlaqə saxlayın." : "Reach out to us for any questions about the department.",
        contactBtn: currentLang === "az" ? "Əlaqə" : "Contact",
        portal: currentLang === "az" ? "Kafedra Portalı" : "Department Portal",
    };

    const prettifiedFallback = cafedraId
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (c) => c.toLocaleUpperCase(currentLang === "az" ? "az" : "en"));
    const displayTitle = cafedra?.title || prettifiedFallback;

    const academicPrefix = currentLang === "az" ? "akademik" : "academic";
    const facultyPrefix = currentLang === "az" ? "fakulteler" : "faculties";
    const facultiesPath = `/${currentLang}/${academicPrefix}/${facultyPrefix}`;
    const facultyPath = `${facultiesPath}/${facultyId}/haqqimizda`;
    const contactPath = `/${currentLang}/${academicPrefix}/${facultyPrefix}/${facultyId}/${currentLang === "az" ? "kafedralar" : "departments"}/${cafedraId}/${currentLang === "az" ? "haqqimizda/elaqe" : "about/contact"}`;

    return (
        <ScientificActivityProvider cafedraCode={cafedraId}>
        <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
            {/* ── Hero banner ── */}
            <div className="relative overflow-hidden bg-[#0b1330] pt-32 pb-14 px-4 md:px-8 lg:px-12">
                {/* Campus image background */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center opacity-25"
                    style={{ backgroundImage: 'url("/aztu.png")' }}
                />
                <div className="absolute inset-0 z-0 bg-[#0b1330]/70" />
                <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#0b1330] via-[#0b1330]/40 to-transparent" />

                <div className="relative z-10 mx-auto w-full max-w-[1600px]">
                    {/* Breadcrumb */}
                    <motion.nav
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 flex flex-wrap items-center gap-2 text-[13px] font-medium text-white/60"
                    >
                        <Link href="/" className="flex items-center gap-1.5 transition-colors hover:text-white">
                            <HomeIcon sx={{ fontSize: 16 }} />
                            {t.home}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 14 }} className="text-white/30" />
                        <Link href={facultiesPath} className="transition-colors hover:text-white">
                            {currentLang === "az" ? "Fakültələr" : "Faculties"}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 14 }} className="text-white/30" />
                        <Link href={facultyPath} className="uppercase transition-colors hover:text-white">
                            {facultyId.replace(/[_-]+/g, " ").slice(0, 24)}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 14 }} className="text-white/30" />
                        <span className="max-w-[160px] truncate font-semibold text-[#ee7c7e] md:max-w-none">
                            {loading ? "…" : displayTitle}
                        </span>
                    </motion.nav>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                    >
                        {cafedra?.cafedra_code && (
                            <span className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#ee7c7e] px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white shadow-lg shadow-[#ee7c7e]/25">
                                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                                {cafedra.cafedra_code}
                            </span>
                        )}
                        <h1 className="max-w-4xl text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                            {loading ? "…" : displayTitle}
                        </h1>
                        <p className="mt-4 text-sm font-medium uppercase tracking-[0.14em] text-white/50">
                            {t.portal}
                        </p>
                    </motion.div>
                </div>

                {/* thin accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#1a2355] via-[#ee7c7e] to-[#1a2355]" />
            </div>

            {/* ── Mobile sidebar toggle ── */}
            <div className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white/90 px-5 py-3.5 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90 lg:hidden">
                <span className="text-sm font-bold text-[#1a2355] dark:text-white">{t.navigation}</span>
                <button
                    onClick={() => setSidebarOpen((o) => !o)}
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1a2355] text-white transition active:scale-95"
                    aria-label="Toggle sidebar"
                >
                    {sidebarOpen ? <CloseIcon sx={{ fontSize: 20 }} /> : <MenuIcon sx={{ fontSize: 20 }} />}
                </button>
            </div>

            {/* ── Mobile drawer ── */}
            <AnimatePresence>
                {sidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="absolute bottom-0 left-0 top-0 w-[min(320px,85vw)] overflow-y-auto bg-slate-50 p-5 dark:bg-slate-950"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-lg font-bold text-[#1a2355] dark:text-white">{t.menu}</span>
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-500 transition hover:text-gray-800 dark:bg-white/10 dark:text-white/60"
                                >
                                    <CloseIcon sx={{ fontSize: 20 }} />
                                </button>
                            </div>
                            <CafedraSidebar facultyId={facultyId} cafedraId={cafedraId} />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ── Content area ── */}
            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-4 py-12 md:px-8 lg:flex-row lg:px-12">
                <aside className="hidden flex-shrink-0 lg:block lg:w-72 xl:w-80">
                    <div className="sticky top-24 space-y-5">
                        <CafedraSidebar facultyId={facultyId} cafedraId={cafedraId} />

                        {/* Help card */}
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a2355] to-[#2a3670] p-6 text-white shadow-sm">
                            <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[#ee7c7e]/20 blur-2xl" />
                            <div className="relative z-10">
                                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
                                    <SupportAgentOutlinedIcon sx={{ fontSize: 22 }} />
                                </span>
                                <h3 className="text-lg font-bold">{t.needHelp}</h3>
                                <p className="mt-2 text-[13px] leading-relaxed text-white/60">{t.contactText}</p>
                                <Link
                                    href={contactPath}
                                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#ee7c7e] px-5 py-3 text-[13px] font-bold text-white transition hover:bg-white hover:text-[#1a2355] active:scale-95"
                                >
                                    {t.contactBtn}
                                    <ChevronRightIcon sx={{ fontSize: 16 }} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="min-w-0 flex-1">
                    <motion.div
                        key={currentLang + cafedraId}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
        </ScientificActivityProvider>
    );
}
