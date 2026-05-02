import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import CampaignIcon from "@mui/icons-material/Campaign";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import SanitizedHtml from "@/components/shared/SanitizedHtml";
import NewsScrollProgress from "@/components/news/NewsScrollProgress";
import CopyLinkButton from "@/components/shared/CopyLinkButton";
import { fetchAnnouncementDetail, fetchAnnouncementList } from "@/util/fetchers";
import { absUrl } from "@/util/seo";
import { parseAnnouncementSlug, announcementSlug } from "@/util/slugify";

export const revalidate = 600;
export const dynamicParams = true;

const MONTHS_AZ = [
    "Yanvar", "Fevral", "Mart", "Aprel", "May", "İyun",
    "İyul", "Avqust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr",
];

function parseDate(iso?: string) {
    if (!iso) return { date: "", month: "", year: "" };
    const d = new Date(iso);
    return {
        date: String(d.getUTCDate()).padStart(2, "0"),
        month: MONTHS_AZ[d.getUTCMonth()],
        year: String(d.getUTCFullYear()),
    };
}

export default async function AnnouncementDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: slug } = await params;
    const numericId = parseAnnouncementSlug(slug);

    if (!Number.isFinite(numericId)) notFound();

    const [announcement, list] = await Promise.all([
        fetchAnnouncementDetail(String(numericId), "az"),
        fetchAnnouncementList({ start: 0, end: 12, lang: "az" }),
    ]);

    if (!announcement) notFound();
    const listEntry = list.find((a) => (a.announcement_id ?? a.id) === numericId);
    const createdAt = announcement.published_date
        ?? announcement.created_at
        ?? listEntry?.published_date
        ?? listEntry?.created_at;

    const related = list
        .filter((a) => (a.announcement_id ?? a.id) !== numericId)
        .slice(0, 3);

    const { date, month, year } = parseDate(createdAt);

    return (
        <>
            <NewsScrollProgress />

            <main className="min-h-screen bg-page">
                <section className="relative bg-gradient-to-br from-[#060d1f] via-[#1a2355] to-[#0f2a4a] overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#ee7c7e]/10 blur-3xl pointer-events-none" />
                    <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">
                        <CampaignIcon sx={{ fontSize: 340 }} />
                    </div>

                    <div className="relative z-10 px-4 md:px-10 lg:px-20 pt-36 pb-16">
                        <nav
                            aria-label="Breadcrumb"
                            className="flex items-center gap-1.5 text-white/40 text-xs mb-8 flex-wrap"
                        >
                            <Link href="/" className="hover:text-white/80 transition-colors">
                                Ana səhifə
                            </Link>
                            <ChevronRightIcon sx={{ fontSize: 14 }} />
                            <Link href="/announcements" className="hover:text-white/80 transition-colors">
                                Elanlar
                            </Link>
                            <ChevronRightIcon sx={{ fontSize: 14 }} />
                            <span className="text-white/60 truncate max-w-xs">{announcement.title}</span>
                        </nav>

                        {createdAt && (
                            <div className="flex flex-wrap items-center gap-3 mb-5">
                                <time
                                    dateTime={createdAt}
                                    className="text-white/40 text-xs flex items-center gap-1"
                                >
                                    <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                    {date} {month} {year}
                                </time>
                            </div>
                        )}

                        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">
                            {announcement.title}
                        </h1>
                    </div>
                </section>

                {announcement.image && (
                    <div className="px-4 md:px-10 lg:px-20 -mt-1 bg-gradient-to-b from-[#0f2a4a] to-transparent pb-10">
                        <div className="relative w-full h-64 md:h-[380px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src={absUrl(announcement.image)}
                                alt={announcement.title}
                                fill
                                sizes="(max-width: 1024px) 100vw, 1280px"
                                priority
                                fetchPriority="high"
                                className="object-cover"
                            />
                        </div>
                    </div>
                )}

                <section className="px-4 md:px-10 lg:px-20 py-14">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
                        <article className="flex-1 min-w-0">
                            {announcement.html_content ? (
                                <SanitizedHtml
                                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                                    html={announcement.html_content}
                                />
                            ) : (
                                <p className="text-gray-400 italic">Məzmun mövcud deyil.</p>
                            )}

                            <div className="h-px bg-gradient-to-r from-[#1a2355]/30 via-gray-300 to-transparent mt-12 mb-8" />
                        </article>

                        <aside className="lg:w-64 xl:w-72 flex-shrink-0 space-y-5">
                            <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
                                <h2 className="font-bold text-[#1a2355] text-sm uppercase tracking-widest">
                                    Elan haqqında
                                </h2>
                                {createdAt && (
                                    <div className="space-y-3 text-sm text-gray-500">
                                        <div className="flex items-start gap-2">
                                            <CalendarMonthIcon sx={{ fontSize: 16, color: "#1a2355", mt: "2px" }} />
                                            <span>{date} {month} {year}</span>
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="bg-white rounded-2xl shadow-md p-6 space-y-3">
                                <h2 className="font-bold text-[#1a2355] text-sm uppercase tracking-widest">
                                    Paylaş
                                </h2>
                                <CopyLinkButton />
                            </div>

                            <Link
                                href="/announcements"
                                className="flex items-center gap-2 text-[#1a2355] font-semibold text-sm bg-white rounded-xl px-4 py-3 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <ArrowBackIcon sx={{ fontSize: 18 }} />
                                Elanlara qayıt
                            </Link>
                        </aside>
                    </div>
                </section>

                {related.length > 0 && (
                    <section className="bg-white py-16 px-4 md:px-10 lg:px-20">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center gap-4 mb-10">
                                <h2 className="text-xl font-bold text-[#1a2355] flex-shrink-0">
                                    Əlaqəli elanlar
                                </h2>
                                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent" />
                            </div>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
                                {related.map((item) => {
                                    const rd = parseDate(item.published_date ?? item.created_at);
                                    const itemId = item.announcement_id ?? item.id;
                                    return (
                                        <li
                                            key={itemId}
                                            className="group bg-gray-50 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                                        >
                                            <Link href={`/announcements/${announcementSlug(itemId, item.title ?? "")}`}>
                                                <div className="h-1 bg-[#1a2355]" />
                                                <div className="p-5 space-y-3">
                                                    <time
                                                        dateTime={item.published_date ?? item.created_at}
                                                        className="flex items-center gap-1 text-gray-400 text-xs"
                                                    >
                                                        <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                                        <span>{rd.date} {rd.month} {rd.year}</span>
                                                    </time>
                                                    <h3 className="text-[#1a2355] font-bold text-sm leading-snug group-hover:underline decoration-[#1a2355]/30 underline-offset-2 line-clamp-3">
                                                        {item.title}
                                                    </h3>
                                                    <span className="flex items-center gap-1 text-[#1a2355] font-semibold text-xs pt-1">
                                                        Ətraflı oxu
                                                        <ChevronRightIcon
                                                            sx={{ fontSize: 14 }}
                                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                                        />
                                                    </span>
                                                </div>
                                            </Link>
                                        </li>
                                    );
                                })}
                            </ul>

                            <div className="flex justify-center mt-10">
                                <Link
                                    href="/announcements"
                                    className="flex items-center gap-2 border-2 border-[#1a2355] text-[#1a2355] font-bold px-8 py-3 rounded-xl hover:bg-[#1a2355] hover:text-white transition-colors duration-300"
                                >
                                    Bütün elanlar
                                    <ChevronRightIcon sx={{ fontSize: 18 }} />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}
