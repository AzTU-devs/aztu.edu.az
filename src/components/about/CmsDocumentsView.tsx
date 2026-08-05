"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DownloadIcon from "@mui/icons-material/Download";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionIcon from "@mui/icons-material/Description";
import ApartmentIcon from "@mui/icons-material/Apartment";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CategoryIcon from "@mui/icons-material/Category";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { useLanguage } from "@/context/LanguageContext";
import {
    getAboutPage,
    incrementDocumentView,
} from "@/services/aboutService/aboutService";
import { getImageUrl } from "@/services/departmentService/departmentService";
import type { AboutDocOrganization, AboutPage } from "@/types/about";

const COPY = {
    az: {
        documentsCount: "sənəd",
        organizationsCount: "təşkilat",
        categoriesCount: "kateqoriya",
        searchPlaceholder: "Sənəd axtar...",
        allOrgs: "Bütün təşkilatlar",
        allCategories: "Bütün kateqoriyalar",
        organizationLabel: "Təşkilat",
        categoryLabel: "Kateqoriya",
        view: "Bax",
        download: "Yüklə",
        openTab: "Yeni pəncərədə aç",
        close: "Bağla",
        showing: "Göstərilir",
        of: "/",
        clearFilters: "Filtri sıfırla",
        empty: "Sənəd tapılmadı",
        emptyHint: "Hazırda bu səhifədə heç bir sənəd yoxdur.",
        noResults: "Nəticə tapılmadı",
        noResultsHint: "Axtarış sözünü dəyişin və ya filtri sıfırlayın.",
        previewUnavailable: "Önizləmə mövcud deyil",
        previewHint: "Sənədi yeni pəncərədə açın və ya yükləyin.",
        loading: "Yüklənir...",
        pdfDocument: "PDF sənəd",
    },
    en: {
        documentsCount: "documents",
        organizationsCount: "organizations",
        categoriesCount: "categories",
        searchPlaceholder: "Search documents...",
        allOrgs: "All organizations",
        allCategories: "All categories",
        organizationLabel: "Organization",
        categoryLabel: "Category",
        view: "View",
        download: "Download",
        openTab: "Open in new tab",
        close: "Close",
        showing: "Showing",
        of: "of",
        clearFilters: "Clear filters",
        empty: "No documents yet",
        emptyHint: "There are no documents on this page at the moment.",
        noResults: "No results found",
        noResultsHint: "Try a different search term or clear the filter.",
        previewUnavailable: "Preview unavailable",
        previewHint: "Open the document in a new tab or download it instead.",
        loading: "Loading...",
        pdfDocument: "PDF document",
    },
} as const;

/** A document flattened into exactly what the cards + modal consume. */
interface NormalizedDoc {
    id: number;
    title: string;
    /** Resolved file URL (absolute), or "" when the CMS has no file. */
    url: string;
    org: AboutDocOrganization | null;
    categoryKey: string | null;
    categoryLabel: string | null;
}

/** Append PDF viewer params so an inline preview reads as a clean thumbnail. */
function thumbSrc(url: string): string {
    return `${url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`;
}

interface CmsDocumentsViewProps {
    pageKey: string;
    /** Policy page shows a category dropdown; sustainability page does not. */
    showCategories?: boolean;
}

export default function CmsDocumentsView({
    pageKey,
    showCategories = false,
}: CmsDocumentsViewProps) {
    const { lang } = useLanguage();
    const c = COPY[lang];

    const [page, setPage] = useState<AboutPage | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [active, setActive] = useState<NormalizedDoc | null>(null);
    const [query, setQuery] = useState("");
    const [orgFilter, setOrgFilter] = useState<string>("all");
    const [catFilter, setCatFilter] = useState<string>("all");

    useEffect(() => {
        let cancelled = false;
        setLoaded(false);
        getAboutPage(pageKey, lang).then((result) => {
            if (cancelled) return;
            setPage(result);
            setLoaded(true);
        });
        return () => {
            cancelled = true;
        };
    }, [pageKey, lang]);

    // Lock scroll + wire Escape while the preview modal is open.
    useEffect(() => {
        if (!active) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setActive(null);
        };
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", onKey);
        };
    }, [active]);

    const orgs = useMemo<AboutDocOrganization[]>(
        () => page?.doc_organizations ?? [],
        [page]
    );

    const orgByKey = useMemo(() => {
        const m: Record<string, AboutDocOrganization> = {};
        for (const o of orgs) m[o.organization_key] = o;
        return m;
    }, [orgs]);

    const catByKey = useMemo(() => {
        const m: Record<string, string | null> = {};
        for (const cat of page?.doc_categories ?? []) m[cat.category_key] = cat.name;
        return m;
    }, [page]);

    const docs = useMemo<NormalizedDoc[]>(() => {
        const list = page?.documents ?? [];
        return list.map((d) => ({
            id: d.id,
            title: d.name ?? "",
            url: getImageUrl(d.file_url),
            org: d.organization_key ? orgByKey[d.organization_key] ?? null : null,
            categoryKey: d.category_key,
            categoryLabel: d.category_key ? catByKey[d.category_key] ?? null : null,
        }));
    }, [page, orgByKey, catByKey]);

    const orgsInUse = useMemo(() => {
        const keys = new Set(
            docs.map((d) => d.org?.organization_key).filter(Boolean) as string[]
        );
        return orgs.filter((o) => keys.has(o.organization_key));
    }, [docs, orgs]);

    const filtered = useMemo(() => {
        const locale = lang === "az" ? "az" : "en";
        const q = query.trim().toLocaleLowerCase(locale);
        return docs.filter((d) => {
            if (orgFilter !== "all" && d.org?.organization_key !== orgFilter)
                return false;
            if (showCategories && catFilter !== "all" && d.categoryKey !== catFilter)
                return false;
            if (!q) return true;
            const hay = `${d.title} ${d.org?.name ?? ""} ${
                d.categoryLabel ?? ""
            }`.toLocaleLowerCase(locale);
            return hay.includes(q);
        });
    }, [docs, orgFilter, catFilter, query, showCategories, lang]);

    const isFiltered =
        orgFilter !== "all" || catFilter !== "all" || query.trim().length > 0;

    const clearFilters = () => {
        setOrgFilter("all");
        setCatFilter("all");
        setQuery("");
    };

    const openPreview = (doc: NormalizedDoc) => {
        setActive(doc);
        incrementDocumentView(doc.id);
    };

    const onDownload = (doc: NormalizedDoc) => {
        incrementDocumentView(doc.id);
    };

    const isEmpty = loaded && docs.length === 0;

    return (
        <>
            {/* STAT + CONTROLS STRIP */}
            <section className="px-4 md:px-10 lg:px-20 pt-12">
                <div className="max-w-[1400px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 items-stretch">
                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-5 grid grid-cols-2 gap-3 md:gap-4"
                        >
                            <div className="flex items-center gap-3 md:gap-4 bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border-2 border-[#1a2355]/15 dark:border-white/10 p-4 md:p-5">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#1a2355] text-white flex items-center justify-center shrink-0">
                                    <DescriptionIcon sx={{ fontSize: 24 }} />
                                </div>
                                <div className="min-w-0">
                                    <div className="text-2xl md:text-3xl font-black text-[#1a2355] dark:text-white tabular-nums leading-none">
                                        {docs.length}
                                    </div>
                                    <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-bold mt-1.5">
                                        {c.documentsCount}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 md:gap-4 bg-white dark:bg-slate-900/60 backdrop-blur-xl rounded-3xl border-2 border-[#1a2355]/15 dark:border-white/10 p-4 md:p-5">
                                <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#ee7c7e] text-white flex items-center justify-center shrink-0">
                                    {showCategories ? (
                                        <CategoryIcon sx={{ fontSize: 24 }} />
                                    ) : (
                                        <ApartmentIcon sx={{ fontSize: 24 }} />
                                    )}
                                </div>
                                <div className="min-w-0">
                                    <div className="text-2xl md:text-3xl font-black text-[#1a2355] dark:text-white tabular-nums leading-none">
                                        {showCategories
                                            ? page?.doc_categories?.length ?? 0
                                            : orgsInUse.length}
                                    </div>
                                    <p className="text-[10px] md:text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400 font-bold mt-1.5">
                                        {showCategories
                                            ? c.categoriesCount
                                            : c.organizationsCount}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Search */}
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.05 }}
                            className="lg:col-span-7 flex items-center"
                        >
                            <div className="relative group w-full">
                                <SearchIcon
                                    sx={{ fontSize: 20 }}
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-slate-500 pointer-events-none group-focus-within:text-[#ee7c7e] transition-colors"
                                />
                                <input
                                    type="search"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder={c.searchPlaceholder}
                                    className="w-full pl-14 pr-14 py-4 lg:py-5 rounded-3xl bg-white dark:bg-slate-900/60 border-2 border-[#1a2355]/15 dark:border-white/10 text-[#1a2355] dark:text-white placeholder:text-gray-400 dark:placeholder:text-slate-500 text-sm font-medium outline-none focus:border-[#ee7c7e] transition-colors shadow-sm"
                                />
                                {query && (
                                    <button
                                        type="button"
                                        onClick={() => setQuery("")}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 hover:bg-[#ee7c7e] hover:text-white text-[#1a2355] dark:text-white flex items-center justify-center transition-colors"
                                        aria-label={c.clearFilters}
                                    >
                                        <CloseIcon sx={{ fontSize: 16 }} />
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Filter dropdowns */}
                    {(orgsInUse.length > 0 ||
                        (showCategories && (page?.doc_categories?.length ?? 0) > 0)) && (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mt-5 flex flex-wrap items-center gap-3"
                        >
                            {orgsInUse.length > 0 && (
                                <Dropdown
                                    icon={<ApartmentIcon sx={{ fontSize: 16 }} />}
                                    value={orgFilter}
                                    onChange={setOrgFilter}
                                    options={[
                                        { value: "all", label: c.allOrgs },
                                        ...orgsInUse.map((o) => ({
                                            value: o.organization_key,
                                            label: o.name ?? o.organization_key,
                                        })),
                                    ]}
                                />
                            )}
                            {showCategories &&
                                (page?.doc_categories?.length ?? 0) > 0 && (
                                    <Dropdown
                                        icon={<CategoryIcon sx={{ fontSize: 16 }} />}
                                        value={catFilter}
                                        onChange={setCatFilter}
                                        options={[
                                            { value: "all", label: c.allCategories },
                                            ...(page?.doc_categories ?? []).map(
                                                (cat) => ({
                                                    value: cat.category_key,
                                                    label:
                                                        cat.name ?? cat.category_key,
                                                })
                                            ),
                                        ]}
                                    />
                                )}
                        </motion.div>
                    )}

                    {/* Showing N of M */}
                    {!isEmpty && (
                        <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-widest font-black text-[#1a2355]/60 dark:text-white/50">
                            <span>
                                {c.showing}{" "}
                                <span className="text-[#ee7c7e] tabular-nums">
                                    {filtered.length}
                                </span>{" "}
                                {c.of}{" "}
                                <span className="tabular-nums">{docs.length}</span>
                            </span>
                            {isFiltered && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="inline-flex items-center gap-2 text-[#ee7c7e] hover:text-[#1a2355] dark:hover:text-white transition-colors"
                                >
                                    <ClearAllIcon sx={{ fontSize: 14 }} />
                                    {c.clearFilters}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* GRID */}
            <section className="px-4 md:px-10 lg:px-20 py-10 pb-24">
                <div className="max-w-[1400px] mx-auto">
                    {isEmpty ? (
                        <EmptyState
                            icon={
                                <DescriptionIcon
                                    sx={{ fontSize: 32 }}
                                    className="text-[#1a2355]/40 dark:text-white/40"
                                />
                            }
                            title={c.empty}
                            hint={c.emptyHint}
                        />
                    ) : filtered.length === 0 ? (
                        <EmptyState
                            icon={
                                <SearchIcon
                                    sx={{ fontSize: 32 }}
                                    className="text-[#1a2355]/40 dark:text-white/40"
                                />
                            }
                            title={loaded ? c.noResults : c.loading}
                            hint={loaded ? c.noResultsHint : ""}
                            action={
                                loaded && isFiltered ? (
                                    <button
                                        type="button"
                                        onClick={clearFilters}
                                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1a2355] text-white text-xs font-black uppercase tracking-widest hover:bg-[#ee7c7e] transition-colors"
                                    >
                                        <ClearAllIcon sx={{ fontSize: 14 }} />
                                        {c.clearFilters}
                                    </button>
                                ) : null
                            }
                        />
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
                            {filtered.map((doc, i) => (
                                <DocumentCard
                                    key={doc.id}
                                    doc={doc}
                                    index={i}
                                    copy={c}
                                    onOpen={() => openPreview(doc)}
                                    onDownload={() => onDownload(doc)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* PREVIEW MODAL */}
            <AnimatePresence>
                {active && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-3 md:p-6 bg-black/70 backdrop-blur-sm"
                        onClick={() => setActive(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: 12 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: 12 }}
                            transition={{ duration: 0.25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-6xl h-[90vh] bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-white/10"
                        >
                            <div className="flex items-center gap-3 md:gap-4 p-3 md:p-4 border-b border-gray-200 dark:border-white/10">
                                <div className="w-10 h-10 rounded-xl bg-[#ee7c7e]/10 flex items-center justify-center shrink-0 border border-[#ee7c7e]/20 overflow-hidden">
                                    {active.org?.logo_url ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={getImageUrl(active.org.logo_url)}
                                            alt={active.org.name ?? ""}
                                            className="w-full h-full object-contain p-1"
                                        />
                                    ) : (
                                        <PictureAsPdfIcon
                                            sx={{ fontSize: 20 }}
                                            className="text-[#ee7c7e]"
                                        />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    {active.org?.name && (
                                        <span className="block text-[10px] font-black uppercase tracking-widest text-[#ee7c7e] truncate">
                                            {active.org.name}
                                        </span>
                                    )}
                                    <h2 className="text-sm md:text-base font-bold text-[#1a2355] dark:text-white line-clamp-2">
                                        {active.title}
                                    </h2>
                                </div>
                                {active.url && (
                                    <div className="hidden md:flex items-center gap-2">
                                        <a
                                            href={active.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={c.openTab}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#1a2355]/5 dark:bg-white/5 text-[#1a2355] dark:text-white hover:bg-[#ee7c7e]/10 hover:text-[#ee7c7e] border border-[#1a2355]/30 dark:border-white/10 transition-colors"
                                        >
                                            <OpenInNewIcon sx={{ fontSize: 14 }} />
                                            {c.openTab}
                                        </a>
                                        <a
                                            href={active.url}
                                            download={active.title || "document"}
                                            onClick={() => onDownload(active)}
                                            aria-label={c.download}
                                            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#ee7c7e] text-white hover:bg-[#d96b6d] transition-colors shadow-md"
                                        >
                                            <DownloadIcon sx={{ fontSize: 14 }} />
                                            {c.download}
                                        </a>
                                    </div>
                                )}
                                <button
                                    type="button"
                                    onClick={() => setActive(null)}
                                    aria-label={c.close}
                                    className="w-10 h-10 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 flex items-center justify-center text-[#1a2355] dark:text-white hover:bg-[#ee7c7e] hover:text-white transition-colors shrink-0"
                                >
                                    <CloseIcon sx={{ fontSize: 20 }} />
                                </button>
                            </div>

                            <div className="flex-1 bg-gray-100 dark:bg-[#0a0c1a] relative">
                                {active.url ? (
                                    <iframe
                                        key={active.url}
                                        src={active.url}
                                        title={active.title}
                                        className="absolute inset-0 w-full h-full"
                                    />
                                ) : (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                                        <div className="w-16 h-16 rounded-2xl bg-[#1a2355]/5 dark:bg-white/5 flex items-center justify-center mb-5">
                                            <PictureAsPdfIcon
                                                sx={{ fontSize: 32 }}
                                                className="text-[#1a2355]/40 dark:text-white/40"
                                            />
                                        </div>
                                        <h3 className="text-lg font-black text-[#1a2355] dark:text-white mb-2">
                                            {c.previewUnavailable}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-slate-400">
                                            {c.previewHint}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {active.url && (
                                <div className="md:hidden flex items-center gap-2 p-3 border-t border-gray-200 dark:border-white/10">
                                    <a
                                        href={active.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#1a2355]/5 dark:bg-white/5 text-[#1a2355] dark:text-white border border-[#1a2355]/30 dark:border-white/10"
                                    >
                                        <OpenInNewIcon sx={{ fontSize: 14 }} />
                                        {c.openTab}
                                    </a>
                                    <a
                                        href={active.url}
                                        download={active.title || "document"}
                                        onClick={() => onDownload(active)}
                                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#ee7c7e] text-white shadow-md"
                                    >
                                        <DownloadIcon sx={{ fontSize: 14 }} />
                                        {c.download}
                                    </a>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

/* ─────────────────────────── Sub-components ─────────────────────────── */

type DocCopy = (typeof COPY)[keyof typeof COPY];

interface DocumentCardProps {
    doc: NormalizedDoc;
    index: number;
    copy: DocCopy;
    onOpen: () => void;
    onDownload: () => void;
}

function DocumentCard({ doc, index, copy, onOpen, onDownload }: DocumentCardProps) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: Math.min(index * 0.025, 0.25) }}
            className="group relative flex flex-col h-full bg-white dark:bg-[#1e293b] rounded-3xl border-2 border-[#1a2355]/15 dark:border-white/10 shadow-sm hover:shadow-2xl hover:shadow-[#1a2355]/15 hover:border-[#ee7c7e] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
            {/* PREVIEW THUMBNAIL — click opens the modal */}
            <button
                type="button"
                onClick={onOpen}
                className="relative block w-full h-52 bg-gray-100 dark:bg-[#0a0c1a] overflow-hidden border-b border-[#1a2355]/10 dark:border-white/5"
                aria-label={`${copy.view}: ${doc.title}`}
            >
                {doc.url ? (
                    <>
                        <iframe
                            src={thumbSrc(doc.url)}
                            title={doc.title}
                            tabIndex={-1}
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-0 w-full h-[130%] -top-4"
                        />
                        {/* Transparent overlay guarantees clicks reach the button */}
                        <span className="absolute inset-0 bg-transparent group-hover:bg-[#1a2355]/5 transition-colors" />
                        <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1a2355]/85 text-white text-[9px] font-black uppercase tracking-widest backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            <VisibilityIcon sx={{ fontSize: 12 }} />
                            {copy.view}
                        </span>
                    </>
                ) : (
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-[#1a2355]/40 dark:text-white/30">
                        <PictureAsPdfIcon sx={{ fontSize: 44 }} />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                            {copy.pdfDocument}
                        </span>
                    </span>
                )}
            </button>

            <div className="flex flex-col flex-1 p-5">
                {/* ORG row */}
                {doc.org && (doc.org.logo_url || doc.org.name) && (
                    <div className="flex items-center gap-2.5 mb-3">
                        {doc.org.logo_url && (
                            <span className="w-9 h-9 rounded-xl bg-white border border-[#1a2355]/10 dark:border-white/10 flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={getImageUrl(doc.org.logo_url)}
                                    alt={doc.org.name ?? ""}
                                    className="w-full h-full object-contain p-1"
                                />
                            </span>
                        )}
                        {doc.org.name && (
                            <span className="text-[11px] font-black uppercase tracking-widest text-[#1a2355]/70 dark:text-white/60 truncate">
                                {doc.org.name}
                            </span>
                        )}
                    </div>
                )}

                {/* TITLE */}
                <button
                    type="button"
                    onClick={onOpen}
                    className="text-left text-base font-bold text-[#1a2355] dark:text-white leading-snug flex-1 group-hover:text-[#ee7c7e] transition-colors"
                >
                    {doc.title}
                </button>

                {/* CATEGORY badge */}
                {doc.categoryLabel && (
                    <div className="mt-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border bg-[#1a2355]/5 text-[#1a2355] border-[#1a2355]/15 dark:bg-white/5 dark:text-white/80 dark:border-white/10">
                            <CategoryIcon sx={{ fontSize: 11 }} />
                            {doc.categoryLabel}
                        </span>
                    </div>
                )}

                {/* FOOTER actions */}
                <div className="mt-5 pt-4 border-t border-[#1a2355]/10 dark:border-white/5 flex items-center gap-2">
                    <button
                        type="button"
                        onClick={onOpen}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest bg-[#1a2355]/5 dark:bg-white/5 text-[#1a2355] dark:text-white hover:bg-[#1a2355] hover:text-white transition-colors"
                    >
                        <VisibilityIcon sx={{ fontSize: 14 }} />
                        {copy.view}
                    </button>
                    {doc.url ? (
                        <a
                            href={doc.url}
                            download={doc.title || "document"}
                            onClick={onDownload}
                            className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest bg-[#ee7c7e] text-white hover:bg-[#d96b6d] transition-colors shadow-sm"
                        >
                            <DownloadIcon sx={{ fontSize: 14 }} />
                            {copy.download}
                        </a>
                    ) : (
                        <span className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-[11px] font-black uppercase tracking-widest bg-[#1a2355]/5 dark:bg-white/5 text-[#1a2355]/40 dark:text-white/30 cursor-not-allowed">
                            <DownloadIcon sx={{ fontSize: 14 }} />
                            {copy.download}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

interface DropdownProps {
    icon: React.ReactNode;
    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
}

function Dropdown({ icon, value, onChange, options }: DropdownProps) {
    return (
        <div className="relative inline-flex items-center">
            <span className="absolute left-3.5 text-[#1a2355]/60 dark:text-white/60 pointer-events-none">
                {icon}
            </span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="appearance-none pl-10 pr-10 py-2.5 rounded-full text-xs font-black uppercase tracking-widest bg-white dark:bg-slate-900/60 border-2 border-[#1a2355]/15 dark:border-white/10 text-[#1a2355] dark:text-white outline-none focus:border-[#ee7c7e] transition-colors cursor-pointer max-w-[240px] truncate"
            >
                {options.map((o) => (
                    <option key={o.value} value={o.value}>
                        {o.label}
                    </option>
                ))}
            </select>
            <ExpandMoreIcon
                sx={{ fontSize: 18 }}
                className="absolute right-3 text-[#1a2355]/60 dark:text-white/60 pointer-events-none"
            />
        </div>
    );
}

interface EmptyStateProps {
    icon: React.ReactNode;
    title: string;
    hint: string;
    action?: React.ReactNode;
}

function EmptyState({ icon, title, hint, action }: EmptyStateProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center text-center py-24 px-6 rounded-3xl border-2 border-dashed border-[#1a2355]/20 dark:border-white/10 bg-white/40 dark:bg-slate-900/40"
        >
            <div className="w-16 h-16 rounded-2xl bg-[#1a2355]/5 dark:bg-white/5 flex items-center justify-center mb-5">
                {icon}
            </div>
            <h3 className="text-lg font-black text-[#1a2355] dark:text-white mb-2">
                {title}
            </h3>
            {hint && (
                <p className="text-sm text-gray-500 dark:text-slate-400 mb-6">{hint}</p>
            )}
            {action}
        </motion.div>
    );
}
