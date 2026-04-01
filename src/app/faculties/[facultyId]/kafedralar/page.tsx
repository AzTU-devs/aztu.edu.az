"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import SectionBlock from "@/components/shared/SectionBlock";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { getCafedras, CafedraInterface } from "@/services/cafedraService/cafedraService";
import type { Lang } from "@/util/apiClient";

interface Props {
    params: Promise<{ facultyId: string }>;
}

export default function FacultyKafedralarPage({ params }: Props) {
    const { facultyId } = use(params);
    const searchParams = useSearchParams();
    const [cafedras, setCafedras] = useState<CafedraInterface[]>([]);
    const [loading, setLoading] = useState(true);

    const currentLang = ((): Lang => {
        const queryLang = searchParams?.get("lang");
        if (queryLang === "az" || queryLang === "en") {
            return queryLang;
        }
        return typeof navigator !== "undefined" && navigator.language?.startsWith("az") ? "az" : "en";
    })();

    useEffect(() => {
        setLoading(true);
        getCafedras({ facultyCode: facultyId, start: 0, end: 50, lang: currentLang }).then((res) => {
            if (Array.isArray(res)) {
                setCafedras(res);
            } else {
                setCafedras([]);
            }
            setLoading(false);
        });
    }, [facultyId, currentLang]);

    return (
        <div className="space-y-6">
            <SectionBlock title="Kafedralar" accent>
                {loading && (
                    <div className="flex justify-center py-12">
                        <div className="w-8 h-8 border-4 border-[#1a2355] border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {!loading && cafedras.length === 0 && (
                    <p className="text-center text-gray-400 dark:text-slate-500 py-12 text-sm">
                        Bu fakültəyə aid kafedra tapılmadı.
                    </p>
                )}

                {!loading && cafedras.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {cafedras.map((c) => (
                            <Link
                                key={c.id}
                                href={`/faculties/${facultyId}/kafedralar/${c.cafedra_code}/giris`}
                                className="group flex flex-col gap-3 bg-gray-50 dark:bg-slate-700/40 border border-gray-100 dark:border-slate-600 rounded-2xl p-5 hover:border-[#1a2355]/30 dark:hover:border-[#1a2355]/40 hover:shadow-md transition-all"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="w-10 h-10 rounded-xl bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center">
                                        <MenuBookIcon sx={{ fontSize: 20, color: "#1a2355" }} />
                                    </div>
                                    <span className="text-xs font-bold text-[#1a2355] dark:text-blue-300 bg-[#1a2355]/10 dark:bg-[#1a2355]/20 px-3 py-1 rounded-full">
                                        {c.cafedra_code}
                                    </span>
                                </div>

                                <h3 className="font-bold text-[#1a2355] dark:text-white text-sm leading-snug group-hover:text-[#ee7c7e] transition-colors duration-300">
                                    {c.cafedra_name}
                                </h3>

                                <div className="flex items-center gap-1 text-xs text-[#1a2355] dark:text-blue-400 font-semibold mt-auto">
                                    Ətraflı bax
                                    <ChevronRightIcon sx={{ fontSize: 14 }} className="transition-transform group-hover:translate-x-1" />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </SectionBlock>
        </div>
    );
}
