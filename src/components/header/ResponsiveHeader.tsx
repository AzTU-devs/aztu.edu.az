import Image from "next/image"
import MenuIcon from "@mui/icons-material/Menu"
import SearchIcon from "@mui/icons-material/Search"
import AzTULogo from "@/../public/logo/aztu-logo-light.png"

export default function ResponsiveHeader() {
    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-[#0b1e3a]/90 via-[#0b1e3a]/60 to-transparent">
            <nav className="flex items-center justify-between w-full px-4 sm:px-6 md:px-10 lg:px-20 py-3 sm:py-4">

                {/* Menu Button */}
                <button className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/30 transition-all text-white">
                    <MenuIcon sx={{ fontSize: 26 }} />
                </button>

                {/* Logo */}
                <div className="flex-shrink-0">
                    <Image
                        src={AzTULogo}
                        alt="AzTU"
                        className="w-14 sm:w-16 md:w-[70px] h-auto"
                        priority
                    />
                </div>

                {/* Search Button */}
                <button className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 flex items-center justify-center rounded-lg bg-white/10 hover:bg-white/30 transition-all text-white">
                    <SearchIcon sx={{ fontSize: 26 }} />
                </button>
            </nav>
        </header>
    )
}
