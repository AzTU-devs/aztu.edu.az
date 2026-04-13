"use client";

import { use, useState, useEffect } from "react";
import { getResearchInstituteBySlug } from "@/services/researchInstituteService/researchInstituteService";
import type { ResearchInstituteDetail } from "@/types/researchInstitute";
import SectionBlock from "@/components/shared/SectionBlock";
import SanitizedHtml from "@/components/shared/SanitizedHtml";
import Loading from "@/components/loading/Loading";
import { useLanguage } from "@/context/LanguageContext";
import VisibilityIcon from "@mui/icons-material/Visibility";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import ScienceIcon from "@mui/icons-material/Science";
import FlagIcon from "@mui/icons-material/Flag";

interface Props {
    params: Promise<{ slug: string }>;
}

export default function ResearchInstituteAboutPage({ params }: Props) {
    const { slug } = use(params);
    const { lang } = useLanguage();
    const [institute, setInstitute] = useState<ResearchInstituteDetail | null | undefined>(undefined);

    useEffect(() => {
        getResearchInstituteBySlug(slug, lang).then(setInstitute);
    }, [slug, lang]);

    if (institute === undefined) return <Loading />;
    if (institute === null) return null;

    const labels = {
        about: lang === "az" ? "Haqqında" : "About",
        vision: lang === "az" ? "Vizyon" : "Vision",
        mission: lang === "az" ? "Missiya" : "Mission",
        objectives: lang === "az" ? "Məqsədlər" : "Objectives",
        directions: lang === "az" ? "Tədqiqat İstiqamətləri" : "Research Directions",
    };

    return (
        <div className="space-y-10">
            {/* About Section */}
            <SectionBlock title={labels.about} accent>
                <div className="prose prose-blue dark:prose-invert max-w-none">
                    <SanitizedHtml html={institute.about} className="text-gray-600 dark:text-slate-300 leading-relaxed text-lg text-justify w-full" />
                </div>
            </SectionBlock>

            {/* Vision & Mission Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SectionBlock title={labels.vision} accent>
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] flex-shrink-0">
                            <VisibilityIcon sx={{ fontSize: 20 }} />
                        </div>
                        <p className="text-gray-600 dark:text-slate-300 text-base italic leading-relaxed pt-1">
                            "{institute.vision}"
                        </p>
                    </div>
                </SectionBlock>

                <SectionBlock title={labels.mission} accent>
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-xl bg-[#1a2355]/10 flex items-center justify-center text-[#1a2355] dark:text-blue-400 flex-shrink-0">
                            <TrackChangesIcon sx={{ fontSize: 20 }} />
                        </div>
                        <p className="text-gray-600 dark:text-slate-300 text-base leading-relaxed pt-1">
                            {institute.mission}
                        </p>
                    </div>
                </SectionBlock>
            </div>

            {/* Objectives and Research Directions Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SectionBlock title={labels.objectives} accent>
                    <ul className="space-y-4">
                        {institute.objectives.map((obj) => (
                            <li key={obj.id} className="flex gap-4 group">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-slate-700/50 flex items-center justify-center text-[#ee7c7e] flex-shrink-0 group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300">
                                    <FlagIcon sx={{ fontSize: 16 }} />
                                </div>
                                <span className="text-gray-600 dark:text-slate-300 text-sm pt-1.5 leading-relaxed font-medium">
                                    {obj.content}
                                </span>
                            </li>
                        ))}
                    </ul>
                </SectionBlock>

                <SectionBlock title={labels.directions} accent>
                    <ul className="space-y-4">
                        {institute.research_directions.map((dir) => (
                            <li key={dir.id} className="flex gap-4 group">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-slate-800/50 flex items-center justify-center text-[#1a2355] dark:text-blue-300 flex-shrink-0 group-hover:bg-[#1a2355] group-hover:text-white transition-all duration-300">
                                    <ScienceIcon sx={{ fontSize: 16 }} />
                                </div>
                                <span className="text-sm font-bold text-[#1a2355] dark:text-white pt-1.5 leading-relaxed">
                                    {dir.content}
                                </span>
                            </li>
                        ))}
                    </ul>
                </SectionBlock>
            </div>
        </div>
    );
}
