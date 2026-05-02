import type { Metadata } from "next";
import { buildMetadata } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "Keyfiyyət təminatı | AzTU",
    titleEn: "Quality Assurance | AzTU",
    descriptionAz:
        "AzTU-da keyfiyyət təminatı sistemi — akkreditasiya, sənədlər, komitə, sorğular və daxili monitorinq mexanizmləri.",
    descriptionEn:
        "Quality assurance at AzTU — accreditation, documents, committee, surveys and internal monitoring mechanisms.",
    pathAz: "/kts",
    pathEn: "/qa",
    keywords: ["AzTU keyfiyyət", "AzTU quality assurance", "AzTU akkreditasiya", "KTS"],
});

export default function KtsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
