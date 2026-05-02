import type { Metadata } from "next";
import Script from "next/script";
import { STATIC_FACULTIES } from "@/data/staticFaculties";
import { buildMetadata, breadcrumbJsonLd, SITE_URL, SITE_NAME_AZ } from "@/util/seo";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://api-aztu.karamshukurlu.site";

interface ApiFaculty {
    id?: number;
    faculty_code?: string;
    title?: string;
    description?: string;
}

async function fetchFaculty(slug: string, lang: "az" | "en"): Promise<ApiFaculty | null> {
    try {
        const res = await fetch(`${API_BASE}/api/faculty/public/by-code/${encodeURIComponent(slug)}?lang=${lang}`, {
            headers: { "Accept-Language": lang },
            next: { revalidate: 1800 },
        });
        if (!res.ok) return null;
        const data = await res.json();
        if (data?.status_code !== 200) return null;
        return (data.faculty ?? data) as ApiFaculty;
    } catch {
        return null;
    }
}

function findStatic(slug: string) {
    const numeric = Number(slug);
    if (!Number.isNaN(numeric)) {
        return STATIC_FACULTIES.find((f) => f.faculty_id === numeric);
    }
    return STATIC_FACULTIES.find(
        (f) => f.short_name?.toLowerCase() === slug.toLowerCase()
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ facultyId: string }>;
}): Promise<Metadata> {
    const { facultyId } = await params;
    const [api, apiEn] = await Promise.all([fetchFaculty(facultyId, "az"), fetchFaculty(facultyId, "en")]);
    const stat = findStatic(facultyId);

    const titleAz = api?.title || stat?.name || `Fakültə`;
    const titleEn = apiEn?.title || stat?.name || `Faculty`;
    const descAz =
        api?.description ||
        stat?.description ||
        `${titleAz} — Azərbaycan Texniki Universitetinin (AzTU) fakültələrindən biri. İxtisaslar, kafedralar, akademik heyət və elaqe məlumatları.`;
    const descEn =
        apiEn?.description ||
        `${titleEn} at Azerbaijan Technical University (AzTU). Programs, departments, faculty staff and contact information.`;

    return buildMetadata({
        titleAz: `${titleAz.trim()} | AzTU`,
        titleEn: `${titleEn.trim()} | AzTU`,
        descriptionAz: descAz,
        descriptionEn: descEn,
        pathAz: `/faculties/${facultyId}`,
        pathEn: `/faculties/${facultyId}`,
        keywords: [
            titleAz,
            titleEn,
            "AzTU fakültə",
            "AzTU faculty",
            "Azərbaycan Texniki Universiteti",
            "Azerbaijan Technical University",
            "kafedra",
            "department",
            "ixtisas",
            "specialization",
        ],
    });
}

export default async function FacultyIdLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ facultyId: string }>;
}) {
    const { facultyId } = await params;
    const stat = findStatic(facultyId);
    const api = await fetchFaculty(facultyId, "az");
    const name = api?.title || stat?.name || "Fakültə";
    const description = api?.description || stat?.description || "";

    const departmentJsonLd = {
        "@context": "https://schema.org",
        "@type": "EducationalOrganization",
        "@id": `${SITE_URL}/faculties/${facultyId}#faculty`,
        name,
        url: `${SITE_URL}/faculties/${facultyId}`,
        description,
        parentOrganization: { "@id": `${SITE_URL}/#organization` },
    };

    const breadcrumb = breadcrumbJsonLd([
        { name: "Ana səhifə", path: "/" },
        { name: "Fakültələr", path: "/faculties" },
        { name, path: `/faculties/${facultyId}` },
    ]);

    return (
        <>
            <Script
                id={`ld-faculty-${facultyId}`}
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(departmentJsonLd) }}
            />
            <Script
                id={`ld-breadcrumb-faculty-${facultyId}`}
                type="application/ld+json"
                strategy="beforeInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            {children}
        </>
    );
}

export const dynamicParams = true;
export const revalidate = 1800;
void SITE_NAME_AZ;
