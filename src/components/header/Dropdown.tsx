"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import AzTU from "@/../public/aztu.png";
import { MenuInterface, MenuItemInterface } from "@/services/menu/menuService";

type DropdownItem = {
    item_id: number;
    url: string;
    display_order: number;
    title: string;
    created_at: string;
};

type Props = {
    title: string;
    elements: MenuItemInterface[];
};

export default function Dropdown({ title, elements }: Props) {
    return (
        <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full h-[600px] bg-white shadow-xl z-[-20] flex items-center justify-start"
        >
            <div className="flex items-start justify-start px-[20px] pt-[100px]">
                <div className="w-full">
                    <Image src={AzTU} alt="AzTU" className="rounded-[20px] w-full h-[300px]" />
                </div>
                <div className="w-[50%] flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold text-[#1a2355] mb-8">
                        {title}
                    </h2>
                    <motion.ul
                        initial="hidden"
                        animate="show"
                        variants={{
                            hidden: {},
                            show: {
                                transition: {
                                    staggerChildren: 0.08,
                                },
                            },
                        }}
                        className="grid grid-flow-row auto-rows-max grid-cols-1 sm:grid-cols-2 gap-2"
                    >
                        {elements.map((item, index) => (
                            <motion.li
                                key={index}
                                variants={{
                                    hidden: { y: -15, opacity: 0 },
                                    show: { y: 0, opacity: 1 },
                                }}
                                className="flex items-center gap-3 py-[5px] my-[2px] px-[20px] rounded-[10px] bg-transparent hover:bg-[#f5f6f9] transition-colors duration-300 cursor-pointer group"
                            >
                                <motion.span
                                    className="w-3 h-3 bg-blue-500 rounded-full flex-shrink-0 transform transition-transform duration-300 group-hover:scale-150"
                                />

                                <a
                                    href={item.url}
                                    className="text-lg text-[#1a2355] hover:text-blue-600 transition-colors"
                                >
                                    {item.title}
                                </a>
                            </motion.li>
                        ))}
                    </motion.ul>

                </div>
            </div>
        </motion.div>
    );
}
