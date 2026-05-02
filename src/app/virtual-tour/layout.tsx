import type { Metadata } from "next";
import { buildMetadata } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "Virtual tur | AzTU",
    titleEn: "Virtual Tour | AzTU",
    descriptionAz:
        "AzTU kampusu üzrə 360° virtual tur — laboratoriyalar, kitabxana, auditoriyalar və idman zalları.",
    descriptionEn:
        "360° virtual tour of the AzTU campus — laboratories, library, lecture halls and sports facilities.",
    pathAz: "/virtual-tour",
    pathEn: "/virtual-tour",
    keywords: ["AzTU virtual tour", "AzTU 360", "AzTU kampus", "AzTU campus tour"],
});

export default function VirtualTourLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
