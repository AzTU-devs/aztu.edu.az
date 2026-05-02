import type { Metadata } from "next";
import { buildMetadata } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "Beynəlxalq | AzTU",
    titleEn: "International | AzTU",
    descriptionAz:
        "AzTU-nun beynəlxalq əməkdaşlıqları, mübadilə proqramları, Erasmus, ikili diplom və xarici tələbələr üçün imkanlar.",
    descriptionEn:
        "AzTU international cooperation, exchange programmes, Erasmus, double-degree opportunities and information for international students.",
    pathAz: "/beynelxalq",
    pathEn: "/international",
    keywords: [
        "AzTU beynəlxalq",
        "AzTU international",
        "Erasmus AzTU",
        "double degree Azerbaijan",
        "AzTU exchange",
    ],
});

export default function BeynelxalqLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
