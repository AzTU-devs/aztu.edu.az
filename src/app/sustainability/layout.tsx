import type { Metadata } from "next";
import { buildMetadata } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "Davamlılıq | AzTU",
    titleEn: "Sustainability | AzTU",
    descriptionAz:
        "AzTU-nun davamlılıq siyasəti, BMT-nin Davamlı İnkişaf Məqsədləri (SDG) üzrə fəaliyyətlər və ekoloji təşəbbüslər.",
    descriptionEn:
        "AzTU sustainability policy, activities aligned with UN Sustainable Development Goals (SDGs) and environmental initiatives.",
    pathAz: "/sustainability",
    pathEn: "/sustainability",
    keywords: ["AzTU davamlılıq", "AzTU sustainability", "SDG", "AzTU ESG", "green university"],
});

export default function SustainabilityLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
