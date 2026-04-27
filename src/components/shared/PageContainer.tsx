"use client";

import { motion } from "framer-motion";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  fullWidth?: boolean;
}

export default function PageContainer({
  children,
  className = "",
  delay = 0,
  fullWidth = false,
}: PageContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
      className={`relative z-10 px-4 md:px-10 lg:px-20 py-20 ${fullWidth ? 'max-w-none w-full' : 'max-w-[1600px] mx-auto w-full'} ${className}`}
    >
      {children}
    </motion.div>
  );
}
