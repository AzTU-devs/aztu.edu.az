import SectionHub from "@/components/shared/SectionHub";

export default function TedqiqatElmiJurnallarHubPage() {
    return (
        <SectionHub
            sectionSlug="research"
            hubSlugs={["elmi-jurnallar", "scientific-journals"]}
            fallbackTitle={{ az: "Elmi Jurnallar", en: "Scientific Journals" }}
            parent={{
                label: { az: "Tədqiqat", en: "Research" },
                href: { az: "/az/tedqiqat", en: "/en/research" },
            }}
        />
    );
}
