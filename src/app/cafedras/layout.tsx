import type { Metadata } from "next";
import { buildMetadata } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "Kafedralar | AzTU",
    titleEn: "Departments | AzTU",
    descriptionAz:
        "Azərbaycan Texniki Universitetinin kafedraları — kompüter elmləri, energetika, maşınqayırma, telekommunikasiya və digər ixtisas kafedraları.",
    descriptionEn:
        "Departments of Azerbaijan Technical University — computer science, energetics, mechanical engineering, telecommunications and other specialised departments.",
    pathAz: "/cafedras",
    pathEn: "/departments",
    keywords: [
        "AzTU kafedralar",
        "AzTU departments",
        "Azerbaijan Technical University departments",
        "kafedra",
        "department",
    ],
});

export default function CafedrasLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
