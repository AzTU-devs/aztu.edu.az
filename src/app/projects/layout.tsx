import type { Metadata } from "next";
import { buildMetadata } from "@/util/seo";

export const metadata: Metadata = buildMetadata({
    titleAz: "Layihələr | AzTU",
    titleEn: "Projects | AzTU",
    descriptionAz:
        "AzTU-nun elmi-tədqiqat, beynəlxalq, sənaye və tələbə layihələri — innovasiya, qrant və əməkdaşlıq fəaliyyətləri.",
    descriptionEn:
        "AzTU research, international, industrial and student projects — innovation, grant and cooperation activities.",
    pathAz: "/projects",
    pathEn: "/projects",
    keywords: ["AzTU layihələr", "AzTU projects", "AzTU research projects", "Erasmus projects"],
});

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
