import type { Metadata } from "next";
import { buildMetadata } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "Sosial həyat | AzTU",
    titleEn: "Student Life | AzTU",
    descriptionAz:
        "AzTU tələbə həyatı — klublar, idman, mədəniyyət, könüllülük və sosial fəaliyyətlər.",
    descriptionEn:
        "AzTU student life — clubs, sports, culture, volunteering and social activities.",
    pathAz: "/sosial",
    pathEn: "/student-life",
    keywords: ["AzTU sosial həyat", "AzTU student life", "AzTU klublar", "AzTU clubs"],
});

export default function SosialLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
