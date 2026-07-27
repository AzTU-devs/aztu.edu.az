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
    titleAz: "Prioritet Tədqiqat Sahələri | Azərbaycan Texniki Universiteti",
    titleEn: "Priority Research Areas | Azerbaijan Technical University",
    descriptionAz:
        "Azərbaycan Texniki Universitetinin strateji elmi hədəfləri — süni intellekt, enerji və nəqliyyat, qabaqcıl materiallar, kosmos və davamlı şəhərlər üzrə prioritet tədqiqat istiqamətləri.",
    descriptionEn:
        "Azerbaijan Technical University's strategic research priorities — artificial intelligence, energy and transport, advanced materials, space and sustainable cities.",
    pathAz: "/tedqiqat/tedqiqat-fealiyyeti/tedqiqat-prioritetleri",
    pathEn: "/research/research-activity/research-priorities",
    keywords: [
        "AzTU tədqiqat prioritetləri",
        "AzTU elmi istiqamətlər",
        "AzTU süni intellekt",
        "AzTU tədqiqat sahələri",
        "AzTU research priorities",
        "Azerbaijan Technical University research areas",
    ],
});

export default function ResearchPrioritiesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
