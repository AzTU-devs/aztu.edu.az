"use client";

import { motion } from "framer-motion";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import SearchOffIcon from "@mui/icons-material/SearchOff";

/* ────────────────────────────────────────────────────────────────
   Faculty design system — clean, modern, lightly colorful.
   Scoped to the faculty section so the rest of the site is untouched.
   ──────────────────────────────────────────────────────────────── */

export interface FacultyPalette {
  /** soft icon-tile background + text */
  tint: string;
  /** accent text color */
  text: string;
  /** solid dot / number badge background */
  dot: string;
  /** pill chip */
  chip: string;
  /** avatar ring */
  ring: string;
}

export const FACULTY_PALETTES: FacultyPalette[] = [
  {
    tint: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    text: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
    chip: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20",
    ring: "ring-blue-500/30",
  },
  {
    tint: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    text: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500",
    chip: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20",
    ring: "ring-emerald-500/30",
  },
  {
    tint: "bg-[#ee7c7e]/10 text-[#e05b5d] dark:text-[#fb7185]",
    text: "text-[#e05b5d] dark:text-[#fb7185]",
    dot: "bg-[#ee7c7e]",
    chip: "bg-[#ee7c7e]/10 text-[#e05b5d] border-[#ee7c7e]/30 dark:text-[#fb7185] dark:border-[#ee7c7e]/30",
    ring: "ring-[#ee7c7e]/30",
  },
  {
    tint: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
    text: "text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500",
    chip: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-500/10 dark:text-violet-300 dark:border-violet-500/20",
    ring: "ring-violet-500/30",
  },
  {
    tint: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    text: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500",
    chip: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20",
    ring: "ring-amber-500/30",
  },
  {
    tint: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
    text: "text-cyan-600 dark:text-cyan-400",
    dot: "bg-cyan-500",
    chip: "bg-cyan-50 text-cyan-700 border-cyan-200 dark:bg-cyan-500/10 dark:text-cyan-300 dark:border-cyan-500/20",
    ring: "ring-cyan-500/30",
  },
];

/** Base surface used across faculty pages. */
export const cardBase =
  "rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#101733] shadow-sm";

/* ── Section heading: icon tile + eyebrow + title + optional action ── */
export function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
  action,
  className = "",
}: {
  icon?: React.ElementType;
  eyebrow?: string;
  title: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-start justify-between gap-4 ${className}`}>
      <div className="flex items-center gap-3.5">
        {Icon && (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#1a2355] text-white shadow-sm">
            <Icon sx={{ fontSize: 22 }} />
          </span>
        )}
        <div>
          {eyebrow && (
            <p className="mb-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#ee7c7e]">
              {eyebrow}
            </p>
          )}
          <h2 className="text-xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-2xl">
            {title}
          </h2>
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/* ── Panel: clean card wrapper with an optional heading ── */
export function FacultyPanel({
  title,
  eyebrow,
  icon,
  children,
  className = "",
  bodyClassName = "",
  animate = true,
}: {
  title?: string;
  eyebrow?: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  animate?: boolean;
}) {
  const Wrapper: React.ElementType = animate ? motion.section : "section";
  const motionProps = animate
    ? {
        initial: { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-80px" },
        transition: { duration: 0.5, ease: [0.23, 1, 0.32, 1] as const },
      }
    : {};

  return (
    <Wrapper {...motionProps} className={`${cardBase} p-6 md:p-8 ${className}`}>
      {title && (
        <SectionHeading icon={icon} eyebrow={eyebrow} title={title} className="mb-6" />
      )}
      <div className={bodyClassName}>{children}</div>
    </Wrapper>
  );
}

/* ── Search box ── */
export function SearchBox({
  value,
  onChange,
  onClear,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onClear: () => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <SearchIcon
        sx={{ fontSize: 20 }}
        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-12 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#ee7c7e] focus:ring-4 focus:ring-[#ee7c7e]/10 dark:border-white/10 dark:bg-[#101733] dark:text-white dark:placeholder:text-slate-500"
      />
      {value && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg bg-slate-100 text-slate-500 transition hover:bg-[#ee7c7e] hover:text-white dark:bg-white/10 dark:text-white/60"
          aria-label="Clear"
        >
          <CloseIcon sx={{ fontSize: 16 }} />
        </button>
      )}
    </div>
  );
}

/* ── "Showing N of M" result counter ── */
export function ResultCount({
  filtered,
  total,
  showLabel,
  ofLabel,
  onClear,
  clearLabel,
}: {
  filtered: number;
  total: number;
  showLabel: string;
  ofLabel: string;
  onClear?: () => void;
  clearLabel?: string;
}) {
  return (
    <div className="flex items-center justify-between text-[13px] font-medium text-slate-500 dark:text-slate-400">
      <span>
        {showLabel} <span className="font-bold text-[#ee7c7e] tabular-nums">{filtered}</span>{" "}
        {ofLabel} <span className="tabular-nums">{total}</span>
      </span>
      {onClear && clearLabel && (
        <button
          type="button"
          onClick={onClear}
          className="font-semibold text-[#ee7c7e] transition hover:text-[#1a2355] dark:hover:text-white"
        >
          {clearLabel}
        </button>
      )}
    </div>
  );
}

/* ── Empty / no-results state ── */
export function EmptyState({
  icon: Icon = SearchOffIcon,
  title,
  hint,
  action,
}: {
  icon?: React.ElementType;
  title: string;
  hint?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 px-6 py-16 text-center dark:border-white/10 dark:bg-white/5">
      <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1a2355]/8 text-[#1a2355] dark:bg-white/5 dark:text-white">
        <Icon sx={{ fontSize: 28 }} />
      </span>
      <h3 className="text-base font-bold text-slate-800 dark:text-white">{title}</h3>
      {hint && <p className="mt-1.5 max-w-sm text-sm text-slate-500 dark:text-slate-400">{hint}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
