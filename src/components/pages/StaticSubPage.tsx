"use client";

import Link from "next/link";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import { NavSection, NavItem } from "@/config/navigation";

type Props = {
    section: NavSection;
    item: NavItem;
};

export default function StaticSubPage({ section, item }: Props) {
    return (
        <>
            <main className="min-h-screen bg-gray-50">
                {/* ── Dark Banner ── */}
                <div className="bg-[#1a2355] px-4 md:px-10 lg:px-20 pt-40 pb-12">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-1.5 text-white/50 text-sm mb-4 flex-wrap">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 15 }} />
                            Ana səhifə
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 14 }} />
                        <Link href={section.basePath} className="hover:text-white transition-colors capitalize">
                            {section.label}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 14 }} />
                        <span className="text-white/80">{item.title}</span>
                    </nav>

                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        {item.title}
                    </h1>
                    <p className="text-white/65 text-base max-w-2xl">
                        {item.description}
                    </p>
                </div>

                {/* ── Content ── */}
                <section className="px-4 md:px-10 lg:px-20 py-14">
                    <div className="max-w-4xl">
                        {/* Content card */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                            <p className="text-gray-700 text-base leading-relaxed">
                                {item.content}
                            </p>
                        </div>

                        {/* Other pages in this section */}
                        <div>
                            <h2 className="text-lg font-bold text-[#1a2355] mb-4">
                                {section.label} bölməsindəki digər səhifələr
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {section.items
                                    .filter((i) => i.slug !== item.slug)
                                    .map((other) => (
                                        <Link
                                            key={other.slug}
                                            href={`${section.basePath}/${other.slug}`}
                                            className="flex items-center justify-between bg-white border border-gray-100 rounded-xl px-5 py-3 hover:border-[#1a2355]/30 hover:shadow-md transition-all duration-200 group"
                                        >
                                            <span className="text-[#1a2355] font-medium text-sm">
                                                {other.title}
                                            </span>
                                            <ChevronRightIcon
                                                sx={{ fontSize: 18, color: "#1a2355", opacity: 0.4 }}
                                                className="transition-transform duration-200 group-hover:translate-x-1"
                                            />
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            </>
    );
}
