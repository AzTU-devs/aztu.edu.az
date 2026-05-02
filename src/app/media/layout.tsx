import type { Metadata } from "next";
import { buildMetadata } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "Media | AzTU",
    titleEn: "Media | AzTU",
    descriptionAz:
        "AzTU media mərkəzi — foto, video, mətbuat materialları, brending və press-relizlər.",
    descriptionEn:
        "AzTU media centre — photos, videos, press materials, branding and press releases.",
    pathAz: "/media",
    pathEn: "/media",
    keywords: ["AzTU media", "AzTU press", "AzTU foto", "AzTU video"],
});

export default function MediaLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
