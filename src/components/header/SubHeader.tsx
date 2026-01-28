"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import ListIcon from '@mui/icons-material/List';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import CurvedLogo from "@/../public/logo/curved-logo.svg";

type HeaderProps = {
  onOpenQuickMenu: () => void;
};

export default function SubHeader({ onOpenQuickMenu }: HeaderProps) {
    return (
        <motion.header
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 left-0 w-full bg-white border-b-4 border-[#5A9BD3] z-50"
        >
            <nav className="flex flex-row items-center justify-between w-full px-4 sm:px-8 md:px-[100px] py-4 md:py-[20px] gap-2 md:gap-0 flex-wrap">
                {/* Menu */}
                <div className="flex items-center cursor-pointer gap-2">
                    <MenuIcon sx={{ color: "#5A9BD3", fontSize: 28, md: 30 }} />
                    <h2 className="text-[18px] md:text-[20px] font-bold text-[#5A9BD3]">
                        Menu
                    </h2>
                </div>

                {/* Search + Quick Menu */}
                <div className="flex items-center gap-2 md:gap-3 flex-wrap justify-end">
                    <div className="flex items-center justify-center border border-[#5A9BD3] p-2 md:p-[8px] h-[45px] md:h-[50px] w-[45px] md:w-[50px] rounded-lg hover:bg-[#5A9BD3] transition-all duration-300">
                        <SearchIcon sx={{ color: "#5A9BD3", fontSize: 22, md: 24 }} />
                    </div>

                    <div
                        onClick={onOpenQuickMenu}
                        className="px-3 md:px-[20px] h-[45px] md:h-[50px] flex items-center justify-center rounded-lg text-[#5A9BD3] font-bold hover:text-white cursor-pointer transition-all duration-300 hover:bg-[#5A9BD3] bg-[#ffffff]/10 gap-1 md:gap-2 whitespace-nowrap"
                    >
                        <ListIcon
                            sx={{
                                color: "#5A9BD3",
                                fontSize: 24,
                                md: 30,
                                transition: "color 0.3s",
                            }}
                        />
                        Quick Menu
                    </div>
                </div>
            </nav>

            {/* Curved logo on bottom center */}
            <div className="absolute left-1/2 bottom-[-12px] md:bottom-[-20px] -translate-x-1/2 translate-y-1/2 z-10 w-36 md:w-[200px]">
                <Image
                    src={CurvedLogo}
                    alt="AzTU"
                    className="w-full h-auto"
                    priority
                />
            </div>
        </motion.header>
    );
}
