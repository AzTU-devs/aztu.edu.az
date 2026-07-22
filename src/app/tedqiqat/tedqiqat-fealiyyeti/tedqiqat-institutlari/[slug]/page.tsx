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
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

interface Props {
    params: Promise<{ slug: string }>;
}

/** Rich-text fields arrive as HTML; treat "<p></p>" and friends as empty. */
const hasContent = (html?: string | null): boolean =>
    !!html && html.replace(/<[^>]*>/g, "").trim().length > 0;

const proseClasses =
    "prose prose-slate dark:prose-invert max-w-none text-gray-600 dark:text-slate-300 leading-relaxed";

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
        additional: lang === "az" ? "Əlavə məlumat" : "Additional Information",
        contact: lang === "az" ? "Əlaqə" : "Contact",
        website: lang === "az" ? "Veb sayt" : "Website",
        email: lang === "az" ? "E-poçt" : "Email",
    };

    // Objectives are authored as a rich-text block in the dashboard, but the
    // curated records that predate it still carry a plain list.
    const showGoalsHtml = hasContent(institute.goals);
    const showObjectiveList = !showGoalsHtml && institute.objectives.length > 0;
    const showDirections = institute.research_directions.length > 0;
    const showContact = !!institute.website_url || !!institute.email;

    return (
        <div className="space-y-10">
            {hasContent(institute.about) && (
                <SectionBlock title={labels.about} accent>
                    <SanitizedHtml
                        html={institute.about}
                        className={`${proseClasses} text-lg text-justify w-full`}
                    />
                </SectionBlock>
            )}

            {/* Vision & Mission */}
            {(hasContent(institute.vision) || hasContent(institute.mission)) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {hasContent(institute.vision) && (
                        <SectionBlock title={labels.vision} accent>
                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] shrink-0">
                                    <VisibilityIcon sx={{ fontSize: 20 }} />
                                </div>
                                <SanitizedHtml html={institute.vision} className={`${proseClasses} pt-1`} />
                            </div>
                        </SectionBlock>
                    )}

                    {hasContent(institute.mission) && (
                        <SectionBlock title={labels.mission} accent>
                            <div className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-xl bg-[#1a2355]/10 flex items-center justify-center text-[#1a2355] dark:text-blue-400 shrink-0">
                                    <TrackChangesIcon sx={{ fontSize: 20 }} />
                                </div>
                                <SanitizedHtml html={institute.mission} className={`${proseClasses} pt-1`} />
                            </div>
                        </SectionBlock>
                    )}
                </div>
            )}

            {/* Objectives — rich text when available, legacy list otherwise */}
            {showGoalsHtml && (
                <SectionBlock title={labels.objectives} accent>
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center text-[#ee7c7e] shrink-0">
                            <FlagIcon sx={{ fontSize: 20 }} />
                        </div>
                        <SanitizedHtml html={institute.goals ?? ""} className={`${proseClasses} pt-1`} />
                    </div>
                </SectionBlock>
            )}

            {(showObjectiveList || showDirections) && (
                <div
                    className={`grid grid-cols-1 gap-8 ${
                        showObjectiveList && showDirections ? "md:grid-cols-2" : ""
                    }`}
                >
                    {showObjectiveList && (
                        <SectionBlock title={labels.objectives} accent>
                            <ul className="space-y-4">
                                {institute.objectives.map((obj) => (
                                    <li key={obj.id} className="flex gap-4 group">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-slate-700/50 flex items-center justify-center text-[#ee7c7e] shrink-0 group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300">
                                            <FlagIcon sx={{ fontSize: 16 }} />
                                        </div>
                                        <span className="text-gray-600 dark:text-slate-300 text-sm pt-1.5 leading-relaxed font-medium">
                                            {obj.content}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </SectionBlock>
                    )}

                    {showDirections && (
                        <SectionBlock title={labels.directions} accent>
                            <ul className="space-y-4">
                                {institute.research_directions.map((dir) => (
                                    <li key={dir.id} className="flex gap-4 group">
                                        <div className="w-8 h-8 rounded-lg bg-gray-50 dark:bg-slate-800/50 flex items-center justify-center text-[#1a2355] dark:text-blue-300 shrink-0 group-hover:bg-[#1a2355] group-hover:text-white transition-all duration-300">
                                            <ScienceIcon sx={{ fontSize: 16 }} />
                                        </div>
                                        <span className="text-sm font-bold text-[#1a2355] dark:text-white pt-1.5 leading-relaxed">
                                            {dir.content}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </SectionBlock>
                    )}
                </div>
            )}

            {hasContent(institute.additional_info) && (
                <SectionBlock title={labels.additional} accent>
                    <div className="flex gap-4 items-start">
                        <div className="w-10 h-10 rounded-xl bg-[#1a2355]/10 flex items-center justify-center text-[#1a2355] dark:text-blue-400 shrink-0">
                            <InfoOutlinedIcon sx={{ fontSize: 20 }} />
                        </div>
                        <SanitizedHtml
                            html={institute.additional_info ?? ""}
                            className={`${proseClasses} pt-1`}
                        />
                    </div>
                </SectionBlock>
            )}

            {showContact && (
                <SectionBlock title={labels.contact} accent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {institute.website_url && (
                            <a
                                href={institute.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 p-5 rounded-2xl border-2 border-[#1a2355]/10 dark:border-slate-700 hover:border-[#ee7c7e] hover:bg-[#ee7c7e]/5 transition-all duration-300"
                            >
                                <div className="w-11 h-11 rounded-xl bg-[#1a2355]/10 flex items-center justify-center text-[#1a2355] dark:text-blue-400 shrink-0 group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300">
                                    <LanguageIcon sx={{ fontSize: 20 }} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        {labels.website}
                                    </p>
                                    <p className="text-sm font-bold text-[#1a2355] dark:text-white truncate">
                                        {institute.website_url.replace(/^https?:\/\//, "")}
                                    </p>
                                </div>
                                <ArrowOutwardIcon
                                    sx={{ fontSize: 16 }}
                                    className="text-gray-300 group-hover:text-[#ee7c7e] transition-colors shrink-0"
                                />
                            </a>
                        )}

                        {institute.email && (
                            <a
                                href={`mailto:${institute.email}`}
                                className="group flex items-center gap-4 p-5 rounded-2xl border-2 border-[#1a2355]/10 dark:border-slate-700 hover:border-[#ee7c7e] hover:bg-[#ee7c7e]/5 transition-all duration-300"
                            >
                                <div className="w-11 h-11 rounded-xl bg-[#1a2355]/10 flex items-center justify-center text-[#1a2355] dark:text-blue-400 shrink-0 group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300">
                                    <MailOutlineIcon sx={{ fontSize: 20 }} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                                        {labels.email}
                                    </p>
                                    <p className="text-sm font-bold text-[#1a2355] dark:text-white truncate">
                                        {institute.email}
                                    </p>
                                </div>
                                <ArrowOutwardIcon
                                    sx={{ fontSize: 16 }}
                                    className="text-gray-300 group-hover:text-[#ee7c7e] transition-colors shrink-0"
                                />
                            </a>
                        )}
                    </div>
                </SectionBlock>
            )}
        </div>
    );
}
