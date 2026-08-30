import SectionHub from "@/components/shared/SectionHub";

export default function TedqiqatTedqiqatFealiyyetiHubPage() {
    return (
        <SectionHub
            sectionSlug="research"
            hubSlugs={["tedqiqat-fealiyyeti", "research-activity"]}
            fallbackTitle={{ az: "Tədqiqat Fəaliyyəti", en: "Research Activity" }}
            parent={{
                label: { az: "Tədqiqat", en: "Research" },
                href: { az: "/az/tedqiqat", en: "/en/research" },
            }}
        />
    );
}
