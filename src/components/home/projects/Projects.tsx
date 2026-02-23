"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

interface ProjectInterface {
    title: string;
    description: string;
    category: string;
    year: string;
    color: string;
    accent: string;
}

const projects: ProjectInterface[] = [
    {
        title: "Smart Campus Infrastructure",
        description:
            "Development of an integrated digital campus management system using IoT sensors and AI-driven analytics.",
        category: "Digital Innovation",
        year: "2024",
        color: "bg-blue-50 border-blue-200",
        accent: "text-blue-600",
    },
    {
        title: "Renewable Energy Research",
        description:
            "Joint research project with international partners on solar and wind energy optimization for the Caspian region.",
        category: "Energy",
        year: "2024",
        color: "bg-emerald-50 border-emerald-200",
        accent: "text-emerald-600",
    },
    {
        title: "AI in Engineering Education",
        description:
            "Integrating artificial intelligence tools and curricula into undergraduate and postgraduate engineering programs.",
        category: "Education",
        year: "2023",
        color: "bg-purple-50 border-purple-200",
        accent: "text-purple-600",
    },
    {
        title: "Industrial Automation Lab",
        description:
            "Establishing a state-of-the-art industrial robotics and automation laboratory for student research and industry collaboration.",
        category: "Research",
        year: "2023",
        color: "bg-orange-50 border-orange-200",
        accent: "text-orange-600",
    },
];

export default function Projects() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

    return (
        <section
            ref={sectionRef}
            className="px-4 md:px-10 lg:px-20 py-16 bg-white relative overflow-hidden"
        >
            {/* Background accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4"
            >
                <div>
                    <p className="text-[#ee7c7e] text-xs font-bold uppercase tracking-[0.2em] mb-2">
                        Araşdırma &amp; İnnovasiya
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#1a2355] leading-tight">
                        Layihələr
                    </h2>
                </div>
                <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="group flex items-center gap-2 bg-[#1a2355] py-2.5 px-5 rounded-xl text-white font-bold cursor-pointer hover:bg-[#0b1330] transition-colors duration-300"
                >
                    Bütün Layihələr
                    <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1.5" />
                </motion.button>
            </motion.div>

            {/* Project Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {projects.map((project, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 40 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{
                            duration: 0.55,
                            ease: "easeOut",
                            delay: 0.1 + idx * 0.1,
                        }}
                        whileHover={{ y: -6, transition: { duration: 0.25 } }}
                        className={`group rounded-2xl border-2 p-6 flex flex-col gap-3 hover:shadow-xl transition-all duration-300 cursor-pointer ${project.color}`}
                    >
                        <div className="flex items-center justify-between">
                            <span className={`text-xs font-bold ${project.accent} bg-white/70 px-3 py-1 rounded-full`}>
                                {project.category}
                            </span>
                            <motion.div
                                initial={{ rotate: 0 }}
                                whileHover={{ rotate: 12 }}
                                transition={{ duration: 0.2 }}
                            >
                                <FolderOpenIcon sx={{ color: "#1a2355", opacity: 0.45, fontSize: 22 }} />
                            </motion.div>
                        </div>

                        <h3 className="text-[#1a2355] font-bold text-base leading-snug group-hover:text-[#1a2355]/80 transition-colors duration-300">
                            {project.title}
                        </h3>

                        <p className="text-gray-600 text-sm flex-1 leading-relaxed">
                            {project.description}
                        </p>

                        <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-1 text-gray-400 text-sm">
                                <CalendarMonthIcon sx={{ fontSize: 15 }} />
                                <span>{project.year}</span>
                            </div>
                            <ArrowOutwardIcon
                                sx={{ fontSize: 16 }}
                                className={`${project.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
