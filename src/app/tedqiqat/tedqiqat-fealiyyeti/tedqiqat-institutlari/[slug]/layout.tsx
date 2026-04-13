"use client";

import ResearchInstituteDetailLayout from "@/components/researchInstitute/ResearchInstituteDetailLayout";

interface Props {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

export default function Layout({ children, params }: Props) {
    return (
        <ResearchInstituteDetailLayout params={params}>
            {children}
        </ResearchInstituteDetailLayout>
    );
}
