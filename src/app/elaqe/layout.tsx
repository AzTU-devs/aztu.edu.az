import type { Metadata } from "next";
import Script from "next/script";
import { buildMetadata, SITE_URL, SITE_NAME_AZ, SITE_NAME_EN } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "Əlaqə | AzTU",
    titleEn: "Contact Us | AzTU",
    descriptionAz:
        "Azərbaycan Texniki Universiteti ilə əlaqə — ünvan, telefon, email və xəritə. H. Cavid prospekti 25, Bakı, Azərbaycan.",
    descriptionEn:
        "Contact Azerbaijan Technical University — address, phone, email and map. H. Javid Avenue 25, Baku, Azerbaijan.",
    pathAz: "/elaqe",
    keywords: [
        "AzTU əlaqə",
        "AzTU contact",
        "AzTU ünvan",
        "AzTU telefon",
        "AzTU email",
        "Azerbaijan Technical University contact",
    ],
});

const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${SITE_URL}/elaqe#contact`,
    url: `${SITE_URL}/elaqe`,
    name: "Əlaqə",
    inLanguage: ["az-AZ", "en-US"],
    mainEntity: {
        "@id": `${SITE_URL}/#organization`,
        "@type": "CollegeOrUniversity",
        name: SITE_NAME_AZ,
        alternateName: SITE_NAME_EN,
        email: "info@aztu.edu.az",
        telephone: "+994 12 539 13 48",
        address: {
            "@type": "PostalAddress",
            streetAddress: "H. Cavid prospekti 25",
            addressLocality: "Baku",
            postalCode: "AZ1073",
            addressCountry: "AZ",
        },
        geo: {
            "@type": "GeoCoordinates",
            latitude: 40.3756,
            longitude: 49.8278,
        },
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Script
                id="ld-contact"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
            />
            {children}
        </>
    );
}
