"use client";

import Header from "./Header";
import SubHeader from "./SubHeader";
import QuickMenu from "../menu/QuickMenu";
import ResponsiveHeader from "./ResponsiveHeader";
import { useEffect, useState } from "react";

export default function HeaderChanger() {
  const [showSubHeader, setShowSubHeader] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024); // < lg breakpoint
    };

    const onScroll = () => {
      setShowSubHeader(window.scrollY > 0);
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[999]">
      {isMobile ? (
        <ResponsiveHeader />
      ) : showSubHeader ? (
        <SubHeader onOpenQuickMenu={() => setIsQuickMenuOpen(true)} />
      ) : (
        <Header onOpenQuickMenu={() => setIsQuickMenuOpen(true)} />
      )}

      <QuickMenu
        isOpen={isQuickMenuOpen}
        onClose={() => setIsQuickMenuOpen(false)}
      />
    </div>
  );
}
