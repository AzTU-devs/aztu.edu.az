"use client";

import { motion } from "framer-motion";

interface StatItem {
    label: string;
    value: string | number;
    icon: React.ElementType;
}

interface StaffPageHeaderProps {
    eyebrow: string;
    title: string;
    description?: string;
    icon: React.ElementType;
    stats?: StatItem[];
}

export default function StaffPageHeader({
    eyebrow,
    title,
    description,
    icon: Icon,
    stats,
}: StaffPageHeaderProps) {
    return (
        <header className="relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900/70 backdrop-blur-xl border-2 border-[#1a2355]/15 dark:border-white/10 p-6 md:p-10 shadow-xl">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#ee7c7e]/15 blur-3xl rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={stats && stats.length > 0 ? "lg:col-span-7" : "lg:col-span-12"}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#1a2355] to-[#3b82f6] text-white flex items-center justify-center shadow-md shadow-blue-500/30">
                            <Icon sx={{ fontSize: 22 }} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.35em] text-[#ee7c7e]">
                            {eyebrow}
                        </span>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-[#1a2355] dark:text-white tracking-tight leading-[1.1] mb-4">
                        {title}
                    </h1>
                    {description && (
                        <p className="text-sm md:text-base text-gray-600 dark:text-slate-300 leading-relaxed max-w-2xl">
                            {description}
                        </p>
                    )}
                </motion.div>

                {stats && stats.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="lg:col-span-5 grid grid-cols-2 gap-3"
                    >
                        {stats.slice(0, 2).map((stat, idx) => {
                            const SIcon = stat.icon;
                            const isPrimary = idx === 0;
                            return isPrimary ? (
                                <div
                                    key={stat.label}
                                    className="bg-gradient-to-br from-[#1a2355] to-[#0f172a] rounded-2xl p-5 text-white relative overflow-hidden"
                                >
                                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ee7c7e]/20 blur-3xl rounded-full" />
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-2 mb-2">
                                            <SIcon className="text-[#ee7c7e]" sx={{ fontSize: 18 }} />
                                            <span className="text-[10px] uppercase tracking-widest text-white/50 font-black">
                                                {stat.label}
                                            </span>
                                        </div>
                                        <p className="text-3xl font-black tabular-nums tracking-tighter">
                                            {stat.value}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div
                                    key={stat.label}
                                    className="bg-white dark:bg-slate-800 border-2 border-[#1a2355]/15 dark:border-white/10 rounded-2xl p-5 relative overflow-hidden"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <SIcon className="text-[#ee7c7e]" sx={{ fontSize: 18 }} />
                                        <span className="text-[10px] uppercase tracking-widest text-gray-400 dark:text-slate-400 font-black">
                                            {stat.label}
                                        </span>
                                    </div>
                                    <p className="text-3xl font-black text-[#1a2355] dark:text-white tabular-nums tracking-tighter">
                                        {stat.value}
                                    </p>
                                </div>
                            );
                        })}
                    </motion.div>
                )}
            </div>
        </header>
    );
}
