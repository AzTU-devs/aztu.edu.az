import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Xəbərlər | News",
    description:
        "Azərbaycan Texniki Universitetinin son xəbərləri, akademik və beynəlxalq tədbirləri, elmi nailiyyətləri.",
    keywords: ["AzTU xəbərlər", "AzTU news", "university news Azerbaijan", "Bakı universitet xəbərləri"],
    alternates: {
        canonical: "/az/news",
        languages: {
            "az-AZ": "/az/news",
            "en-US": "/en/news",
            "x-default": "/az/news",
        },
    },
    openGraph: {
        title: "Xəbərlər | AzTU",
        description: "AzTU-nun son xəbərləri və elanları.",
        url: "/az/news",
        type: "website",
    },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
