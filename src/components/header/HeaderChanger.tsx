"use client";

import dynamic from "next/dynamic";
import Header from "./Header";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const SubHeader = dynamic(() => import("./SubHeader"), { ssr: false });
const ResponsiveHeader = dynamic(() => import("./ResponsiveHeader"), { ssr: false });
const QuickMenu = dynamic(() => import("../menu/QuickMenu"), { ssr: false });
const SearchOverlay = dynamic(() => import("./SearchOverlay"), { ssr: false });

export default function HeaderChanger() {
  const pathname = usePathname();
  const [showSubHeader, setShowSubHeader] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    const onScroll = () => {
      setShowSubHeader(window.scrollY > 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  // Don't show the regular header on the virtual tour page
  if (pathname.includes("/virtual-tour")) return null;

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-[999]">
        {isMobile ? (
          <ResponsiveHeader />
        ) : showSubHeader ? (
          <SubHeader
            onOpenQuickMenu={() => setIsQuickMenuOpen(true)}
            onOpenSearch={openSearch}
          />
        ) : (
          <Header
            onOpenQuickMenu={() => setIsQuickMenuOpen(true)}
            onOpenSearch={openSearch}
          />
        )}

        <QuickMenu
          isOpen={isQuickMenuOpen}
          onClose={() => setIsQuickMenuOpen(false)}
        />
      </div>

      <SearchOverlay isOpen={isSearchOpen} onClose={closeSearch} />
    </>
  );
}
