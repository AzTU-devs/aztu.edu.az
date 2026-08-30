import SectionHub from "@/components/shared/SectionHub";

export default function TedqiqatPerformansVeQiymetlendirmeHubPage() {
    return (
        <SectionHub
            sectionSlug="research"
            hubSlugs={["performans-ve-qiymetlendirme", "performance-and-evaluation"]}
            fallbackTitle={{ az: "Performans və Qiymətləndirmə", en: "Performance and Evaluation" }}
            parent={{
                label: { az: "Tədqiqat", en: "Research" },
                href: { az: "/az/tedqiqat", en: "/en/research" },
            }}
        />
    );
}
