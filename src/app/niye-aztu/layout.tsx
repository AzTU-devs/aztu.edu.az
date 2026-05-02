import type { Metadata } from "next";
import { buildMetadata } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "Niyə AzTU? | AzTU",
    titleEn: "Why AzTU? | AzTU",
    descriptionAz:
        "Niyə Azərbaycan Texniki Universitetini seçmək lazımdır? Akademik üstünlüklər, müasir laboratoriyalar, beynəlxalq əməkdaşlıqlar və karyera imkanları.",
    descriptionEn:
        "Why choose Azerbaijan Technical University? Academic excellence, modern laboratories, international partnerships and career opportunities.",
    pathAz: "/niye-aztu",
    pathEn: "/niye-aztu",
    keywords: [
        "Niyə AzTU",
        "Why AzTU",
        "AzTU üstünlüklər",
        "AzTU advantages",
        "study at AzTU",
    ],
});

export default function NiyeAztuLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
