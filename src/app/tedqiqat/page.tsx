import SectionHub from "@/components/shared/SectionHub";

/**
 * The Research section root. It had no page of its own, so /az/tedqiqat and
 * /en/research both 404'd even though every child below them works — and the
 * sitemap listed the URL.
 */
export default function ResearchHubPage() {
    return (
        <SectionHub
            sectionSlug="research"
            hubSlugs={["tedqiqat", "research"]}
            fallbackTitle={{ az: "Tədqiqat", en: "Research" }}
            parent={{
                label: { az: "Ana səhifə", en: "Home" },
                href: { az: "/az", en: "/en" },
            }}
        />
    );
}
