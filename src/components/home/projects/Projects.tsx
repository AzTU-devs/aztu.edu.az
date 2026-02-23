"use client";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

interface ProjectInterface {
    title: string;
    description: string;
    category: string;
    year: string;
    color: string;
}

const projects: ProjectInterface[] = [
    {
        title: "Smart Campus Infrastructure",
        description: "Development of an integrated digital campus management system using IoT sensors and AI-driven analytics.",
        category: "Digital Innovation",
        year: "2024",
        color: "bg-blue-50 border-blue-200",
    },
    {
        title: "Renewable Energy Research",
        description: "Joint research project with international partners on solar and wind energy optimization for the Caspian region.",
        category: "Energy",
        year: "2024",
        color: "bg-green-50 border-green-200",
    },
    {
        title: "AI in Engineering Education",
        description: "Integrating artificial intelligence tools and curricula into undergraduate and postgraduate engineering programs.",
        category: "Education",
        year: "2023",
        color: "bg-purple-50 border-purple-200",
    },
    {
        title: "Industrial Automation Lab",
        description: "Establishing a state-of-the-art industrial robotics and automation laboratory for student research and industry collaboration.",
        category: "Research",
        year: "2023",
        color: "bg-orange-50 border-orange-200",
    },
];

export default function Projects() {
    return (
        <section className="px-4 md:px-10 lg:px-20 py-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 md:gap-0">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a2355]">Projects</h2>
                <button className="group flex items-center gap-2 bg-[#1a2355] py-2 px-4 rounded-xl text-white font-bold cursor-pointer transition-all duration-300">
                    ALL PROJECTS
                    <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
            </div>

            {/* Project Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {projects.map((project, idx) => (
                    <div
                        key={idx}
                        className={`rounded-2xl border-2 p-6 flex flex-col gap-3 hover:shadow-lg transition-shadow duration-300 cursor-pointer ${project.color}`}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold text-[#1a2355] bg-white/70 px-3 py-1 rounded-full">
                                {project.category}
                            </span>
                            <FolderOpenIcon sx={{ color: '#1a2355', opacity: 0.5 }} />
                        </div>
                        <h3 className="text-[#1a2355] font-bold text-base leading-snug">
                            {project.title}
                        </h3>
                        <p className="text-gray-600 text-sm flex-1">
                            {project.description}
                        </p>
                        <div className="flex items-center gap-1 text-gray-400 text-sm mt-2">
                            <CalendarMonthIcon sx={{ fontSize: 16 }} />
                            <span>{project.year}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
