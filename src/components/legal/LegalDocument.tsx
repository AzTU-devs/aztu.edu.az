"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Renderer for the site's legal documents (privacy policy, terms).
 *
 * A legal text is read differently from the rest of the site: people arrive
 * looking for one specific clause, need to cite it, and often print it. So it
 * gets numbered sections, a contents rail that jumps to them, real tables
 * rather than prose for the cookie and third-party disclosures, and anchors on
 * every heading so a paragraph can be linked to directly.
 */

export type Block =
    | { kind: "p"; text: string }
    | { kind: "ul"; items: string[] }
    | { kind: "ol"; items: string[] }
    | { kind: "table"; head: string[]; rows: string[][] }
    | { kind: "note"; text: string }
    | { kind: "contact"; rows: { label: string; value: string; href?: string }[] };

export type LegalSection = {
    id: string;
    title: string;
    blocks: Block[];
};

export type LegalDoc = {
    eyebrow: string;
    title: string;
    description: string;
    breadcrumb: string;
    updatedLabel: string;
    contentsLabel: string;
    intro: Block[];
    sections: LegalSection[];
    disclaimer: string;
};

const PROSE = "text-[15px] leading-[1.75] text-slate-600 md:text-base";

function BlockView({ block }: { block: Block }) {
    switch (block.kind) {
        case "p":
            return <p className={`text-flow ${PROSE}`}>{block.text}</p>;

        case "ul":
            return (
                <ul className={`space-y-2.5 ${PROSE}`}>
                    {block.items.map((item, i) => (
                        <li key={i} className="flex gap-3">
                            <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#ee7c7e]" />
                            <span className="min-w-0">{item}</span>
                        </li>
                    ))}
                </ul>
            );

        case "ol":
            return (
                <ol className={`space-y-2.5 ${PROSE}`}>
                    {block.items.map((item, i) => (
                        <li key={i} className="flex gap-3">
                            <span className="mt-[0.15em] grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-[#1a2355]/5 text-[11px] font-black tabular-nums text-[#1a2355]">
                                {i + 1}
                            </span>
                            <span className="min-w-0">{item}</span>
                        </li>
                    ))}
                </ol>
            );

        case "table":
            return (
                // Wide disclosure tables scroll inside their own box rather than
                // pushing the page sideways on a phone.
                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/10">
                    <table className="w-full min-w-[34rem] border-collapse text-left">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-white/5">
                                {block.head.map((h, i) => (
                                    <th
                                        key={i}
                                        scope="col"
                                        className="border-b border-slate-200 px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500 dark:border-white/10"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {block.rows.map((row, r) => (
                                <tr key={r} className="align-top">
                                    {row.map((cell, c) => (
                                        <td
                                            key={c}
                                            className={`border-b border-slate-100 px-4 py-3 text-[13.5px] leading-relaxed dark:border-white/5 ${
                                                c === 0
                                                    ? "font-bold text-[#1a2355]"
                                                    : "text-slate-600"
                                            }`}
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );

        case "note":
            return (
                <div className="rounded-2xl border-l-4 border-[#ee7c7e] bg-[#ee7c7e]/[0.07] px-5 py-4">
                    <p className={`text-flow ${PROSE}`}>{block.text}</p>
                </div>
            );

        case "contact":
            return (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {block.rows.map((row) => {
                        const body = (
                            <>
                                <span className="mb-1.5 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    {row.label}
                                </span>
                                <span className="block text-[15px] font-bold leading-snug text-[#1a2355]">
                                    {row.value}
                                </span>
                            </>
                        );
                        const shell =
                            "block rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-4 dark:border-white/10 dark:bg-white/5";
                        return row.href ? (
                            <a
                                key={row.label}
                                href={row.href}
                                className={`${shell} transition-colors hover:border-[#ee7c7e]/50`}
                            >
                                {body}
                            </a>
                        ) : (
                            <div key={row.label} className={shell}>
                                {body}
                            </div>
                        );
                    })}
                </div>
            );
    }
}

export default function LegalDocument({ doc }: { doc: LegalDoc }) {
    const { lang } = useLanguage();

    return (
        <main className="relative min-h-screen bg-page">
            <PageHero
                title={doc.title}
                description={doc.description}
                breadcrumbs={[{ label: doc.breadcrumb }]}
                eyebrow={doc.eyebrow}
            />

            <div className="mx-auto w-full max-w-[1600px] px-4 py-14 md:px-10 md:py-20 lg:px-20">
                <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
                    {/* Contents rail — a legal text is navigated, not read start to end. */}
                    <aside className="lg:w-[280px] lg:shrink-0">
                        <div className="lg:sticky lg:top-28">
                            <span className="mb-4 block text-[10px] font-black uppercase tracking-[0.28em] text-[#ee7c7e]">
                                {doc.contentsLabel}
                            </span>
                            <nav aria-label={doc.contentsLabel}>
                                <ol className="space-y-1">
                                    {doc.sections.map((section, i) => (
                                        <li key={section.id}>
                                            <a
                                                href={`#${section.id}`}
                                                className="group flex gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-[#1a2355]/5 dark:hover:bg-white/5"
                                            >
                                                <span className="text-[11px] font-black tabular-nums text-slate-400">
                                                    {String(i + 1).padStart(2, "0")}
                                                </span>
                                                <span className="min-w-0 text-[13px] font-bold leading-snug text-slate-600 transition-colors group-hover:text-[#1a2355] dark:group-hover:text-white">
                                                    {section.title}
                                                </span>
                                            </a>
                                        </li>
                                    ))}
                                </ol>
                            </nav>
                        </div>
                    </aside>

                    <div className="min-w-0 flex-1">
                        <div className="max-w-3xl">
                            <div className="mb-10 flex flex-wrap items-center gap-3">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#ee7c7e]/25 bg-[#ee7c7e]/10 px-4 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] text-[#ee7c7e]">
                                    {doc.updatedLabel}
                                </span>
                            </div>

                            <div className="mb-14 space-y-5 border-b border-slate-200 pb-12 dark:border-white/10">
                                {doc.intro.map((block, i) => (
                                    <BlockView key={i} block={block} />
                                ))}
                            </div>

                            <div className="space-y-14">
                                {doc.sections.map((section, index) => (
                                    <motion.section
                                        key={section.id}
                                        id={section.id}
                                        /* Never starts at opacity 0 — the text must be
                                           readable even if the animation never runs. */
                                        initial={{ y: 14 }}
                                        whileInView={{ y: 0 }}
                                        viewport={{ once: true, margin: "-60px" }}
                                        transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                                        className="scroll-mt-28"
                                    >
                                        <h2 className="mb-5 flex gap-4 text-xl font-black leading-tight tracking-tight text-[#1a2355] md:text-2xl">
                                            <span className="mt-[0.3em] text-[13px] font-black tabular-nums text-[#ee7c7e]">
                                                {String(index + 1).padStart(2, "0")}
                                            </span>
                                            <span className="min-w-0">{section.title}</span>
                                        </h2>
                                        <div className="space-y-5 pl-0 md:pl-9">
                                            {section.blocks.map((block, i) => (
                                                <BlockView key={i} block={block} />
                                            ))}
                                        </div>
                                    </motion.section>
                                ))}
                            </div>

                            <p
                                className="mt-16 border-t border-slate-200 pt-8 text-[13px] leading-relaxed text-slate-500 dark:border-white/10"
                                lang={lang}
                            >
                                {doc.disclaimer}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
