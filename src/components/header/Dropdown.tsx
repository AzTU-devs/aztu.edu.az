"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { MenuHeader } from "@/services/menu/menuService";
import { useTranslation } from "@/hooks/useTranslation";
import AzTUBg from "@/../public/aztu.png";

type Props = {
  header: MenuHeader;
  onClose?: () => void;
};

export default function Dropdown({ header, onClose }: Props) {
  const t = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
      className="absolute inset-x-0 top-full z-40 w-full overflow-hidden border-t border-[#1a2355]/15 bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] dark:border-[#ee7c7e]/15 dark:bg-[#0b1330] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)]"
    >
      {/* BACKGROUND DECORATIONS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.10] dark:opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(#ee7c7e 0.5px, transparent 0.5px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="absolute right-[-10%] top-[-10%] h-[60%] w-[60%] rounded-full bg-[#ee7c7e]/[0.04] blur-[120px] dark:bg-[#ee7c7e]/[0.08]" />
        <div className="absolute bottom-[-10%] left-[15%] h-[45%] w-[40%] rounded-full bg-[#1a2355]/[0.03] blur-[110px] dark:bg-blue-500/[0.04]" />

        {/* Brand watermark — keeps sparse sections from reading as an empty panel */}
        <div className="absolute bottom-4 right-10 select-none opacity-[0.035] dark:opacity-[0.028]">
          <span className="text-[190px] font-black leading-none tracking-tighter text-[#1a2355] dark:text-white">
            AzTU
          </span>
        </div>
      </div>

      {/*
        The panel height is locked so every menu opens at exactly the same size —
        only the column list inside scrolls when a section has more links.
      */}
      <div className="relative z-10 flex h-[clamp(380px,calc(100vh-170px),560px)] w-full gap-10 px-[80px] py-8 xl:px-[120px]">
        {/* LEFT: fixed feature banner — identical for every section */}
        <aside className="group/banner relative hidden w-[300px] shrink-0 overflow-hidden rounded-[1.75rem] shadow-xl ring-1 ring-black/5 lg:block xl:w-[360px] dark:ring-white/10">
          <Image
            src={AzTUBg}
            alt="AzTU"
            fill
            sizes="360px"
            className="object-cover transition-transform duration-[1200ms] group-hover/banner:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a2355] via-[#1a2355]/45 to-transparent dark:from-[#0b1330] dark:via-[#0b1330]/40" />

          <div className="absolute inset-x-0 bottom-0 p-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-xl">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ee7c7e] shadow-[0_0_10px_#ee7c7e]" />
              <span className="text-[9px] font-black uppercase tracking-[0.35em] text-white">
                {t.common.menu.section}
              </span>
            </div>

            <h3 className="mb-4 text-3xl font-black leading-[1.1] tracking-tight text-white xl:text-4xl">
              {header.title}
            </h3>

            {/* inline text-align beats the unlayered global `p { text-align: justify }` */}
            <p
              style={{ textAlign: "left" }}
              className="border-l-2 border-[#ee7c7e] pl-4 text-[12px] font-semibold leading-relaxed text-white/65"
            >
              {t.common.menu.tagline}
            </p>
          </div>
        </aside>

        {/* RIGHT: the only part that changes between sections */}
        <div className="dropdown-scroll min-w-0 flex-1 overflow-y-auto pr-1">
          <motion.div
            key={header.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="grid auto-rows-min grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 xl:grid-cols-3"
          >
            {header.items.map((item) => (
              <div key={item.id} className="flex min-w-0 flex-col">
                {/* Column heading */}
                <div className="mb-3 flex items-center gap-2.5 border-b border-[#1a2355]/12 pb-2.5 dark:border-white/10">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#ee7c7e]" />
                  {item.direct_url ? (
                    <Link
                      href={item.direct_url}
                      onClick={onClose}
                      className="min-w-0 truncate text-[12px] font-black uppercase tracking-[0.2em] text-[#1a2355] transition-colors hover:text-[#ee7c7e] dark:text-blue-300 dark:hover:text-[#ee7c7e]"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <span className="min-w-0 truncate text-[12px] font-black uppercase tracking-[0.2em] text-[#1a2355]/75 dark:text-white/55">
                      {item.title}
                    </span>
                  )}
                </div>

                {/* Column links */}
                {item.sub_items && item.sub_items.length > 0 ? (
                  <ul className="flex flex-col">
                    {item.sub_items.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          href={sub.direct_url}
                          onClick={onClose}
                          className="group/link -mx-2.5 flex items-center justify-between gap-3 rounded-xl px-2.5 py-[7px] text-[13.5px] font-semibold leading-snug text-gray-600 transition-colors duration-200 hover:bg-[#1a2355]/[0.04] hover:text-[#1a2355] dark:text-white/55 dark:hover:bg-white/[0.06] dark:hover:text-white"
                        >
                          <span className="min-w-0">{sub.title}</span>
                          <ChevronRightIcon
                            sx={{ fontSize: 15 }}
                            className="shrink-0 text-[#ee7c7e] opacity-0 transition-all duration-200 group-hover/link:translate-x-0.5 group-hover/link:opacity-100"
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  !item.direct_url && (
                    <p
                      style={{ textAlign: "left" }}
                      className="text-[12.5px] font-medium leading-relaxed text-gray-400 dark:text-white/30"
                    >
                      {t.common.menu.empty}
                    </p>
                  )
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
