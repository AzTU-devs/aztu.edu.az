import type { Metadata } from "next";
import Script from "next/script";
import { buildMetadata, SITE_URL } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "Tez-tez verilən suallar (FAQ) | AzTU",
    titleEn: "Frequently Asked Questions (FAQ) | AzTU",
    descriptionAz:
        "AzTU haqqında tez-tez verilən suallar — qəbul, ixtisaslar, kredit sistemi, yataqxana, təqaüd, beynəlxalq mübadilə proqramları və daha çox.",
    descriptionEn:
        "Frequently asked questions about AzTU — admissions, programmes, credit system, dormitory, scholarships, international exchange programmes and more.",
    pathAz: "/faq",
    pathEn: "/faq",
    keywords: ["AzTU FAQ", "AzTU sual cavab", "AzTU qəbul sualları", "AzTU admissions FAQ"],
});

const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/faq#faq`,
    mainEntity: [
        {
            "@type": "Question",
            name: "AzTU-ya necə qəbul olmaq olar?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "AzTU-ya qəbul Dövlət İmtahan Mərkəzinin (DİM) keçirdiyi mərkəzləşdirilmiş imtahanlar əsasında həyata keçirilir. Xarici tələbələr üçün ayrıca qəbul prosesi mövcuddur.",
            },
        },
        {
            "@type": "Question",
            name: "AzTU-da hansı təhsil pillələri vardır?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "AzTU-da bakalavr, magistratura və doktorantura təhsil pillələri üzrə proqramlar mövcuddur.",
            },
        },
        {
            "@type": "Question",
            name: "AzTU beynəlxalq mübadilə proqramları təklif edirmi?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "Bəli, AzTU Erasmus+, ikili diplom və ikitərəfli mübadilə proqramları çərçivəsində dünyanın bir çox aparıcı universitetləri ilə əməkdaşlıq edir.",
            },
        },
        {
            "@type": "Question",
            name: "AzTU hansı dillərdə təhsil verir?",
            acceptedAnswer: {
                "@type": "Answer",
                text: "AzTU-da təhsil əsasən Azərbaycan, ingilis və rus dillərində aparılır.",
            },
        },
    ],
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Script
                id="ld-faq"
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
            />
            {children}
        </>
    );
}
