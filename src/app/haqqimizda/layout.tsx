import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Haqqımızda | About AzTU",
    description:
        "Azərbaycan Texniki Universitetinin tarixi, missiyası, vizyonu, rəhbərliyi və beynəlxalq reytinqlərdəki mövqeyi haqqında məlumat.",
    keywords: [
        "AzTU haqqında",
        "about AzTU",
        "Azərbaycan Texniki Universitetinin tarixi",
        "AzTU rektor",
        "AzTU vizyon missiya",
        "university rankings Azerbaijan",
    ],
    alternates: {
        canonical: "/az/haqqimizda",
        languages: {
            "az-AZ": "/az/haqqimizda",
            "en-US": "/en/about",
            "x-default": "/az/haqqimizda",
        },
    },
    openGraph: {
        title: "Haqqımızda | AzTU",
        description: "AzTU-nun tarixi, missiyası və rəhbərliyi.",
        url: "/az/haqqimizda",
        type: "website",
    },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
