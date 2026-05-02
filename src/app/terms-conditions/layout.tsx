import type { Metadata } from "next";
import { buildMetadata } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "İstifadə şərtləri | AzTU",
    titleEn: "Terms & Conditions | AzTU",
    descriptionAz:
        "AzTU rəsmi vebsaytının istifadə şərtləri və qaydaları.",
    descriptionEn:
        "Terms and conditions for using the official AzTU website.",
    pathAz: "/terms-conditions",
    pathEn: "/terms-conditions",
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
