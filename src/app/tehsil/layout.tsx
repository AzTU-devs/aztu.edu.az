import { createMetadata } from "@/util/seo";

export const generateMetadata = createMetadata({
    titleAz: "Təhsil | AzTU",
    titleEn: "Education | AzTU",
    descriptionAz:
        "AzTU-da təhsil — bakalavr, magistratura və doktorantura proqramları, kredit sistemi, akademik təqvim, qiymətləndirmə qaydaları və CDIO yanaşması.",
    descriptionEn:
        "Education at AzTU — Bachelor's, Master's and doctoral programmes, credit system, academic calendar, assessment rules and CDIO approach.",
    pathAz: "/tehsil",
    pathEn: "/education",
    keywords: [
        "AzTU təhsil",
        "AzTU education",
        "AzTU bakalavr",
        "AzTU magistratura",
        "AzTU PhD",
        "AzTU credit system",
        "CDIO",
    ],
});

export default function TehsilLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
