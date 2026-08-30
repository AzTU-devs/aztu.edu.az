import SectionHub from "@/components/shared/SectionHub";

export default function BeynelmillesmeXariciTelebelerHubPage() {
    return (
        <SectionHub
            sectionSlug="internationalization"
            hubSlugs={["xarici-telebeler", "foreign-students"]}
            fallbackTitle={{ az: "Xarici Tələbələr", en: "Foreign Students" }}
            parent={{
                label: { az: "Beynəlmiləlləşmə", en: "Internationalization" },
                href: { az: "/az/beynelmilellesme", en: "/en/internationalization" },
            }}
        />
    );
}
