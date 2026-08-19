"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

import HeiHero from "@/components/hei/HeiHero";
import HeiSidebar from "@/components/hei/HeiSidebar";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Portal shell for the Higher Education Institute — hero, sticky sidebar,
 * content column. Structurally identical to
 * `components/department/DepartmentDetailLayout`, which is the point: the
 * institute reads as one of the university's unit portals, not a bespoke page.
 */
export default function HeiDetailLayout({ children }: { children: React.ReactNode }) {
    const { lang: currentLang } = useLanguage();
    const pathname = usePathname();

    return (
        <div className="min-h-screen bg-page text-[#1a2355] transition-colors dark:text-white">
            <HeiHero />

            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-4 py-10 md:px-10 md:py-14 lg:flex-row lg:gap-10 lg:px-20">
                <aside className="lg:w-[292px] lg:shrink-0">
                    <div className="lg:sticky lg:top-28">
                        <HeiSidebar />
                    </div>
                </aside>

                <main className="min-w-0 flex-1">
                    <motion.div
                        key={currentLang + pathname}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
