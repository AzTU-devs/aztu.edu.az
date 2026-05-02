"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from "@mui/icons-material/Check";

export default function CopyLinkButton({ label = "Linki kopyala" }: { label?: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (typeof window !== "undefined") {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        }
    };

    return (
        <motion.button
            type="button"
            onClick={handleCopy}
            whileTap={{ scale: 0.96 }}
            aria-label={copied ? "Link kopyalandı" : "Linki kopyala"}
            className="w-full flex items-center justify-center gap-2 bg-[#1a2355] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#1a2355]/85 transition-colors cursor-pointer"
        >
            <AnimatePresence mode="wait">
                {copied ? (
                    <motion.span
                        key="copied"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5"
                    >
                        <CheckIcon sx={{ fontSize: 16 }} /> Kopyalandı!
                    </motion.span>
                ) : (
                    <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5"
                    >
                        <ContentCopyIcon sx={{ fontSize: 16 }} /> {label}
                    </motion.span>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
