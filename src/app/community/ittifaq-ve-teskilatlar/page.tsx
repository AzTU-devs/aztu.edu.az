import SectionHub from "@/components/shared/SectionHub";

export default function CommunityIttifaqVeTeskilatlarHubPage() {
    return (
        <SectionHub
            sectionSlug="community"
            hubSlugs={["ittifaq-ve-teskilatlar", "unions-and-organizations"]}
            fallbackTitle={{ az: "İttifaq və Təşkilatlar", en: "Unions and Organizations" }}
            parent={{
                label: { az: "İcma", en: "Community" },
                href: { az: "/az/icma", en: "/en/community" },
            }}
        />
    );
}
