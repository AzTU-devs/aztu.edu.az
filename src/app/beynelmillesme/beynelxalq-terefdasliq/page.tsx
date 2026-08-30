import SectionHub from "@/components/shared/SectionHub";

export default function BeynelmillesmeBeynelxalqTerefdasliqHubPage() {
    return (
        <SectionHub
            sectionSlug="internationalization"
            hubSlugs={["beynelxalq-terefdasliq", "international-partnership"]}
            fallbackTitle={{ az: "Beynəlxalq Tərəfdaşlıq", en: "International Partnership" }}
            parent={{
                label: { az: "Beynəlmiləlləşmə", en: "Internationalization" },
                href: { az: "/az/beynelmilellesme", en: "/en/internationalization" },
            }}
        />
    );
}
