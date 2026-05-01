import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "İcma | Community",
    description:
        "AzTU icması — fəxri doktorlar, qəhrəmanlarımız, sabiq rektorlar, kampus həyatı, klublar və idman.",
    keywords: ["AzTU icma", "AzTU community", "AzTU kampus həyatı", "AzTU klublar"],
    alternates: {
        canonical: "/az/community",
        languages: {
            "az-AZ": "/az/community",
            "en-US": "/en/community",
            "x-default": "/az/community",
        },
    },
    openGraph: {
        title: "İcma | AzTU",
        description: "AzTU icması və kampus həyatı.",
        url: "/az/community",
        type: "website",
    },
};

export default function CommunityLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
