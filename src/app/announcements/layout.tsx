import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Elanlar | Announcements",
    description:
        "AzTU-nun rəsmi elanları — qəbul, müsabiqələr, tədris cədvəlləri, akademik və idari bildirişlər.",
    keywords: ["AzTU elanlar", "AzTU announcements", "qəbul elanı", "müsabiqə elanı"],
    alternates: {
        canonical: "/az/announcements",
        languages: {
            "az-AZ": "/az/announcements",
            "en-US": "/en/announcements",
            "x-default": "/az/announcements",
        },
    },
    openGraph: {
        title: "Elanlar | AzTU",
        description: "AzTU-nun rəsmi elanları.",
        url: "/az/announcements",
        type: "website",
    },
};

export default function AnnouncementsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
