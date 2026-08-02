"use client";

import { use, useState, useEffect } from "react";
import { motion } from "framer-motion";

import DepartmentHero from "@/components/department/DepartmentHero";
import DepartmentSidebar from "@/components/department/DepartmentSidebar";
import { getDepartmentBySlug } from "@/services/departmentService/departmentService";
import type { DepartmentDetail } from "@/types/department";
import { useLanguage } from "@/context/LanguageContext";

interface Props {
    children: React.ReactNode;
    params: Promise<{ department_code: string }>;
}

export default function DepartmentDetailLayout({ children, params }: Props) {
    const { department_code: departmentSlug } = use(params);
    const { lang: currentLang } = useLanguage();
    const [department, setDepartment] = useState<DepartmentDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Reset immediately so a stale department name never flashes on navigation
        setDepartment(null);
        setLoading(true);

        getDepartmentBySlug(departmentSlug, currentLang)
            .then((result) => {
                if (result) setDepartment(result);
            })
            .finally(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [departmentSlug, currentLang]);

    const listPath =
        currentLang === "az"
            ? "/az/idareetme/struktur-bolmeler"
            : "/en/management/structural-units";

    return (
        <div className="min-h-screen bg-page text-[#1a2355] transition-colors dark:text-white">
            <DepartmentHero
                department={department}
                loading={loading}
                lang={currentLang}
                listPath={listPath}
            />

            <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-8 px-4 py-10 md:px-10 md:py-14 lg:flex-row lg:gap-10 lg:px-20">
                <aside className="lg:w-[292px] lg:shrink-0">
                    <div className="lg:sticky lg:top-28">
                        <DepartmentSidebar departmentSlug={departmentSlug} />
                    </div>
                </aside>

                <main className="min-w-0 flex-1">
                    <motion.div
                        key={currentLang + departmentSlug}
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
