import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Əlaqə | Contact Us",
    description:
        "Azərbaycan Texniki Universiteti ilə əlaqə — ünvan, telefon, email və xəritə. H. Cavid prospekti 25, Bakı, Azərbaycan.",
    keywords: ["AzTU əlaqə", "AzTU contact", "AzTU ünvan", "AzTU telefon", "AzTU email"],
    alternates: {
        canonical: "/az/elaqe",
        languages: {
            "az-AZ": "/az/elaqe",
            "en-US": "/en/contact-us",
            "x-default": "/az/elaqe",
        },
    },
    openGraph: {
        title: "Əlaqə | AzTU",
        description: "Bizimlə əlaqə saxlayın.",
        url: "/az/elaqe",
        type: "website",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
