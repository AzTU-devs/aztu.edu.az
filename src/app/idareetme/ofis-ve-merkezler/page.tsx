import SectionHub from "@/components/shared/SectionHub";

export default function IdareetmeOfisVeMerkezlerHubPage() {
    return (
        <SectionHub
            sectionSlug="management"
            hubSlugs={["ofis-ve-merkezler", "offices-and-centers"]}
            fallbackTitle={{ az: "Ofis və Mərkəzlər", en: "Offices and Centers" }}
            parent={{
                label: { az: "İdarəetmə", en: "Management" },
                href: { az: "/az/idareetme", en: "/en/management" },
            }}
        />
    );
}
