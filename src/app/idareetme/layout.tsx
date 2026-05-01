import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "İdarəetmə | Management",
    description:
        "AzTU-nun rəhbərliyi, struktur bölmələri, ofislər və mərkəzləri haqqında məlumat.",
    keywords: ["AzTU idarəetmə", "AzTU management", "struktur bölmələr", "AzTU ofislər"],
    alternates: {
        canonical: "/az/idareetme",
        languages: {
            "az-AZ": "/az/idareetme",
            "en-US": "/en/management",
            "x-default": "/az/idareetme",
        },
    },
    openGraph: {
        title: "İdarəetmə | AzTU",
        description: "AzTU-nun rəhbərliyi və struktur bölmələri.",
        url: "/az/idareetme",
        type: "website",
    },
};

export default function ManagementLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
