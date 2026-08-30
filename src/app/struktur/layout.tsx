import { createMetadata } from "@/util/seo";

export const generateMetadata = createMetadata({
    titleAz: "Struktur | AzTU",
    titleEn: "Structure | AzTU",
    descriptionAz:
        "Azərbaycan Texniki Universitetinin təşkilati strukturu — fakültələr, kafedralar, mərkəzlər və ofislər.",
    descriptionEn:
        "Organisational structure of Azerbaijan Technical University — faculties, departments, centres and offices.",
    pathAz: "/struktur",
    pathEn: "/structure",
    keywords: ["AzTU struktur", "AzTU structure", "AzTU təşkilati"],
});

export default function StrukturLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
