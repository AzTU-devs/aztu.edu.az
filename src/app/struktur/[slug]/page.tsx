"use client";

import { useParams } from "next/navigation";
import { getSectionByKey, getItemBySlug } from "@/config/navigation";
import StaticSubPage from "@/components/pages/StaticSubPage";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const SECTION_KEY = "struktur";

export default function StruktурSlugPage() {
    const params = useParams();
    const slug = typeof params.slug === "string" ? params.slug : Array.isArray(params.slug) ? params.slug[0] : "";

    const section = getSectionByKey(SECTION_KEY);
    const item = section ? getItemBySlug(SECTION_KEY, slug) : undefined;

    if (!section || !item) {
        return (
            <>
                <HeaderChanger />
                <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
                    <h1 className="text-3xl font-bold text-[#1a2355] mb-4">Səhifə tapılmadı</h1>
                    <p className="text-gray-500 mb-8">Axtardığınız səhifə mövcud deyil.</p>
                    <Link href="/" className="flex items-center gap-1 bg-[#1a2355] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1a2355]/90 transition-colors">
                        Ana səhifəyə qayıt
                        <ChevronRightIcon sx={{ fontSize: 18 }} />
                    </Link>
                </main>
                <Footer />
            </>
        );
    }

    return <StaticSubPage section={section} item={item} />;
}
