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
        <main className="min-h-screen transition-colors duration-500 overflow-hidden">
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
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-white dark:bg-slate-800/50 rounded-[3rem] border border-gray-100 dark:border-white/10 p-10 md:p-16 shadow-2xl shadow-blue-900/5 backdrop-blur-md"
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
                            className="pt-12 border-t border-gray-100 dark:border-white/10"
                        >
                            <h2 className="text-2xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter mb-10 flex items-center gap-4">
                                <span className="w-2 h-10 bg-[#ee7c7e] rounded-full" />
                                Explore {section.label}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {section.items
                                    .filter((i) => i.slug !== item.slug)
                                    .map((other, idx) => (
                                        <Link
                                            key={other.slug}
                                            href={`${section.basePath}/${other.slug}`}
                                            className="group relative h-full flex flex-col justify-between p-8 bg-gray-50 dark:bg-slate-800/50 backdrop-blur-md rounded-[2rem] border border-gray-100 dark:border-white/5 transition-all duration-500 hover:bg-[#1a2355] hover:border-[#1a2355] group-hover:shadow-2xl overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform" />
                                            
                                            <div className="relative z-10 flex items-center justify-between gap-4">
                                                <span className="text-lg font-black text-[#1a2355] dark:text-white group-hover:text-white leading-tight transition-colors">
                                                    {other.title}
                                                </span>
                                                <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-[#ee7c7e] group-hover:translate-x-1 shadow-sm">
                                                    <ChevronRightIcon
                                                        sx={{ fontSize: 20 }}
                                                        className="text-[#1a2355] group-hover:text-white transition-colors"
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
                            <div className="sticky top-28 p-10 rounded-[3rem] bg-[#1a2355] text-white shadow-2xl relative overflow-hidden group">
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
