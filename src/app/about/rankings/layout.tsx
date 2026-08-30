import { createMetadata } from "@/util/seo";

/**
 * The rankings page previously inherited the About section's metadata, so it
 * shared its title with every other About page. It is one of the most-linked
 * pages on the site, so it carries its own.
 */
export const generateMetadata = createMetadata({
    titleAz: "Beynəlxalq Reytinqlər",
    titleEn: "International Rankings",
    descriptionAz:
        "AzTU-nun beynəlxalq reytinqlərdəki mövqeyi — QS Dünya Universitetləri Reytinqi 801–850, QS Avropa 476, Times Higher Education və UI GreenMetric 835 nəticələri.",
    descriptionEn:
        "AzTU's standing in the international rankings — QS World University Rankings 801–850, QS Europe 476, Times Higher Education, and UI GreenMetric 835.",
    pathAz: "/haqqimizda/reytinqler",
    pathEn: "/about/rankings",
    localeUrls: { az: "/az/haqqimizda/reytinqler", en: "/en/about/rankings" },
    keywords: [
        "AzTU reytinq",
        "AzTU rankings",
        "QS World University Rankings AzTU",
        "QS Europe 2026",
        "Times Higher Education AzTU",
        "UI GreenMetric AzTU",
        "Azerbaijan Technical University ranking",
        "Azərbaycan Texniki Universiteti reytinq",
    ],
});

export default function RankingsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
