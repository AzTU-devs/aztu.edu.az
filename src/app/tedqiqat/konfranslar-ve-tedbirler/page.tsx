import SectionHub from "@/components/shared/SectionHub";

export default function TedqiqatKonfranslarVeTedbirlerHubPage() {
    return (
        <SectionHub
            sectionSlug="research"
            hubSlugs={["konfranslar-ve-tedbirler", "conferences-and-events"]}
            fallbackTitle={{ az: "Konfranslar və Tədbirlər", en: "Conferences and Events" }}
            parent={{
                label: { az: "Tədqiqat", en: "Research" },
                href: { az: "/az/tedqiqat", en: "/en/research" },
            }}
        />
    );
}
