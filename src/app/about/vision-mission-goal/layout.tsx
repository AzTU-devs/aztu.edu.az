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
    titleAz: "Vizyon, Missiya və Məqsəd | Azərbaycan Texniki Universiteti",
    titleEn: "Vision, Mission & Goal | Azerbaijan Technical University",
    descriptionAz:
        "Azərbaycan Texniki Universitetini (AzTU) xarakterizə edən əsas prinsiplər — vizyonumuz, missiyamız və strateji məqsədimiz.",
    descriptionEn:
        "The core principles that define Azerbaijan Technical University (AzTU) — our vision, our mission and our strategic goal.",
    pathAz: "/haqqimizda/vizyon-ve-missiya/vizyon-missiya-meqsed",
    pathEn: "/about/vision-mission/vision-mission-goal",
    keywords: [
        "AzTU vizyon",
        "AzTU missiya",
        "AzTU məqsəd",
        "AzTU vizyon missiya məqsəd",
        "AzTU haqqında",
        "AzTU vision",
        "AzTU mission",
        "AzTU goal",
        "Azerbaijan Technical University vision",
        "Azerbaijan Technical University mission",
    ],
});

export default function VisionMissionGoalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
