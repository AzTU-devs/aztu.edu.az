import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CollectionsIcon from "@mui/icons-material/Collections";

import SanitizedHtml from "@/components/shared/SanitizedHtml";
import NewsScrollProgress from "@/components/news/NewsScrollProgress";
import NewsGallery from "@/components/news/NewsGallery";
import CopyLinkButton from "@/components/shared/CopyLinkButton";
import { parseNewsSlug, newsSlug } from "@/util/slugify";
import { fetchNewsDetail, fetchNewsList, type Lang } from "@/util/fetchers";
import { absUrl, SITE_URL } from "@/util/seo";

export const revalidate = 600;
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
        news: "Xəbərlər",
        images: "şəkil",
        backToNews: "Xəbərlərə qayıt",
        aboutNews: "Xəbər haqqında",
        date: "Tarix",
        category: "Kateqoriya",
        gallery: "Qalereya",
        share: "Paylaş",
        otherNews: "Digər xəbərlər",
        readMore: "Ətraflı oxu",
        allNews: "Bütün xəbərlər",
    },
    en: {
        home: "Home",
        news: "News",
        images: "images",
        backToNews: "Back to news",
        aboutNews: "About this news",
        date: "Date",
        category: "Category",
        gallery: "Gallery",
        share: "Share",
        otherNews: "Other news",
        readMore: "Read more",
        allNews: "All news",
    },
} as const;

export default async function NewsDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id: slug } = await params;
    const id = parseNewsSlug(slug);

    if (!Number.isFinite(id)) notFound();

    const cookieStore = await cookies();
    const lang: Lang = cookieStore.get("aztu-lang")?.value === "en" ? "en" : "az";
    const t = UI[lang];

    const [detail, list] = await Promise.all([
        fetchNewsDetail(id, lang),
        fetchNewsList({ start: 0, end: 12, lang }),
    ]);

    if (!detail) notFound();

    const azFallback = (a?: string, b?: string) => (a && a.trim() ? a : b ?? "");
    const title = lang === "en"
        ? azFallback(detail.title, azFallback(detail.en_title, detail.az_title))
        : azFallback(detail.title, detail.az_title);
    const htmlContent = lang === "en"
        ? azFallback(detail.html_content, azFallback(detail.en_html_content, detail.az_html_content))
        : azFallback(detail.html_content, detail.az_html_content);

    const listEntry = list.find((n) => n.news_id === id);
    const createdAt = detail.published_date ?? detail.created_at ?? listEntry?.created_at;
    const related = list.filter((n) => n.news_id !== id).slice(0, 3);

    const allImages = [detail.cover_image, ...(detail.gallery_images ?? []).map((g) => g.image)];
    const galleryAbs = allImages.map((img) => absUrl(img));
    const heroSrc = absUrl(detail.cover_image);

    return (
        <>
            <NewsScrollProgress />

            <main className="min-h-screen bg-page dark:bg-[#0f172a]">
                {/* Hero */}
                <section className="relative bg-gradient-to-br from-[#060d1f] via-[#1a2355] to-[#0f2a4a] overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#ee7c7e]/10 blur-3xl pointer-events-none" />

                    <div className="relative z-10 px-4 md:px-10 lg:px-20 pt-32 pb-12 max-w-7xl mx-auto">
                        <nav
                            aria-label="Breadcrumb"
                            className="flex items-center gap-1.5 text-white/40 text-xs mb-8 flex-wrap"
                        >
                            <Link href="/" className="hover:text-white/80 transition-colors">
                                {t.home}
                            </Link>
                            <ChevronRightIcon sx={{ fontSize: 14 }} />
                            <Link href="/news" className="hover:text-white/80 transition-colors">
                                {t.news}
                            </Link>
                            <ChevronRightIcon sx={{ fontSize: 14 }} />
                            <span className="text-white/60 truncate max-w-xs">{title}</span>
                        </nav>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                            {/* Left: title + meta */}
                            <div className="order-2 lg:order-1">
                                <div className="flex flex-wrap items-center gap-3 mb-5">
                                    {detail.category_id && (
                                        <span className="bg-white/15 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                                            {detail.category_id}
                                        </span>
                                    )}
                                    {createdAt && (
                                        <time
                                            dateTime={createdAt}
                                            className="text-white/40 text-xs flex items-center gap-1"
                                        >
                                            <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                            {formatDate(createdAt, lang)}
                                        </time>
                                    )}
                                    {allImages.length > 1 && (
                                        <span className="text-white/40 text-xs flex items-center gap-1">
                                            <CollectionsIcon sx={{ fontSize: 13 }} />
                                            {allImages.length} {t.images}
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                                    {title}
                                </h1>
                            </div>

                            {/* Right: cover image */}
                            <figure className="relative order-1 lg:order-2 w-full">
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
                                {allImages.length > 1 && (
                                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                        <CollectionsIcon sx={{ fontSize: 14 }} />
                                        {allImages.length} {t.images}
                                    </div>
                                )}
                            </figure>
                        </div>
                    </div>
                </section>

                {/* Article */}
                <section className="px-4 md:px-10 lg:px-20 py-12 max-w-6xl mx-auto">
                    <div className="flex flex-col lg:flex-row gap-10">
                        <article className="flex-1 min-w-0">
                            <p className="text-gray-800 dark:text-gray-200 text-lg md:text-xl leading-relaxed font-medium border-l-4 border-[#1a2355] pl-6 mb-10 bg-blue-50/60 dark:bg-slate-800/40 py-4 pr-4 rounded-r-xl">
                                {title}
                            </p>

                            <SanitizedHtml
                                className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg"
                                html={htmlContent}
                            />

                            <div className="h-px bg-gradient-to-r from-[#1a2355]/30 via-gray-300 to-transparent mt-12 mb-8" />

                            <Link
                                href="/news"
                                className="inline-flex items-center gap-2 text-[#1a2355] dark:text-white font-semibold text-sm bg-white dark:bg-[#1e293b] rounded-xl px-4 py-2.5 shadow-md hover:shadow-lg transition-shadow"
                            >
                                <ArrowBackIcon sx={{ fontSize: 18 }} />
                                {t.backToNews}
                            </Link>
                        </article>

                        <aside className="lg:w-72 xl:w-80 flex-shrink-0">
                            <div className="sticky top-24 space-y-4">
                                <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-md overflow-hidden">
                                    <div className="bg-gradient-to-r from-[#1a2355] to-[#13365E] px-5 py-4">
                                        <h2 className="text-white font-bold text-sm uppercase tracking-widest">
                                            {t.aboutNews}
                                        </h2>
                                    </div>
                                    <div className="p-5 space-y-4 text-sm">
                                        <div className="flex gap-3">
                                            <span className="text-gray-400 dark:text-gray-500 min-w-[72px]">{t.date}</span>
                                            <span className="text-[#1a2355] dark:text-white font-semibold">
                                                {createdAt ? formatDate(createdAt, lang) : "—"}
                                            </span>
                                        </div>
                                        {detail.category_id && (
                                            <>
                                                <div className="h-px bg-gray-100 dark:bg-slate-700" />
                                                <div className="flex gap-3">
                                                    <span className="text-gray-400 dark:text-gray-500 min-w-[72px]">
                                                        {t.category}
                                                    </span>
                                                    <span className="bg-[#1a2355] text-white text-xs font-bold px-2.5 py-1 rounded-full self-start">
                                                        {detail.category_id}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                        {allImages.length > 1 && (
                                            <>
                                                <div className="h-px bg-gray-100 dark:bg-slate-700" />
                                                <div className="flex gap-3">
                                                    <span className="text-gray-400 dark:text-gray-500 min-w-[72px]">
                                                        {t.gallery}
                                                    </span>
                                                    <span className="text-[#1a2355] dark:text-white font-semibold flex items-center gap-1.5">
                                                        <CollectionsIcon sx={{ fontSize: 15 }} />
                                                        {allImages.length} {t.images}
                                                    </span>
                                                </div>
                                            </>
                                        )}
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

                {galleryAbs.length > 1 && <NewsGallery images={galleryAbs} title={title} />}

                {related.length > 0 && (
                    <section className="bg-white dark:bg-[#1e293b] py-16 px-4 md:px-10 lg:px-20">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex items-center gap-4 mb-10">
                                <h2 className="text-xl font-bold text-[#1a2355] dark:text-white flex-shrink-0">
                                    {t.otherNews}
                                </h2>
                                <div className="flex-1 h-px bg-gradient-to-r from-gray-300 to-transparent dark:from-slate-600" />
                            </div>

                            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 list-none p-0">
                                {related.map((item) => (
                                    <li
                                        key={item.news_id}
                                        className="group bg-gray-50 dark:bg-[#0f172a] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                                    >
                                        <Link href={`/news/${newsSlug(item.news_id, item.title)}`}>
                                            <div className="h-48 relative overflow-hidden">
                                                <Image
                                                    src={absUrl(item.cover_image)}
                                                    alt={item.title}
                                                    fill
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                                {item.cateogry_id && (
                                                    <span className="absolute top-3 left-3 bg-[#1a2355] text-white text-xs font-bold px-2 py-1 rounded-lg">
                                                        {item.cateogry_id}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="p-5 space-y-2">
                                                <time
                                                    dateTime={item.created_at}
                                                    className="flex items-center gap-1 text-gray-400 text-xs"
                                                >
                                                    <CalendarMonthIcon sx={{ fontSize: 13 }} />
                                                    <span>{formatDate(item.created_at, lang)}</span>
                                                </time>
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
                                ))}
                            </ul>

                            <div className="flex justify-center mt-10">
                                <Link
                                    href="/news"
                                    className="flex items-center gap-2 border-2 border-[#1a2355] text-[#1a2355] dark:border-white dark:text-white font-bold px-8 py-3 rounded-xl hover:bg-[#1a2355] hover:text-white transition-colors duration-300"
                                >
                                    {t.allNews}
                                    <ChevronRightIcon sx={{ fontSize: 18 }} />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}
            </main>

            <Script
                id={`ld-news-itemlist-${id}`}
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        itemListElement: related.map((r, i) => ({
                            "@type": "ListItem",
                            position: i + 1,
                            url: `${SITE_URL}/news/${newsSlug(r.news_id, r.title)}`,
                            name: r.title,
                        })),
                    }),
                }}
            />
        </>
    );
}
