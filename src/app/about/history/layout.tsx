import type { Metadata } from "next";
import { buildMetadata } from "@/util/seo";

/**
 * Static per-page SEO.
 *
 * The page body is a Client Component (it reads the language context and
 * fetches the CMS payload in the browser), so metadata cannot come from that
 * fetch. These tags describe the page rather than its editable copy, which
 * means they stay correct no matter what an editor types.
 */
export const metadata: Metadata = buildMetadata({
    titleAz: "AzTU-nun Tarixi | Azərbaycan Texniki Universiteti",
    titleEn: "History of AzTU | Azerbaijan Technical University",
    descriptionAz:
        "Azərbaycan Texniki Universitetinin tarixi — 1887-ci ildə qoyulan texniki təhsilin əsasından bu günə qədər əsas mərhələlər.",
    descriptionEn:
        "The history of Azerbaijan Technical University — key milestones from the foundation of technical education in 1887 through to the present day.",
    pathAz: "/haqqimizda/vizyon-ve-missiya/aztu-nun-tarixi",
    pathEn: "/about/vision-mission/history-of-aztu",
    keywords: [
        "AzTU tarixi",
        "AzTU tarix",
        "Azərbaycan Texniki Universiteti tarixi",
        "AzTU mərhələləri",
        "AzTU 1950",
        "History of AzTU",
        "Azerbaijan Technical University history",
        "AzTU milestones",
    ],
});

export default function HistoryLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
