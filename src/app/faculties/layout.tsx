import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Fakültələr | Faculties",
    description:
        "Azərbaycan Texniki Universitetinin fakültələri və kafedraları — mühəndislik, informasiya texnologiyaları, enerji, nəqliyyat, iqtisadiyyat və idarəetmə üzrə bakalavr, magistr və doktorantura proqramları.",
    keywords: [
        "AzTU fakültələri",
        "AzTU faculties",
        "mühəndislik fakültəsi",
        "kafedralar",
        "departments",
        "kompüter mühəndisliyi",
        "elektrik mühəndisliyi",
        "computer engineering",
    ],
    alternates: {
        canonical: "/faculties",
        languages: {
            "az-AZ": "/faculties",
            "en-US": "/en/faculties",
            "x-default": "/faculties",
        },
    },
    openGraph: {
        title: "Fakültələr | AzTU",
        description: "AzTU-nun fakültələri, kafedraları və ixtisasları.",
        url: "/faculties",
        type: "website",
    },
};

export default function FacultiesLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
