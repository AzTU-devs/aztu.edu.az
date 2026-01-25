"use client";

import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ConnectedTvIcon from "@mui/icons-material/ConnectedTv";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function QuickMenu({ isOpen, onClose }: Props) {
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
          <div
            className="absolute inset-0 bg-black/40"
            onClick={onClose}
          />

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
                z-50 bg-white p-[10px]
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
                {[
                  "İxtisaslar İnformasiya Sistemi",
                  "Daxili Qrant Müsabiqəsi",
                  "Plan Hesabat İnformasiya Sistemi",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="
                      px-4 py-2 bg-white rounded-[20px]
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
              {/* Top Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {[
                  { icon: PersonIcon, text: "LMS" },
                  { icon: SchoolIcon, text: "Alumni" },
                  { icon: ConnectedTvIcon, text: "AzTU TV" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="
                      flex items-center gap-2
                      bg-white text-[#1a2355]
                      p-3 rounded-lg font-bold
                      cursor-pointer
                      w-full sm:w-1/3
                      justify-center
                    "
                  >
                    <item.icon sx={{ color: "#1a2355" }} />
                    {item.text}
                  </div>
                ))}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  { icon: ImportContactsIcon, text: "Kitabxana" },
                  { icon: TrendingUpIcon, text: "Karyera və Məşğulluq" },
                  { icon: SchoolIcon, text: "Onlayn İmtahan" },
                  { icon: ImportContactsIcon, text: "Onlayn Apellasiya" },
                  { icon: TrendingUpIcon, text: "Elmi-Metodiki Şura" },
                  { icon: SchoolIcon, text: "Təkrar ali təhsil" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="
                      flex flex-col items-center justify-center
                      h-[120px]
                      text-white font-bold
                      border border-white/40
                      rounded-[20px]
                      hover:bg-white hover:text-[#5A9BD3]
                      transition cursor-pointer
                      text-center
                    "
                  >
                    <item.icon sx={{ fontSize: 30, color: "inherit" }} />
                    {item.text}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
