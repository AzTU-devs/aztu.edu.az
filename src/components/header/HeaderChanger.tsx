"use client";

import Header from "./Header";
import SubHeader from "./SubHeader";
import QuickMenu from "../menu/QuickMenu";
import ResponsiveHeader from "./ResponsiveHeader";
import SearchOverlay from "./SearchOverlay";
import { useEffect, useState } from "react";

export default function HeaderChanger() {
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
