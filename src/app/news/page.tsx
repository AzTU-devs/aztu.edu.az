"use client";

import Image from "next/image";
import News1 from "@/../public/news/news-1.png";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";

interface NewsItem {
    id: number;
    title: string;
    desc: string;
    date: string;
    month: string;
    category: string;
    featured?: boolean;
}

const allNews: NewsItem[] = [
    {
        id: 1,
        title: "Çankaya Universitetinin professoru AzTU-da seminar keçirib",
        desc: "Türkiyənin Çankaya Universitetinin professoru Buket Akkoyunlu Azərbaycan Texniki Universitetində (AzTU) Müasir təhsil standartlarında süni intellektin tətbiqləri mövzusunda seminar keçirib.",
        date: "22",
        month: "Yanvar",
        category: "AzTU",
        featured: true,
    },
    {
        id: 2,
        title: "AzTU-da beynəlxalq konfrans keçirildi",
        desc: "Azərbaycan Texniki Universiteti müxtəlif ölkələrdən 200-dən çox alim və mütəxəssisi bir araya gətirən Mühəndislik Elmləri üzrə Beynəlxalq Konfransına ev sahibliyi etdi.",
        date: "18",
        month: "Yanvar",
        category: "Elm",
    },
    {
        id: 3,
        title: "Tələbələr robotika yarışmasında birincilik qazanıb",
        desc: "AzTU-nun tələbə komandası Bakıda keçirilən Milli Robotika Olimpiadasında birinci yerə layiq görülüb.",
        date: "15",
        month: "Yanvar",
        category: "Tələbə",
    },
    {
        id: 4,
        title: "Yeni Süni İntellekt Tədqiqat Mərkəzi açıldı",
        desc: "AzTU rəsmi olaraq Süni İntellekt Tədqiqat Mərkəzini açdı. Mərkəz tənqidi düşüncə qabiliyyəti olan sistemlər üzərində araşdırmalar aparacaq.",
        date: "10",
        month: "Yanvar",
        category: "Elm",
    },
    {
        id: 5,
        title: "Sənaye ilə əməkdaşlıq müqaviləsi imzalandı",
        desc: "AzTU aparıcı texnologiya şirkəti ilə tələbələrə praktiki təlim imkanları yaratmaq məqsədilə strateji tərəfdaşlıq müqaviləsi bağladı.",
        date: "07",
        month: "Yanvar",
        category: "Əməkdaşlıq",
    },
    {
        id: 6,
        title: "Bakalavr proqramlarına qəbul başladı",
        desc: "AzTU 2025-2026 tədris ili üçün bakalavr proqramlarına qəbul kampaniyasını rəsmi olaraq başlatdı. Müraciət son tarixi — 31 mart 2025.",
        date: "03",
        month: "Yanvar",
        category: "Qəbul",
    },
    {
        id: 7,
        title: "Professorlar heyəti beynəlxalq mükafat aldı",
        desc: "AzTU-nun elmi heyətindən iki professor dayanıqlı mühəndislik sahəsindəki fərqli töhfələrinə görə Avropa Texniki Elmlər Akademiyasının mükafatına layiq görülüb.",
        date: "28",
        month: "Dekabr",
        category: "AzTU",
    },
    {
        id: 8,
        title: "Kampus Yenilənmə Layihəsi başladı",
        desc: "Mövcud infrastrukturu modernləşdirmək üçün nəzərdə tutulmuş genişmiqyaslı kampus yeniləmə layihəsi rəsmi olaraq icraya başlanıldı.",
        date: "24",
        month: "Dekabr",
        category: "AzTU",
    },
    {
        id: 9,
        title: "Erasmus+ mübadiləsi proqramı genişləndirildi",
        desc: "AzTU Erasmus+ şəbəkəsinə 5 yeni Avropa universiteti əlavə etdi. Bu genişlənmə tələbələrə daha çox xarici mübadilə imkanı yaradır.",
        date: "20",
        month: "Dekabr",
        category: "Əməkdaşlıq",
    },
];

const categories = ["Hamısı", "AzTU", "Elm", "Tələbə", "Əməkdaşlıq", "Qəbul"];

const categoryColors: Record<string, string> = {
    AzTU: "bg-[#1a2355]",
    Elm: "bg-emerald-500",
    Tələbə: "bg-violet-500",
    Əməkdaşlıq: "bg-amber-500",
    Qəbul: "bg-[#ee7c7e]",
};

export default function NewsPage() {
    const [activeCategory, setActiveCategory] = useState("Hamısı");

    const filtered =
        activeCategory === "Hamısı"
            ? allNews
            : allNews.filter((n) => n.category === activeCategory);

    const featured = filtered[0];
    const rest = filtered.slice(1);

    return (
        <>
            <HeaderChanger />
            <main className="min-h-screen bg-gray-50">

                {/* ── Banner ── */}
                <div className="bg-[#1a2355] px-4 md:px-10 lg:px-20 py-16">
                    <p className="text-white/50 text-sm font-semibold uppercase tracking-widest mb-2">
                        Azərbaycan Texniki Universiteti
                    </p>
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">Xəbərlər</h1>
                    <p className="text-white/70 text-base max-w-xl">
                        AzTU-dakı ən son hadisələr, elmi nailiyyətlər və kampus yenilikləri ilə tanış olun.
                    </p>
                </div>

                {/* ── Category Filter ── */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
                    <div className="px-4 md:px-10 lg:px-20 flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`flex-shrink-0 px-5 py-2 rounded-xl font-bold text-sm transition-all duration-300 cursor-pointer ${
                                    activeCategory === cat
                                        ? "bg-[#1a2355] text-white shadow"
                                        : "bg-gray-100 text-[#1a2355] hover:bg-[#1a2355]/10"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="px-4 md:px-10 lg:px-20 py-10">

                    {filtered.length === 0 && (
                        <div className="text-center py-24 text-gray-400 font-semibold text-lg">
                            Bu kateqoriyada xəbər tapılmadı.
                        </div>
                    )}

                    {featured && (
                        <>
                            {/* ── Featured Card ── */}
                            <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-10 flex flex-col lg:flex-row cursor-pointer group">
                                {/* Image */}
                                <div className="lg:w-1/2 w-full h-72 lg:h-auto relative flex-shrink-0">
                                    <Image
                                        src={News1}
                                        alt={featured.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                </div>

                                {/* Content */}
                                <div className="flex flex-col justify-center px-8 py-8 gap-5 lg:w-1/2">
                                    {/* Badge */}
                                    <div className="flex items-center gap-3">
                                        <span className={`${categoryColors[featured.category] ?? "bg-[#1a2355]"} text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1`}>
                                            <LocalOfferIcon sx={{ fontSize: 13 }} />
                                            {featured.category}
                                        </span>
                                        <span className="text-gray-400 text-sm flex items-center gap-1">
                                            <CalendarMonthIcon sx={{ fontSize: 15 }} />
                                            {featured.date} {featured.month}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-[#1a2355] font-bold text-2xl md:text-3xl leading-snug group-hover:underline decoration-[#1a2355]/30 underline-offset-4">
                                        {featured.title}
                                    </h2>

                                    {/* Description */}
                                    <p className="text-gray-500 text-base leading-relaxed">
                                        {featured.desc}
                                    </p>

                                    {/* Read more */}
                                    <button className="group/btn flex items-center gap-1 text-[#1a2355] font-bold text-sm w-fit mt-2">
                                        Ətraflı oxu
                                        <ChevronRightIcon
                                            sx={{ fontSize: 18 }}
                                            className="transition-transform duration-300 group-hover/btn:translate-x-1"
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* ── Section Divider ── */}
                            {rest.length > 0 && (
                                <div className="flex items-center gap-4 mb-8">
                                    <h2 className="text-xl font-bold text-[#1a2355] flex-shrink-0">
                                        Digər xəbərlər
                                    </h2>
                                    <div className="flex-1 h-px bg-gray-200" />
                                </div>
                            )}
                        </>
                    )}

                    {/* ── News Grid ── */}
                    {rest.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {rest.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                                >
                                    {/* Image */}
                                    <div className="h-48 relative overflow-hidden">
                                        <Image
                                            src={News1}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* Category overlay */}
                                        <span className={`absolute top-3 left-3 ${categoryColors[item.category] ?? "bg-[#1a2355]"} text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1`}>
                                            <LocalOfferIcon sx={{ fontSize: 12 }} />
                                            {item.category}
                                        </span>
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col gap-3 flex-1">
                                        {/* Date */}
                                        <div className="flex items-center gap-1 text-gray-400 text-xs">
                                            <CalendarMonthIcon sx={{ fontSize: 14 }} />
                                            <span>{item.date} {item.month}</span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-[#1a2355] font-bold text-sm leading-snug flex-1 group-hover:underline decoration-[#1a2355]/30 underline-offset-2">
                                            {item.title}
                                        </h3>

                                        {/* Read more */}
                                        <button className="group/btn flex items-center gap-1 text-[#1a2355] font-semibold text-xs mt-auto w-fit">
                                            Ətraflı oxu
                                            <ChevronRightIcon
                                                sx={{ fontSize: 14 }}
                                                className="transition-transform duration-300 group-hover/btn:translate-x-1"
                                            />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* ── Load More ── */}
                    {filtered.length > 0 && (
                        <div className="flex justify-center mt-14">
                            <button className="group flex items-center gap-2 bg-[#1a2355] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#1a2355]/90 transition-colors duration-300 cursor-pointer">
                                Daha çox yüklə
                                <ChevronRightIcon className="rotate-90 transition-transform duration-300 group-hover:translate-y-1" />
                            </button>
                        </div>
                    )}

                </div>
            </main>
            <Footer />
        </>
    );
}
