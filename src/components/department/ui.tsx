"use client";

import { motion } from "framer-motion";

/**
 * Shared chrome for the structural-unit (department) pages.
 *
 * Every section on About / Leadership / Staff renders through `SectionCard`
 * so the border weight, radius, shadow and heading rhythm are identical.
 * One accent only — navy `#1a2355` for structure, coral `#ee7c7e` for emphasis.
 */

export const CARD =
    "rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-slate-900";

type SectionCardProps = {
    icon: React.ElementType;
    eyebrow?: string;
    title: string;
    action?: React.ReactNode;
    children: React.ReactNode;
    delay?: number;
    className?: string;
};

export function SectionCard({
    icon: Icon,
    eyebrow,
    title,
    action,
    children,
    delay = 0,
    className = "",
}: SectionCardProps) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay, ease: [0.23, 1, 0.32, 1] }}
            className={`text-flow ${CARD} overflow-hidden ${className}`}
        >
            <header className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5 dark:border-white/10 md:px-8">
                <div className="flex items-center gap-3.5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1a2355] text-white shadow-sm">
                        <Icon sx={{ fontSize: 21 }} />
                    </span>
                    <div className="min-w-0">
                        {eyebrow && (
                            <p className="mb-0.5 text-[10px] font-black uppercase tracking-[0.28em] text-[#ee7c7e]">
                                {eyebrow}
                            </p>
                        )}
                        <h2 className="text-lg font-black tracking-tight text-[#1a2355] dark:text-white md:text-xl">
                            {title}
                        </h2>
                    </div>
                </div>
                {action}
            </header>

            <div className="px-6 py-6 md:px-8 md:py-7">{children}</div>
        </motion.section>
    );
}

/** Numbered list used for objectives and core functions. */
export function NumberedList({ items }: { items: React.ReactNode[] }) {
    return (
        <ol className="space-y-3.5">
            {items.map((item, i) => (
                <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: Math.min(i * 0.05, 0.3) }}
                    className="flex gap-4"
                >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#1a2355]/[0.06] text-[11px] font-black tabular-nums text-[#1a2355] dark:bg-white/10 dark:text-white">
                        {String(i + 1).padStart(2, "0")}
                    </span>
                    <div
                        style={{ textAlign: "left" }}
                        className="min-w-0 flex-1 text-[15px] font-medium leading-relaxed text-slate-600 dark:text-slate-300"
                    >
                        {item}
                    </div>
                </motion.li>
            ))}
        </ol>
    );
}

/** Small labelled fact used in the hero rail and contact blocks. */
export function FactTile({
    icon: Icon,
    label,
    value,
    href,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    href?: string;
}) {
    const body = (
        <>
            <span className="mb-1.5 flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.25em] text-white/45">
                <Icon sx={{ fontSize: 13 }} className="text-[#ee7c7e]" />
                {label}
            </span>
            <span className="block truncate text-sm font-black text-white">{value}</span>
        </>
    );

    const shell =
        "block min-w-0 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl transition-colors";

    return href ? (
        <a href={href} className={`${shell} hover:border-[#ee7c7e]/50 hover:bg-white/[0.1]`}>
            {body}
        </a>
    ) : (
        <div className={shell}>{body}</div>
    );
}
