"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const RIGHT_SECTIONS = [
  {
    title: "Platform",
    items: ["LMS", "Internal Grant Competition", "Plan Report Information System"],
  },
  {
    title: "Alumni",
    items: ["Career", "Honorary Doctors", "Honorary Graduates", "Our Heroes"],
  },
  {
    title: "Why AzTU?",
    items: ["Infrastructure", "Startups", "Dual Degree Diplomas", "Scholarships"],
  },
];

const LEFT_ITEMS = ["Ranking", "Accreditation", "Policies", "Reports", "FAQ"];

export default function QuickMenu({ isOpen, onClose }: Props) {
  const [activeSection, setActiveSection] = useState<string>(RIGHT_SECTIONS[0].title);

  const active = RIGHT_SECTIONS.find((s) => s.title === activeSection)!;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[999] flex justify-end"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />

          {/* MAIN CONTAINER */}
          <motion.div
            className="
              relative flex h-screen
              w-full sm:w-full md:w-[80%] lg:w-[60%]
              flex-col lg:flex-row
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Close Button */}
            <div
              className="
                absolute left-[-15px] top-[15px]
                sm:left-[-20px] sm:top-[20px]
                z-50 bg-white dark:bg-[#1e293b] p-[10px]
                rounded-full cursor-pointer
              "
              onClick={onClose}
            >
              <CloseIcon />
            </div>

            {/* LEFT PANEL */}
            <motion.div
              className="
                bg-[#1a2355]
                w-full lg:w-[30%]
                h-auto lg:h-screen
                p-[20px] sm:p-[30px]
              "
              initial={{ x: -40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-white font-bold text-[22px] sm:text-[25px] text-center mb-6">
                <span className="mr-2">AzTU</span> Quick Menu
              </h2>

              <div>
                {LEFT_ITEMS.map((item, i) => (
                  <div
                    key={i}
                    className="
                      px-4 py-2 bg-white dark:bg-[#1e293b] dark:text-white rounded-[20px]
                      my-3 font-bold cursor-pointer
                      transition-all
                      hover:bg-[#5A9BD3] hover:text-white
                      text-center
                    "
                  >
                    {item}
                  </div>
                ))}
              </div>

              <div className="mt-8 text-white font-bold space-y-3 text-center lg:text-left">
                <a href="mailto:aztu@aztu.edu.az" className="block">
                  aztu@aztu.edu.az
                </a>
                <a href="tel:+994125391305" className="block">
                  (+994 12) 539-13-05
                </a>
                <a href="tel:+994125383383" className="block">
                  (+994 12) 538-33-83
                </a>
              </div>

              <div className="flex justify-center lg:justify-start gap-3 mt-6">
                {[FacebookIcon, InstagramIcon, LinkedInIcon, YouTubeIcon].map(
                  (Icon, i) => (
                    <div
                      key={i}
                      className="
                        bg-white/30 w-[45px] h-[45px]
                        flex items-center justify-center
                        rounded-lg cursor-pointer
                      "
                    >
                      <Icon sx={{ color: "white", fontSize: 26 }} />
                    </div>
                  )
                )}
              </div>
            </motion.div>

            {/* RIGHT PANEL */}
            <motion.div
              className="
                bg-[#5A9BD3]/95
                w-full lg:w-[70%]
                h-screen overflow-y-auto
                px-4 sm:px-6 py-8 sm:py-12
              "
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              {/* Section tabs row */}
              <div className="flex gap-2 flex-wrap mb-6">
                {RIGHT_SECTIONS.map((section) => {
                  const isActive = activeSection === section.title;
                  return (
                    <button
                      key={section.title}
                      onClick={() => setActiveSection(section.title)}
                      className={`
                        px-5 py-2 rounded-full font-bold text-sm transition-all cursor-pointer
                        ${isActive
                          ? "bg-white text-[#1a2355]"
                          : "bg-white/20 text-white hover:bg-white/40"
                        }
                      `}
                    >
                      {section.title}
                    </button>
                  );
                })}
              </div>

              {/* Active section items */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-3"
                >
                  {active.items.map((item) => (
                    <div
                      key={item}
                      className="
                        px-6 py-4 rounded-2xl
                        bg-white/20 text-white font-semibold
                        hover:bg-white hover:text-[#1a2355]
                        transition-colors cursor-pointer
                      "
                    >
                      {item}
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
