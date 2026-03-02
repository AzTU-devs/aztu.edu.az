"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import AzTU from "@/../public/aztu.png";
import { NavSection } from "@/config/navigation";

type Props = {
    section: NavSection;
};

export default function Dropdown({ section }: Props) {
    return (
        <motion.div
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -16, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="w-full bg-white dark:bg-[#0f172a] shadow-2xl border-t border-gray-100 dark:border-gray-700"
        >
            <div className="flex items-stretch px-[80px] xl:px-[120px] py-8 gap-10">
                {/* Left: university image */}
                <div className="hidden lg:block w-[260px] xl:w-[300px] flex-shrink-0">
                    <Image
                        src={AzTU}
                        alt="AzTU"
                        className="w-full h-[220px] object-cover rounded-2xl"
                    />
                </div>

                {/* Right: hierarchical groups */}
                <div className="flex-1 flex flex-wrap gap-x-10 gap-y-5 content-start">
                    {section.items.map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05, duration: 0.18 }}
                            className="min-w-[160px]"
                        >
                            {/* Category title — link if it has a slug, plain header otherwise */}
                            {item.slug ? (
                                <Link
                                    href={`${section.basePath}/${item.slug}`}
                                    className="block text-[12px] font-bold uppercase tracking-wider text-[#1a2355] dark:text-white mb-2 hover:text-[#ee7c7e] dark:hover:text-[#ee7c7e] transition-colors"
                                >
                                    {item.title}
                                </Link>
                            ) : (
                                <span className="block text-[12px] font-bold uppercase tracking-wider text-[#1a2355] dark:text-white mb-2">
                                    {item.title}
                                </span>
                            )}

                            {/* Sub-items */}
                            {item.subItems && item.subItems.length > 0 && (
                                <ul className="flex flex-col gap-0.5">
                                    {item.subItems.map((sub) => (
                                        <li key={sub.slug}>
                                            <Link
                                                href={`${section.basePath}/${sub.slug}`}
                                                className="block py-[6px] px-2 rounded-lg text-[13px] text-[#1a2355]/75 dark:text-white/65 hover:bg-[#f0f4ff] dark:hover:bg-[#1e293b] hover:text-[#1a2355] dark:hover:text-white transition-colors duration-150"
                                            >
                                                {sub.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
