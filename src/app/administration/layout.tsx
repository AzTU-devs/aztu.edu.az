import type { Metadata } from "next";
import { buildMetadata } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "İdarəetmə | AzTU",
    titleEn: "Administration | AzTU",
    descriptionAz:
        "Azərbaycan Texniki Universitetinin idarəetmə strukturu — rektorluq, prorektorluqlar, struktur bölmələri və ofislər.",
    descriptionEn:
        "Administration of Azerbaijan Technical University — rectorate, vice-rectorates, structural units and offices.",
    pathAz: "/idareetme",
    pathEn: "/administration",
    keywords: [
        "AzTU idarəetmə",
        "AzTU administration",
        "AzTU rektorluq",
        "AzTU struktur",
        "AzTU prorektorluq",
    ],
});

export default function AdministrationLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
