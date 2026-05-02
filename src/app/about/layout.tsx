import type { Metadata } from "next";
import { buildMetadata } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "Haqqımızda | Azərbaycan Texniki Universiteti",
    titleEn: "About | Azerbaijan Technical University",
    descriptionAz:
        "Azərbaycan Texniki Universiteti (AzTU) haqqında — tarix, missiya, vizyon, rəhbərlik, akkreditasiya, beynəlxalq reytinqlər və strateji plan.",
    descriptionEn:
        "About Azerbaijan Technical University (AzTU) — history, mission, vision, leadership, accreditation, international rankings and strategic plan.",
    pathAz: "/haqqimizda",
    pathEn: "/about",
    keywords: [
        "AzTU haqqında",
        "About AzTU",
        "AzTU tarix",
        "AzTU missiya",
        "AzTU vizyon",
        "AzTU rəhbərlik",
        "AzTU akkreditasiya",
        "AzTU reytinq",
        "Azerbaijan Technical University history",
        "Azerbaijan Technical University mission",
    ],
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
