import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Beynəlmiləlləşmə | Internationalization",
    description:
        "AzTU-nun beynəlxalq əməkdaşlıq, mübadilə proqramları, ikili diplom proqramları və xarici tələbələr üçün təklif etdiyi imkanlar.",
    keywords: [
        "AzTU beynəlxalq",
        "Erasmus AzTU",
        "international students AzTU",
        "ikili diplom",
        "double degree",
        "exchange programs",
        "study in Azerbaijan",
    ],
    alternates: {
        canonical: "/az/beynelmillesme",
        languages: {
            "az-AZ": "/az/beynelmillesme",
            "en-US": "/en/internationalization",
            "x-default": "/az/beynelmillesme",
        },
    },
    openGraph: {
        title: "Beynəlmiləlləşmə | AzTU",
        description: "Beynəlxalq əməkdaşlıq, mübadilə proqramları və xarici tələbə qəbulu.",
        url: "/az/beynelmillesme",
        type: "website",
    },
};

export default function InternationalizationLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
