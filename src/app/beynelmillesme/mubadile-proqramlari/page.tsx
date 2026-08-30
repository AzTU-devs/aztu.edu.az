import SectionHub from "@/components/shared/SectionHub";

export default function BeynelmillesmeMubadileProqramlariHubPage() {
    return (
        <SectionHub
            sectionSlug="internationalization"
            hubSlugs={["mubadile-proqramlari", "exchange-programs"]}
            fallbackTitle={{ az: "Mübadilə Proqramları", en: "Exchange Programs" }}
            parent={{
                label: { az: "Beynəlmiləlləşmə", en: "Internationalization" },
                href: { az: "/az/beynelmilellesme", en: "/en/internationalization" },
            }}
        />
    );
}
