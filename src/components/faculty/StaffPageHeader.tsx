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
    const hasStats = stats && stats.length > 0;

    return (
        <motion.header
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 items-center gap-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-slate-900 md:p-8 lg:grid-cols-12"
        >
            <div className={hasStats ? "lg:col-span-8" : "lg:col-span-12"}>
                <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#1a2355] text-white shadow-sm">
                        <Icon sx={{ fontSize: 22 }} />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#ee7c7e]">
                        {eyebrow}
                    </span>
                </div>
                <h1 className="mb-3 text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-3xl">
                    {title}
                </h1>
                {description && (
                    <p className="max-w-2xl text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                        {description}
                    </p>
                )}
            </div>

            {hasStats && (
                <div className="grid grid-cols-2 gap-3 lg:col-span-4">
                    {stats!.slice(0, 2).map((stat, idx) => {
                        const SIcon = stat.icon;
                        const primary = idx === 0;
                        return (
                            <div
                                key={stat.label}
                                className={`rounded-xl p-4 ${
                                    primary
                                        ? "bg-[#1a2355] text-white"
                                        : "border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5"
                                }`}
                            >
                                <div className="mb-2 flex items-center gap-1.5">
                                    <SIcon
                                        sx={{ fontSize: 16 }}
                                        className={primary ? "text-[#ee7c7e]" : "text-[#ee7c7e]"}
                                    />
                                    <span
                                        className={`text-[10px] font-semibold uppercase tracking-wide ${
                                            primary ? "text-white/60" : "text-slate-400 dark:text-slate-400"
                                        }`}
                                    >
                                        {stat.label}
                                    </span>
                                </div>
                                <p
                                    className={`text-3xl font-bold tabular-nums tracking-tight ${
                                        primary ? "text-white" : "text-slate-900 dark:text-white"
                                    }`}
                                >
                                    {stat.value}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}
        </motion.header>
    );
}
