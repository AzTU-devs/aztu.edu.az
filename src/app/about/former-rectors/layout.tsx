import type { Metadata } from "next";
import { buildMetadata } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "Sabiq rektorlar | Azərbaycan Texniki Universiteti",
    titleEn: "Former Rectors | Azerbaijan Technical University",
    descriptionAz:
        "Azərbaycan Texniki Universitetinin sabiq rektorları — universitetin tarixinə töhfə vermiş şəxsiyyətlər.",
    descriptionEn:
        "Former rectors of Azerbaijan Technical University — distinguished figures who shaped the history of the university.",
    pathAz: "/haqqimizda/rehbetlik-ve-idareetme/sabiq-rektorlarimiz",
    pathEn: "/about/leadership-and-management/former-rectors",
    keywords: ["AzTU sabiq rektorlar", "AzTU former rectors", "AzTU history rectors"],
});

export default function FormerRectorsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
