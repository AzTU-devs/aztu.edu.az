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
    const half = Math.ceil(section.items.length / 2);
    const col1 = section.items.slice(0, half);
    const col2 = section.items.slice(half);

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

                {/* Right: 2-column link grid */}
                <div className="flex-1 flex gap-4">
                    {/* Column 1 */}
                    <motion.ul
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.04 } },
                        }}
                        className="flex-1 flex flex-col"
                    >
                        {col1.map((item) => (
                            <motion.li
                                key={item.slug}
                                variants={{
                                    hidden: { x: -8, opacity: 0 },
                                    show: { x: 0, opacity: 1 },
                                }}
                            >
                                <Link
                                    href={`${section.basePath}/${item.slug}`}
                                    className="block py-[9px] px-3 rounded-lg text-[15px] text-[#1a2355] dark:text-white font-medium hover:bg-[#f0f4ff] dark:hover:bg-[#1e293b] transition-colors duration-150"
                                >
                                    {item.title}
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>

                    {/* Vertical divider */}
                    <div className="w-px bg-gray-100 dark:bg-gray-700 self-stretch flex-shrink-0" />

                    {/* Column 2 */}
                    <motion.ul
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: {},
                            show: { transition: { staggerChildren: 0.04, delayChildren: 0.06 } },
                        }}
                        className="flex-1 flex flex-col"
                    >
                        {col2.map((item) => (
                            <motion.li
                                key={item.slug}
                                variants={{
                                    hidden: { x: -8, opacity: 0 },
                                    show: { x: 0, opacity: 1 },
                                }}
                            >
                                <Link
                                    href={`${section.basePath}/${item.slug}`}
                                    className="block py-[9px] px-3 rounded-lg text-[15px] text-[#1a2355] dark:text-white font-medium hover:bg-[#f0f4ff] dark:hover:bg-[#1e293b] transition-colors duration-150"
                                >
                                    {item.title}
                                </Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                </div>
            </div>
        </motion.div>
    );
}
