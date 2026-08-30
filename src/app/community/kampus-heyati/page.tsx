import SectionHub from "@/components/shared/SectionHub";

export default function CommunityKampusHeyatiHubPage() {
    return (
        <SectionHub
            sectionSlug="community"
            hubSlugs={["kampus-heyati", "campus-life"]}
            fallbackTitle={{ az: "Kampus Həyatı", en: "Campus Life" }}
            parent={{
                label: { az: "İcma", en: "Community" },
                href: { az: "/az/icma", en: "/en/community" },
            }}
        />
    );
}
