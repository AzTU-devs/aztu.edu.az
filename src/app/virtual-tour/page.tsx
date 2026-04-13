"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from "next/link";

export default function VirtualTourPage() {
    const t = useTranslation();
    const { lang } = useLanguage();

    return (
        <main className="min-h-screen bg-[#0b1330] flex flex-col relative overflow-hidden">
            {/* Background elements to match the stunning theme */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.05]" 
                     style={{ backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} />
                <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#ee7c7e]/[0.08] blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/[0.05] blur-[100px] rounded-full" />
            </div>

            {/* Header / Back button */}
            <div className="relative z-20 px-6 md:px-12 py-8 flex items-center justify-between">
                <Link href="/">
                    <button className="group flex items-center gap-3 text-white/60 hover:text-white transition-all duration-300">
                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#ee7c7e] group-hover:border-[#ee7c7e] transition-all duration-300">
                            <ArrowBackIcon sx={{ fontSize: 20 }} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-[0.2em]">{t.common.backToHome}</span>
                    </button>
                </Link>
                
                <div className="hidden md:block">
                    <h1 className="text-white font-black uppercase tracking-[0.4em] text-[10px] opacity-30">Azerbaijan Technical University</h1>
                </div>
            </div>

            {/* Main Content: The Iframe */}
            <div className="relative z-10 flex-1 px-4 md:px-12 pb-12 flex flex-col">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="flex-1 rounded-[2rem] md:rounded-[3.5rem] overflow-hidden border border-white/5 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative bg-black"
                >
                    {/* The Virtual Tour Iframe */}
                    <iframe 
                        src="https://aztu.edu.az/virtual-tour/index.html" 
                        className="w-full h-full border-none"
                        allowFullScreen
                        title="AzTU Virtual Tour"
                    />
                    
                    {/* Overlay info - only visible briefly or subtle */}
                    <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 pointer-events-none">
                        <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-[#0b1330]/60 backdrop-blur-xl border border-white/10 shadow-2xl">
                            <div className="w-2.5 h-2.5 rounded-full bg-[#ee7c7e] animate-pulse shadow-[0_0_12px_#ee7c7e]" />
                            <span className="text-white text-[11px] font-black uppercase tracking-[0.4em]">
                                {lang === 'az' ? 'Virtual Tur' : 'Virtual Tour'}
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
