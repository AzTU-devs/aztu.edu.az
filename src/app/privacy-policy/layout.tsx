import type { Metadata } from "next";
import { buildMetadata } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "Məxfilik siyasəti | AzTU",
    titleEn: "Privacy Policy | AzTU",
    descriptionAz:
        "AzTU rəsmi vebsaytının məxfilik siyasəti — şəxsi məlumatların toplanması, işlənməsi və qorunması haqqında.",
    descriptionEn:
        "Privacy policy of the official AzTU website — collection, processing and protection of personal data.",
    pathAz: "/privacy-policy",
    pathEn: "/privacy-policy",
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
