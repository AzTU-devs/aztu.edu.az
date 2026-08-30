
import HeiDetailLayout from "@/components/hei/HeiDetailLayout";
import { createMetadata } from "@/util/seo";

export const generateMetadata = createMetadata({
    titleAz: "Yüksək Təhsil İnstitutu (YTİ)",
    titleEn: "Higher Education Institute (HEI)",
    descriptionAz:
        "AzTU Yüksək Təhsil İnstitutu — magistratura və doktorantura səviyyələrində tədrisin, elmi-tədqiqat fəaliyyətinin təşkili və gənc tədqiqatçıların hazırlanması.",
    descriptionEn:
        "AzTU Higher Education Institute — coordination of master's and doctoral study, research activity and the training of early-career researchers.",
    pathAz: "/akademik/tehsil-ve-proqramlar/yuksek-tehsil-institutu-yti",
    pathEn: "/academic/education-and-programs/higher-education-institute-hei",
    localeUrls: {
        az: "/az/akademik/tehsil-ve-proqramlar/yuksek-tehsil-institutu-yti",
        en: "/en/academic/education-and-programs/higher-education-institute-hei",
    },
    keywords: [
        "YTİ",
        "Yüksək Təhsil İnstitutu",
        "AzTU doktorantura",
        "AzTU magistratura",
        "Higher Education Institute AzTU",
        "AzTU doctoral studies",
        "fəlsəfə doktoru",
        "elmlər doktoru",
    ],
});

export default function HeiLayout({ children }: { children: React.ReactNode }) {
    return <HeiDetailLayout>{children}</HeiDetailLayout>;
}
