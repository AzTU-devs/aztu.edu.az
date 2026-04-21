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
    
    // Auto-detect research paths
    const isResearchPage = pathname.startsWith('/az/tedqiqat') || pathname.startsWith('/en/research');
    const videoSrc = isResearchPage ? "/heroBgVideos/research.mp4" : null;

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden">
            {/* STUNNING BACKGROUND ELEMENTS - MATCHING HOME PAGE */}
            <div className="bg-mesh" />
            <div className="bg-grid-premium" />

            <PageHero
                title={item.title}
                description={item.description}
                breadcrumbs={[
                    { label: section.label, href: section.basePath },
                    { label: item.title }
                ]}
                eyebrow={section.label}
            >
                {/* Video Background Override if exists */}
                {videoSrc && (
                    <div className="absolute inset-0 z-0">
                        <video
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-50"
                        >
                            <source src={videoSrc} type="video/mp4" />
                        </video>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b1330] via-[#0b1330]/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1330]/80 via-transparent to-transparent" />
                    </div>
                )}
            </PageHero>

            <PageContainer>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[3rem] border-2 border-[#1a2355]/10 dark:border-[#1a2355]/30 p-10 md:p-16 shadow-2xl shadow-blue-900/5"
                        >
                            <p className="text-gray-600 dark:text-gray-300 text-xl leading-relaxed font-medium whitespace-pre-wrap">
                                {item.content}
                            </p>
                        </motion.div>

                        {/* Optional Bottom Feature Style for Other Pages */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="pt-12 border-t border-[#1a2355]/10 dark:border-white/10"
                        >
                            <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter mb-10 flex items-center gap-4">
                                <span className="w-2.5 h-10 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_15px_rgba(238,124,126,0.5)]" />
                                Explore {section.label}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {section.items
                                    .filter((i) => i.slug !== item.slug)
                                    .map((other, idx) => (
                                        <Link
                                            key={other.slug}
                                            href={`${section.basePath}/${other.slug}`}
                                            className="group relative h-full flex flex-col justify-between p-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] border-2 border-[#1a2355]/10 dark:border-[#1a2355]/30 transition-all duration-500 hover:border-[#ee7c7e]/40 dark:hover:border-[#ee7c7e]/50 hover:shadow-2xl overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ee7c7e]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform" />
                                            
                                            <div className="relative z-10 flex items-center justify-between gap-6">
                                                <span className="text-lg font-black text-[#1a2355] dark:text-white group-hover:text-[#ee7c7e] leading-tight transition-colors">
                                                    {other.title}
                                                </span>
                                                <div className="w-12 h-12 rounded-2xl bg-[#1a2355]/5 dark:bg-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-[#ee7c7e] group-hover:text-white shadow-sm border border-[#1a2355]/5 dark:border-white/5">
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

                    {/* Sidebar Style Info (Optional/Future) */}
                    <div className="lg:col-span-4 space-y-8">
                            <div className="sticky top-28 p-10 rounded-[3rem] bg-[#1a2355] text-white shadow-2xl relative overflow-hidden group border-2 border-[#1a2355]">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 border border-white/10 mb-8">
                                    <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse" />
                                    <span className="text-white text-[10px] font-black uppercase tracking-[0.3em]">Information</span>
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">AzTU Academic Excellence</h3>
                                <p className="text-white/60 font-medium leading-relaxed mb-10">
                                    Empowering the next generation of engineers and technologists through innovation and research-driven education.
                                </p>
                                <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] bg-[#ee7c7e] px-8 py-4 rounded-2xl shadow-xl shadow-black/20 hover:scale-[1.02] active:scale-95 transition-all">
                                    Join Us
                                    <ChevronRightIcon sx={{ fontSize: 16 }} />
                                </Link>
                            </div>
                            </div>
                    </div>
                </div>
            </PageContainer>
        </main>
    );
}
