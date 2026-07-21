"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import { NavSection, NavItem } from "@/config/navigation";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";

type Props = {
    section: NavSection;
    item: NavItem;
};

export default function StaticSubPage({ section, item }: Props) {
    const pathname = usePathname();
    
    const isResearchPage = pathname.startsWith('/az/tedqiqat') || pathname.startsWith('/en/research');
    const isStudentPage = pathname.startsWith('/az/telebeler') || pathname.startsWith('/en/students');
    const studentVideoSrc = "http://api.aztu.edu.az/media/prod/hero/hero_videos/students.mp4";

    const videoSrc = isStudentPage ? studentVideoSrc : (isResearchPage ? "/heroBgVideos/research.mp4" : null);

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden bg-page dark:bg-[#0a0c1a]">
            {/* STUNNING BACKGROUND ELEMENTS */}

            {/* Dark blue + coral accent blobs for visual depth */}

            <PageHero
                title={item.title}
                description={item.description}
                breadcrumbs={[
                    { label: section.label, href: section.basePath },
                    { label: item.title }
                ]}
                eyebrow={section.label}
                videoSrc={videoSrc || undefined}
            />

            <PageContainer>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 -mt-20">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 30 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="bg-white dark:bg-slate-900/40 backdrop-blur-3xl rounded-[14px] border-2 border-[#1a2355]/30 dark:border-white/10 p-10 md:p-16 shadow-2xl shadow-[#1a2355]/15 relative overflow-hidden group hover:border-[#ee7c7e] transition-all duration-500"
                        >
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#1a2355] via-[#ee7c7e] to-[#1a2355]" />
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#1a2355]" />
                            <p className="text-gray-700 dark:text-gray-300 text-xl leading-relaxed font-medium whitespace-pre-wrap relative z-10">
                                {item.content}
                            </p>
                        </motion.div>

                        {/* Optional Bottom Feature Style for Other Pages */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="pt-12"
                        >
                            <h2 className="text-3xl font-black text-[#1a2355] dark:text-white tracking-tighter mb-10 flex items-center gap-4">
                                <span className="w-2.5 h-10 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_15px_rgba(238,124,126,0.3)]" />
                                {pathname.includes('/az/') ? 'Kəşf et' : 'Explore'} {section.label}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {section.items
                                    .filter((i) => i.slug !== item.slug)
                                    .slice(0, 4) // Keep it compact
                                    .map((other) => (
                                        <Link
                                            key={other.slug}
                                            href={`${section.basePath}/${other.slug}`}
                                            className="group relative h-full flex flex-col justify-between p-8 bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-[14px] border-2 border-[#1a2355]/30 dark:border-white/10 transition-all duration-500 hover:border-[#ee7c7e] hover:bg-[#1a2355] hover:text-white dark:hover:bg-slate-800 hover:shadow-[0_20px_40px_rgba(26,35,85,0.25)] overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ee7c7e]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform" />

                                            <div className="relative z-10 flex items-center justify-between gap-6">
                                                <span className="text-lg font-black text-[#1a2355] dark:text-white group-hover:text-white leading-tight transition-colors">
                                                    {other.title}
                                                </span>
                                                <div className="w-12 h-12 rounded-2xl bg-[#1a2355] dark:bg-white/5 flex items-center justify-center transition-all duration-500 group-hover:bg-[#ee7c7e] text-white shadow-lg border-2 border-[#1a2355] group-hover:border-[#ee7c7e] dark:border-white/10">
                                                    <ChevronRightIcon
                                                        sx={{ fontSize: 24 }}
                                                        className="group-hover:translate-x-1 transition-transform"
                                                    />
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar Style Info — full dark blue card */}
                    <div className="lg:col-span-4 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="sticky top-28 p-10 rounded-[14px] bg-[#1a2355] border-2 border-[#1a2355] text-white shadow-2xl shadow-[#1a2355]/30 relative overflow-hidden group hover:border-[#ee7c7e] transition-all duration-500"
                            >
                                <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#ee7c7e]/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
                                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#ee7c7e]/10 rounded-full blur-3xl" />
                                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#ee7c7e] to-transparent" />

                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 border border-white/20 mb-8 backdrop-blur-md">
                                        <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse" />
                                        <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.14em]">Information</span>
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tighter mb-4 text-white">AzTU Academic Excellence</h3>
                                    <p className="text-white/70 font-medium leading-relaxed mb-10">
                                        Empowering the next generation of engineers and technologists through innovation and research-driven education.
                                    </p>
                                    <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.12em] bg-[#ee7c7e] text-white px-8 py-4 rounded-2xl shadow-xl shadow-[#ee7c7e]/30 hover:bg-white hover:text-[#1a2355] hover:scale-[1.05] active:scale-95 transition-all duration-300">
                                        {pathname.includes('/az/') ? 'Bizə qoşulun' : 'Join Us'}
                                        <ChevronRightIcon sx={{ fontSize: 16 }} />
                                    </Link>
                                </div>
                            </motion.div>
                    </div>
                </div>
            </PageContainer>
        </main>
    );
}
