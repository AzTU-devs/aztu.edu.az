"use client";

import { motion, useScroll } from "framer-motion";

export default function NewsScrollProgress() {
    const { scrollYProgress } = useScroll();
    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#1a2355] via-blue-400 to-[#ee7c7e] z-[60] origin-left"
            style={{ scaleX: scrollYProgress }}
        />
    );
}
