"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { MenuHeader } from "@/services/menu/menuService";

type Props = {
  header: MenuHeader;
};

export default function Dropdown({ header }: Props) {
  return (
    <motion.div
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -16, opacity: 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="w-full bg-white dark:bg-[#0f172a] shadow-2xl border-t border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-stretch px-[80px] xl:px-[120px] py-8 gap-10 max-w-screen-2xl mx-auto">
        {/* Left: section-specific image with overlay (if exists) */}
        {header.image_url && (
          <div className="hidden lg:block w-[260px] xl:w-[300px] flex-shrink-0 relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
            <AnimatePresence mode="wait">
              <motion.div
                key={header.id}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full h-full min-h-[220px] relative"
              >
                <Image
                  src={header.image_url}
                  alt={header.title}
                  fill
                  className="object-cover"
                  sizes="300px"
                  unoptimized // Use unoptimized if the image is from an external API and not in Next.js public
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a2355]/90 via-[#1a2355]/30 to-transparent" />

                {/* Section label on image */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-[#ee7c7e] text-[10px] font-black uppercase tracking-[0.25em] mb-1">
                    AzTU
                  </p>
                  <h3 className="text-white text-xl font-black leading-tight tracking-tight">
                    {header.title}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Right: hierarchical groups */}
        <div className="flex-1 flex flex-wrap gap-x-12 gap-y-8 content-start">
          {header.items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.18 }}
              className="min-w-[180px]"
            >
              {/* Level 2: Category title — link if it has direct_url, plain header otherwise */}
              {item.direct_url ? (
                <Link
                  href={item.direct_url}
                  className="block text-[11px] font-black uppercase tracking-[0.15em] text-[#1a2355] dark:text-white mb-3 hover:text-[#ee7c7e] dark:hover:text-[#ee7c7e] transition-colors"
                >
                  {item.title}
                </Link>
              ) : (
                <span className="block text-[11px] font-black uppercase tracking-[0.15em] text-[#1a2355]/40 dark:text-white/40 mb-3">
                  {item.title}
                </span>
              )}

              {/* Level 3: Sub-items */}
              {item.sub_items && item.sub_items.length > 0 && (
                <ul className="flex flex-col gap-0.5">
                  {item.sub_items.map((sub) => (
                    <li key={sub.id}>
                      <Link
                        href={sub.direct_url}
                        className="block py-1.5 px-2 rounded-xl text-[13.5px] font-bold text-[#1a2355]/80 dark:text-white/70 hover:bg-[#1a2355]/5 dark:hover:bg-white/5 hover:text-[#1a2355] dark:hover:text-white transition-all duration-200"
                      >
                        {sub.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
