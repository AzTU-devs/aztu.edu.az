"use client";

import Image from "next/image";
import { useState } from "react";
import Dropdown from "./Dropdown";
import { AnimatePresence } from "framer-motion";
import ListIcon from '@mui/icons-material/List';
import ShareIcon from "@mui/icons-material/Share";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv';
import AzTULogoDark from "@/../public/logo/aztu-logo-dark.png";
import AzTULogoLight from "@/../public/logo/aztu-logo-light.png";

type HeaderProps = {
  onOpenQuickMenu: () => void;
};

export default function Header({ onOpenQuickMenu }: HeaderProps) {

  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const isDropdownOpen = Boolean(activeMenu);

  const activeColor = "#224b8e";

  return (
    <header className="fixed top-0 left-0 w-full z-50 
bg-gradient-to-b from-[#0b1e3a]/90 via-[#0b1e3a]/60 to-transparent">
      <nav className="flex items-center justify-between w-full px-[120px] py-[20px]">
        <div>
          {isDropdownOpen ? (
            <Image src={AzTULogoDark} alt="AzTU" width={70} />
          ) : (
            <Image src={AzTULogoLight} alt="AzTU" width={70} />
          )}
        </div>

        <div>
          <div className="flex items-center justify-end mb-[20px]">
            <div
              className={`flex items-center rounded-[10px] p-[10px] transition-all duration-300 mr-[30px] cursor-pointer text-white font-bold ${isDropdownOpen ? "border-[#1a2355] bg-[#1a2355]" : "border-white hover:bg-white/30 bg-[#ffffff]/10"
                }`}
            >
              <PersonIcon
                sx={{
                  color: isDropdownOpen ? "#fff" : "#fff",
                  fontSize: 22,
                  marginRight: 1,
                  transition: "color 0.3s",
                }}
              />
              LMS
            </div>

            <div
              className={`flex items-center rounded-[10px] p-[10px] transition-all duration-300 mr-[30px] cursor-pointer text-white font-bold ${isDropdownOpen ? "border-[#1a2355] bg-[#1a2355] text-white" : "border-white hover:bg-white/30 bg-[#ffffff]/10"
                }`}
            >
              <SchoolIcon
                sx={{
                  color: isDropdownOpen ? "#fff" : "#fff",
                  fontSize: 22,
                  marginRight: 1,
                  transition: "color 0.3s",
                }}
              />
              Alumni
            </div>

            <div
              className={`flex items-center rounded-[10px] p-[10px] transition-all duration-300 mr-[30px] cursor-pointer text-white font-bold ${isDropdownOpen ? "border-[#1a2355]  bg-[#1a2355]" : "border-white hover:bg-white/30 bg-[#ffffff]/10"
                }`}
            >
              <ConnectedTvIcon
                sx={{
                  color: isDropdownOpen ? "#fff" : "#fff",
                  fontSize: 22,
                  marginRight: 1,
                  transition: "color 0.3s",
                }}
              />
              AzTU TV
            </div>

            <div
              className={`group w-[50px] h-[50px] flex items-center justify-center rounded-[10px] transition-all duration-300 mr-[30px] cursor-pointer text-white font-bold ${isDropdownOpen
                ? "border-[#1a2355] bg-[#1a2355]"
                : "hover:bg-white/30 bg-[#ffffff]/10"
                }`}
            >
              En
            </div>


            <div
              className={`flex items-center rounded-[10px] p-[10px] cursor-pointer transition-all duration-300 ${isDropdownOpen ? "border-[#1a2355] bg-[#1a2355]" : "hover:bg-white/30 bg-[#ffffff]/10"
                }`}
            >
              <ShareIcon
                sx={{
                  color: isDropdownOpen ? "#fff" : "#fff",
                  fontSize: 27,
                  transition: "color 0.3s",
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-end">
            <ul className="flex items-center">
              {[
                { key: "about", label: "Haqqımızda" },
                { key: "structure", label: "Struktur" },
                { key: "education", label: "Təhsil" },
                { key: "social", label: "Sosial" },
                { key: "media", label: "Media" },
              ].map((item) => (
                <li
                  key={item.key}
                  onMouseEnter={() => setActiveMenu(item.key)}
                  className={`text-[20px] font-bold mr-[30px] p-[10px] rounded-[20px] transition-all duration-300 cursor-pointer ${isDropdownOpen
                    ? "text-[#224b8e] hover:text-white hover:bg-[#224b8e]"
                    : "text-white hover:text-[#1a2355] hover:bg-white"
                    }`}
                >
                  {item.label}
                </li>
              ))}
            </ul>

            <div
              className={`w-[50px] h-[50px] flex items-center justify-center rounded-[10px] mr-[20px] transition-all duration-300 cursor-pointer ${isDropdownOpen ? "border-[#1a2355] bg-[#1a2355]" : "hover:bg-white/30 bg-[#ffffff]/10"
                }`}
            >
              <SearchIcon
                sx={{
                  color: isDropdownOpen ? "#fff" : "#fff",
                  fontSize: 30,
                  transition: "color 0.3s",
                }}
              />
            </div>

            <div
              onClick={onOpenQuickMenu}
              className="px-[20px] h-[50px] flex items-center justify-center rounded-[10px] cursor-pointer transition-all duration-300 hover:bg-white/30 bg-[#ffffff]/10"
            >
              <ListIcon
                sx={{
                  color: isDropdownOpen ? "#fff" : "#fff",
                  fontSize: 30,
                  transition: "color 0.3s",
                  marginRight: 2
                }}
              />
              <p
                className={`text-[18px] font-bold transition-colors ${isDropdownOpen ? "text-white" : "text-white"
                  }`}
              >
                Quick Menu
              </p>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {activeMenu && (
          <div
            onMouseLeave={() => setActiveMenu(null)}
            className="absolute top-full left-0 w-full"
          >
            <Dropdown
              title={activeMenu}
              elements={[
                { title: "Item 1", url: "#" },
                { title: "Item 2", url: "#" },
                { title: "Item 3", url: "#" },
                { title: "Item 4", url: "#" },
                { title: "Item 5", url: "#" },
                { title: "Item 6", url: "#" },
              ]}
            />
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
