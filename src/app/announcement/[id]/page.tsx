import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CampaignIcon from "@mui/icons-material/Campaign";

import SanitizedHtml from "@/components/shared/SanitizedHtml";
import NewsScrollProgress from "@/components/news/NewsScrollProgress";
import CopyLinkButton from "@/components/shared/CopyLinkButton";
import { fetchAnnouncementDetail, fetchAnnouncementList, type Lang } from "@/util/fetchers";
import { absUrl, SITE_URL } from "@/util/seo";
import { parseAnnouncementSlug, announcementSlug } from "@/util/slugify";

export const revalidate = 30;
export const dynamicParams = true;

function formatDate(iso: string | undefined, lang: Lang) {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString(lang === "en" ? "en-US" : "az-AZ", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

const UI = {
    az: {
        home: "Ana səhifə",
        announcements: "Elanlar",
        backToAnnouncements: "Elanlara qayıt",
        aboutAnnouncement: "Elan haqqında",
        date: "Tarix",
        share: "Paylaş",
        otherAnnouncements: "Digər elanlar",
        readMore: "Ətraflı oxu",
        allAnnouncements: "Bütün elanlar",
        noContent: "Məzmun mövcud deyil.",
    },
    en: {
        home: "Home",
        announcements: "Announcements",
        backToAnnouncements: "Back to announcements",
        aboutAnnouncement: "About this announcement",
        date: "Date",
        share: "Share",
        otherAnnouncements: "Other announcements",
        readMore: "Read more",
        allAnnouncements: "All announcements",
        noContent: "No content available.",
    },
} as const;

export default async function AnnouncementDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: slug } = await params;
    const numericId = parseAnnouncementSlug(slug);

    if (!Number.isFinite(numericId)) notFound();

    const cookieStore = await cookies();
    const lang: Lang = cookieStore.get("aztu-lang")?.value === "en" ? "en" : "az";
    const t = UI[lang];

    const [announcement, list] = await Promise.all([
        fetchAnnouncementDetail(String(numericId), lang),
        fetchAnnouncementList({ start: 0, end: 12, lang }),
    ]);

    if (!announcement) notFound();

    const title = announcement.title ?? "";
    const htmlContent = announcement.html_content ?? "";
    const listEntry = list.find((a) => (a.announcement_id ?? a.id) === numericId);
    const createdAt = announcement.published_date
        ?? announcement.created_at
        ?? listEntry?.published_date
        ?? listEntry?.created_at;
    const related = list
        .filter((a) => (a.announcement_id ?? a.id) !== numericId)
        .slice(0, 3);

    const heroSrc = announcement.image ? absUrl(announcement.image) : null;

    return (
        <>
            <NewsScrollProgress />

            <main className="min-h-screen bg-page dark:bg-[#0f172a]">
                {/* Hero */}
                <section className="relative bg-gradient-to-br from-[#060d1f] via-[#1a2355] to-[#0f2a4a] overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#ee7c7e]/10 blur-3xl pointer-events-none" />
                    {!heroSrc && (
                        <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-[0.04] pointer-events-none">
                            <CampaignIcon sx={{ fontSize: 340 }} />
                        </div>
                    )}

                    <div className="relative z-10 px-4 md:px-10 lg:px-20 pt-32 pb-12 max-w-7xl mx-auto">
                        <nav
                            aria-label="Breadcrumb"
                            className="flex items-center gap-1.5 text-white/40 text-xs mb-8 flex-wrap"
                        >
                            <Link href="/" className="hover:text-white/80 transition-colors">
                                {t.home}
                            </Link>
                            <ChevronRightIcon sx={{ fontSize: 14 }} />
                            <Link href="/announcement" className="hover:text-white/80 transition-colors">
                                {t.announcements}
                            </Link>
                            <ChevronRightIcon sx={{ fontSize: 14 }} />
                            <span className="text-white/60 truncate max-w-xs">{title}</span>
                        </nav>

                        {heroSrc ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                                <div className="order-1 lg:order-1">
                                    <div className="flex flex-wrap items-center gap-3 mb-5">
                                        {createdAt && (
                                            <time
                                                dateTime={createdAt}
                                                className="text-white/40 text-xs flex items-center gap-1"
                                            >
                                                <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                                {formatDate(createdAt, lang)}
                                            </time>
                                        )}
                                    </div>

                                    <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                        {title}
                                    </h1>
                                </div>

                                <figure className="relative order-2 lg:order-2 w-full">
                                    <Image
                                        src={heroSrc}
                                        alt={title}
                                        width={1280}
                                        height={720}
                                        sizes="(max-width: 1024px) 100vw, 600px"
                                        priority
                                        fetchPriority="high"
                                        className="block w-auto h-auto max-w-full max-h-[60vh] mx-auto rounded-2xl shadow-2xl"
                                    />
                                </figure>
                            </div>
                        ) : (
                            <div className="max-w-4xl">
                                <div className="flex flex-wrap items-center gap-3 mb-5">
                                    {createdAt && (
                                        <time
                                            dateTime={createdAt}
                                            className="text-white/40 text-xs flex items-center gap-1"
                                        >
                                            <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                            {formatDate(createdAt, lang)}
                                        </time>
                                    )}
                                </div>
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                    {title}
                                </h1>
                            </div>
                        )}
                    </div>
                </section>

                {/* Article */}
                <section className="px-4 md:px-10 lg:px-20 py-12 max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-10">
                        <article className="flex-1 min-w-0">
                            <p className="text-gray-800 dark:text-gray-200 text-lg md:text-xl leading-relaxed font-medium border-l-4 border-[#1a2355] pl-6 mb-10 bg-blue-50/60 dark:bg-slate-800/40 py-4 pr-4 rounded-r-xl">
                                {title}
                            </p>

                            {htmlContent ? (
                                <SanitizedHtml
                                    className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg"
                                    html={htmlContent}
                                />
                            ) : (
                                <p className="text-gray-400 italic">{t.noContent}</p>
                            )}

                            <div className="h-px bg-gradient-to-r from-[#1a2355]/30 via-gray-300 to-transparent mt-12 mb-8" />

                            <Link
                                href="/announcement"
                                className="inline-flex items-center gap-2 text-[#1a2355] dark:text-white font-semibold text-sm bg-white dark:bg-[#1e293b] rounded-xl px-4 py-2.5 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <ArrowBackIcon sx={{ fontSize: 18 }} />
                                {t.backToAnnouncements}
                            </Link>
                        </article>

                        <aside className="lg:w-72 xl:w-80 flex-shrink-0">
                            <div className="sticky top-24 space-y-4">
                                <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-md overflow-hidden">
                                    <div className="bg-gradient-to-r from-[#1a2355] to-[#13365E] px-5 py-4">
                                        <h2 className="text-white font-bold text-sm uppercase tracking-widest">
                                            {t.aboutAnnouncement}
                                        </h2>
                                    </div>
                                    <div className="p-5 space-y-4 text-sm">
                                        <div className="flex gap-3">
                                            <span className="text-gray-400 dark:text-gray-500 min-w-[72px]">{t.date}</span>
                                            <span className="text-[#1a2355] dark:text-white font-semibold">
                                                {createdAt ? formatDate(createdAt, lang) : "—"}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-md p-5 space-y-3">
                                    <h2 className="text-[#1a2355] dark:text-white font-bold text-sm uppercase tracking-widest">
                                        {t.share}
                                    </h2>
                                    <CopyLinkButton />
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>

                {related.length > 0 && (
                    <section className="bg-white dark:bg-[#1e293b] py-16 px-4 md:px-10 lg:px-20">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center gap-4 mb-10">
                                <h2 className="text-xl font-bold text-[#1a2355] dark:text-white flex-shrink-0">
                                    {t.otherAnnouncements}
                                </h2>
                                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-slate-600" />
                            </div>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
                                {related.map((item) => {
                                    const itemId = item.announcement_id ?? item.id;
                                    const itemDate = item.published_date ?? item.created_at;
                                    const itemImg = item.image ? absUrl(item.image) : null;
                                    return (
                                        <li
                                            key={itemId}
                                            className="group bg-gray-50 dark:bg-[#0f172a] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                                        >
                                            <Link href={`/announcement/${announcementSlug(itemId, item.title ?? "")}`}>
                                                {itemImg ? (
                                                    <div className="h-48 relative overflow-hidden">
                                                        <Image
                                                            src={itemImg}
                                                            alt={item.title ?? ""}
                                                            fill
                                                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="h-1 bg-[#1a2355]" />
                                                )}
                                                <div className="p-5 space-y-2">
                                                    {itemDate && (
                                                        <time
                                                            dateTime={itemDate}
                                                            className="flex items-center gap-1 text-gray-400 text-xs"
                                                        >
                                                            <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                                            <span>{formatDate(itemDate, lang)}</span>
                                                        </time>
                                                    )}
                                                    <h3 className="text-[#1a2355] dark:text-white font-bold text-sm leading-snug line-clamp-2 group-hover:underline decoration-[#1a2355]/30 underline-offset-2">
                                                        {item.title}
                                                    </h3>
                                                    <span className="flex items-center gap-1 text-[#1a2355] dark:text-[#5A9BD3] font-semibold text-xs pt-1">
                                                        {t.readMore}
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
                                    href="/announcement"
                                    className="flex items-center gap-2 border-2 border-[#1a2355] text-[#1a2355] dark:border-white dark:text-white font-bold px-8 py-3 rounded-xl hover:bg-[#1a2355] hover:text-white transition-colors duration-300"
                                >
                                    {t.allAnnouncements}
                                    <ChevronRightIcon sx={{ fontSize: 18 }} />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Script
                id={`ld-announcement-itemlist-${numericId}`}
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        itemListElement: related.map((r, i) => ({
                            "@type": "ListItem",
                            position: i + 1,
                            url: `${SITE_URL}/announcement/${announcementSlug(r.announcement_id ?? r.id, r.title ?? "")}`,
                            name: r.title,
                        })),
                    }),
                }}
            />
        </>
    );
}
