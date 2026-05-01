import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tədqiqat | Research",
    description:
        "AzTU-nun tədqiqat fəaliyyəti, prioritet istiqamətləri, layihələri, daxili qrant proqramları, elmi jurnalları və laboratoriyaları.",
    keywords: [
        "AzTU tədqiqat",
        "AzTU research",
        "research projects Azerbaijan",
        "Erasmus+ projects",
        "Horizon Europe",
        "elmi tədqiqat Bakı",
        "scientific research Azerbaijan",
    ],
    alternates: {
        canonical: "/az/tedqiqat",
        languages: {
            "az-AZ": "/az/tedqiqat",
            "en-US": "/en/research",
            "x-default": "/az/tedqiqat",
        },
    },
    openGraph: {
        title: "Tədqiqat | AzTU",
        description: "Elmi-tədqiqat fəaliyyəti, layihələr və qrant proqramları.",
        url: "/az/tedqiqat",
        type: "website",
    },
};

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
