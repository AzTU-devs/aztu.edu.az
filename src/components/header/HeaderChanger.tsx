"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import SubHeader from "./SubHeader";
import QuickMenu from "../menu/QuickMenu";

export default function HeaderChanger() {
  const [showSubHeader, setShowSubHeader] = useState(false);
  const [isQuickMenuOpen, setIsQuickMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowSubHeader(window.scrollY > 0);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-[999]">
      {showSubHeader ? (
        <SubHeader />
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
