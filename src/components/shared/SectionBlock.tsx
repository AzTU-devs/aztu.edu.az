"use client";

import { ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
  className?: string;
  accent?: boolean;
}

export default function SectionBlock({ title, children, className = "", accent = false }: Props) {
  return (
    <div className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 p-6 md:p-8 ${className}`}>
      {title && (
        <div className="flex items-center gap-3 mb-5">
          {accent && (
            <span className="w-1 h-6 rounded-full bg-[#ee7c7e] flex-shrink-0" />
          )}
          <h2 className="text-lg font-bold text-[#1a2355] dark:text-white">
            {title}
          </h2>
        </div>
      )}
      {children}
    </div>
  );
}
