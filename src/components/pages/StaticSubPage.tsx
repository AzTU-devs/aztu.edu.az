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
    
    // Auto-detect paths for specific videos
    const isResearchPage = pathname.startsWith('/az/tedqiqat') || pathname.startsWith('/en/research');
    const isAcademicPage = pathname.startsWith('/az/akademik') || pathname.startsWith('/en/academic') || pathname.includes('/faculties/');
    
    let videoSrc = null;
    if (isResearchPage) videoSrc = "/heroBgVideos/research.mp4";
    else if (isAcademicPage) videoSrc = "/heroBgVideos/resaerch.mp4";

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden bg-white">
            {/* STUNNING BACKGROUND ELEMENTS */}
            <div className="bg-mesh opacity-100" />
            <div className="bg-grid-premium opacity-10" />
            
            {/* Additional Background Blobs for "Filled" look */}
            <div className="fixed top-1/4 -left-20 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full animate-pulse" />
            <div className="fixed bottom-1/4 -right-20 w-96 h-96 bg-[#ee7c7e]/5 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />

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
                            className="bg-white/80 backdrop-blur-3xl rounded-[3rem] border-2 border-[#1a2355]/5 p-10 md:p-16 shadow-2xl shadow-blue-900/5 relative overflow-hidden group hover:border-[#ee7c7e]/20 transition-all duration-500"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ee7c7e] to-transparent opacity-30" />
                            <p className="text-gray-700 text-xl leading-relaxed font-medium whitespace-pre-wrap relative z-10">
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
                            <h2 className="text-3xl font-black text-[#1a2355] uppercase tracking-tighter mb-10 flex items-center gap-4">
                                <span className="w-2.5 h-10 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_15px_rgba(238,124,126,0.3)]" />
                                {pathname.includes('/az/') ? 'Kəşf et' : 'Explore'} {section.label}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {section.items
                                    .filter((i) => i.slug !== item.slug)
                                    .slice(0, 4) // Keep it compact
                                    .map((other, idx) => (
                                        <Link
                                            key={other.slug}
                                            href={`${section.basePath}/${other.slug}`}
                                            className="group relative h-full flex flex-col justify-between p-8 bg-white/60 backdrop-blur-xl rounded-[2.5rem] border-2 border-[#1a2355]/5 transition-all duration-500 hover:border-[#ee7c7e]/50 hover:bg-white hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-[#ee7c7e]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform" />
                                            
                                            <div className="relative z-10 flex items-center justify-between gap-6">
                                                <span className="text-lg font-black text-[#1a2355] group-hover:text-[#ee7c7e] leading-tight transition-colors">
                                                    {other.title}
                                                </span>
                                                <div className="w-12 h-12 rounded-2xl bg-[#1a2355]/5 flex items-center justify-center transition-all duration-500 group-hover:bg-[#ee7c7e] group-hover:text-white shadow-lg border border-[#1a2355]/5">
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

                    {/* Sidebar Style Info */}
                    <div className="lg:col-span-4 space-y-8">
                            <motion.div 
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="sticky top-28 p-10 rounded-[3rem] bg-white border-2 border-[#1a2355]/5 text-[#1a2355] shadow-2xl relative overflow-hidden group hover:border-[#ee7c7e]/20 transition-all duration-500"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ee7c7e] to-transparent opacity-20" />
                                
                                <div className="relative z-10">
                                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gray-50 border border-gray-100 mb-8">
                                        <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse" />
                                        <span className="text-[#1a2355]/60 text-[10px] font-black uppercase tracking-[0.3em]">Information</span>
                                    </div>
                                    <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">AzTU Academic Excellence</h3>
                                    <p className="text-gray-500 font-medium leading-relaxed mb-10">
                                        Empowering the next generation of engineers and technologists through innovation and research-driven education.
                                    </p>
                                    <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] bg-[#ee7c7e] text-white px-8 py-4 rounded-2xl shadow-xl shadow-[#ee7c7e]/20 hover:scale-[1.05] active:scale-95 transition-all duration-300">
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
