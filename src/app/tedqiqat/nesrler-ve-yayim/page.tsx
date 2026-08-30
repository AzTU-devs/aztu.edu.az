import SectionHub from "@/components/shared/SectionHub";

export default function TedqiqatNesrlerVeYayimHubPage() {
    return (
        <SectionHub
            sectionSlug="research"
            hubSlugs={["nesrler-ve-yayim", "publications-and-broadcasting"]}
            fallbackTitle={{ az: "Nəşrlər və Yayım", en: "Publications and Broadcasting" }}
            parent={{
                label: { az: "Tədqiqat", en: "Research" },
                href: { az: "/az/tedqiqat", en: "/en/research" },
            }}
        />
    );
}
