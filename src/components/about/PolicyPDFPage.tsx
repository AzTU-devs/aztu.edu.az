"use client";

import { useState } from "react";

import AboutPageBanner from "@/components/about/AboutPageBanner";
import SectionBlock from "@/components/shared/SectionBlock";
import DownloadIcon from "@mui/icons-material/Download";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import { motion } from "framer-motion";

interface PolicyPDFPageProps {
    title: string;
    subtitle: string;
    pdfUrl: string;
    downloadFilename: string;
}

export default function PolicyPDFPage({ title, subtitle, pdfUrl, downloadFilename }: PolicyPDFPageProps) {
    const [iframeError, setIframeError] = useState(false);

    return (
        <>
            <main className="min-h-screen bg-gray-50 dark:bg-[#0f172a]">
                <AboutPageBanner
                    eyebrow="Policies & Documents"
                    title={title}
                    subtitle={subtitle}
                    breadcrumbs={[
                        { label: "About", href: "/about" },
                        { label: title },
                    ]}
                />

                <div className="px-4 md:px-10 lg:px-20 py-10">
                    {/* Action bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-wrap items-center gap-3 mb-8"
                    >
                        <a
                            href={pdfUrl}
                            download={downloadFilename}
                            className="inline-flex items-center gap-2 bg-[#ee7c7e] hover:bg-[#d96b6d] text-white font-bold px-6 py-3 rounded-xl transition-colors duration-200 shadow-md"
                        >
                            <DownloadIcon sx={{ fontSize: 20 }} />
                            Download PDF
                        </a>
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-slate-700 text-[#1a2355] dark:text-white font-bold px-6 py-3 rounded-xl hover:shadow-md transition-all duration-200"
                        >
                            <OpenInNewIcon sx={{ fontSize: 18 }} />
                            Open in New Tab
                        </a>
                    </motion.div>

                    {/* PDF viewer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        {iframeError ? (
                            <SectionBlock>
                                <div className="flex flex-col items-center justify-center py-20 gap-5 text-center">
                                    <div className="w-20 h-20 rounded-full bg-[#1a2355]/10 dark:bg-[#1a2355]/20 flex items-center justify-center">
                                        <PictureAsPdfIcon sx={{ fontSize: 40, color: "#1a2355" }} />
                                    </div>
                                    <div>
                                        <p className="text-[#1a2355] dark:text-white font-bold text-lg mb-2">
                                            Preview not available in browser
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs">
                                            Use the download button above to view this document.
                                        </p>
                                    </div>
                                    <a
                                        href={pdfUrl}
                                        download={downloadFilename}
                                        className="inline-flex items-center gap-2 bg-[#1a2355] text-white font-bold px-8 py-3 rounded-xl hover:bg-[#1a2355]/90 transition-colors"
                                    >
                                        <DownloadIcon sx={{ fontSize: 20 }} />
                                        Download {downloadFilename}
                                    </a>
                                </div>
                            </SectionBlock>
                        ) : (
                            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 shadow-lg bg-white dark:bg-[#1e293b]">
                                <iframe
                                    src={pdfUrl}
                                    className="w-full"
                                    style={{ height: "82vh" }}
                                    title={title}
                                    onError={() => setIframeError(true)}
                                />
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>
            </>
    );
}
