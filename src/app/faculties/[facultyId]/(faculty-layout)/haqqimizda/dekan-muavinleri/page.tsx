"use client";

import { use, useEffect, useState } from "react";
import ComingSoon from "@/components/shared/ComingSoon";
import StaffCard from "@/components/faculty/StaffCard";
import StaffPageHeader from "@/components/faculty/StaffPageHeader";
import { getFacultyBySlug, getImageUrl } from "@/services/facultyService/facultyService";
import type { FacultyDetail, PersonnelItem } from "@/types/faculty";
import { useLanguage } from "@/context/LanguageContext";
import BadgeIcon from "@mui/icons-material/Badge";
import GroupsIcon from "@mui/icons-material/Groups";

interface Props {
    params: Promise<{ facultyId: string }>;
}

export default function DekanMuavinleriPage({ params }: Props) {
    const { facultyId: facultySlug } = use(params);
    const { lang: currentLang } = useLanguage();
    const [faculty, setFaculty] = useState<FacultyDetail | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getFacultyBySlug(facultySlug, currentLang)
            .then((result) => {
                setFaculty(result);
                setLoading(false);
            })
            .catch(() => {
                setFaculty(null);
                setLoading(false);
            });
    }, [facultySlug, currentLang]);

    const deputyDeans: PersonnelItem[] = faculty?.deputy_deans ?? [];

    return (
        <div className="space-y-10">
            <StaffPageHeader
                icon={BadgeIcon}
                eyebrow={currentLang === "az" ? "Rəhbər heyət" : "Leadership team"}
                title={currentLang === "az" ? "Dekan müavinləri" : "Deputy Deans"}
                description={
                    currentLang === "az"
                        ? "Tədris, elm, beynəlxalq əlaqələr və digər sahələr üzrə fakültənin rəhbər heyətinə daxil olan dekan müavinləri."
                        : "Deputy deans responsible for education, research, international relations, and other strategic areas of the faculty."
                }
                stats={
                    deputyDeans.length > 0
                        ? [
                              {
                                  label: currentLang === "az" ? "Müavin" : "Deputies",
                                  value: deputyDeans.length,
                                  icon: GroupsIcon,
                              },
                          ]
                        : undefined
                }
            />

            {loading ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-100 dark:bg-white/5" />
                    ))}
                </div>
            ) : deputyDeans.length === 0 ? (
                <ComingSoon
                    label={currentLang === "az" ? "Məlumat əlavə ediləcək" : "Information will be added soon"}
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {deputyDeans.map((vd, index) => {
                        const fullName = [vd.first_name, vd.last_name, vd.father_name].filter(Boolean).join(" ");
                        return (
                            <StaffCard
                                key={vd.id}
                                fullName={fullName || (currentLang === "az" ? "Naməlum" : "Unknown")}
                                role={vd.duty || vd.scientific_name}
                                degree={vd.scientific_degree}
                                photoUrl={getImageUrl(vd.profile_image)}
                                email={vd.email}
                                phone={vd.phone}
                                index={index}
                                badge={currentLang === "az" ? "Müavin" : "Deputy"}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
