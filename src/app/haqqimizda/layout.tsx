import { createMetadata } from "@/util/seo";

/**
 * `/en/about/…` is rewritten onto this Azerbaijani folder, so this layout serves
 * both language trees and its metadata has to be localised — it previously
 * stamped an Azerbaijani title on every English About page.
 */
export const generateMetadata = createMetadata({
    titleAz: "Haqqımızda",
    titleEn: "About AzTU",
    descriptionAz:
        "Azərbaycan Texniki Universitetinin tarixi, missiyası, vizyonu, rəhbərliyi və beynəlxalq reytinqlərdəki mövqeyi haqqında məlumat.",
    descriptionEn:
        "The history, mission, vision and leadership of Azerbaijan Technical University, and its standing in the international rankings.",
    pathAz: "/haqqimizda",
    pathEn: "/about",
    localeUrls: { az: "/az/haqqimizda", en: "/en/about" },
    keywords: [
        "AzTU haqqında",
        "about AzTU",
        "Azərbaycan Texniki Universitetinin tarixi",
        "AzTU rektor",
        "AzTU vizyon missiya",
        "university rankings Azerbaijan",
    ],
});

export default function HaqqimizdaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
