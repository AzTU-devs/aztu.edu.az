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
    titleAz: "Strateji İnkişaf Planı | Azərbaycan Texniki Universiteti",
    titleEn: "Strategic Development Plan | Azerbaijan Technical University",
    descriptionAz:
        "Azərbaycan Texniki Universitetinin 2030-cu ilə doğru strateji inkişaf planı — strateji sütunlar, korporativ dəyərlər və əsas performans göstəriciləri.",
    descriptionEn:
        "Azerbaijan Technical University's strategic development plan towards 2030 — strategic pillars, corporate values and key performance indicators.",
    pathAz: "/haqqimizda/vizyon-ve-missiya/strateji-plan",
    pathEn: "/about/vision-mission/strategic-plan",
    keywords: [
        "AzTU strateji plan",
        "AzTU inkişaf planı",
        "AzTU 2030",
        "AzTU strateji sütunlar",
        "AzTU KPI",
        "AzTU strategic plan",
        "Azerbaijan Technical University strategic development plan",
    ],
});

export default function StrategicPlanLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
