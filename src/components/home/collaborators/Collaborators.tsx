"use client";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface CollaboratorInterface {
    name: string;
    logo: string;
    url: string;
}

const collaborators: CollaboratorInterface[] = [
    {
        name: "UNESCO",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/UNESCO_logo.svg/320px-UNESCO_logo.svg.png",
        url: "https://www.unesco.org",
    },
    {
        name: "ERASMUS+",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Erasmus%2B_Logo.svg/320px-Erasmus%2B_Logo.svg.png",
        url: "https://erasmus-plus.ec.europa.eu",
    },
    {
        name: "TÜBİTAK",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/T%C3%BCbitak_logo.svg/320px-T%C3%BCbitak_logo.svg.png",
        url: "https://www.tubitak.gov.tr",
    },
    {
        name: "SOCAR",
        logo: "https://upload.wikimedia.org/wikipedia/en/thumb/1/19/SOCAR_logo.svg/320px-SOCAR_logo.svg.png",
        url: "https://www.socar.az",
    },
    {
        name: "TEMPUS",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/320px-Flag_of_Europe.svg.png",
        url: "https://eacea.ec.europa.eu/tempus",
    },
    {
        name: "Bologna Process",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Flag_of_Europe.svg/320px-Flag_of_Europe.svg.png",
        url: "https://www.ehea.info",
    },
];

// Duplicate list for seamless infinite loop
const doubled = [...collaborators, ...collaborators];

export default function Collaborators() {
    return (
        <section className="px-4 md:px-10 lg:px-20 py-10 overflow-hidden">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 md:gap-0">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1a2355]">Collaborators</h2>
                <button className="group flex items-center gap-2 bg-[#1a2355] py-2 px-4 rounded-xl text-white font-bold cursor-pointer transition-all duration-300">
                    ALL COLLABORATORS
                    <ChevronRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
            </div>

            {/* Marquee Track */}
            <div className="relative overflow-hidden">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

                <div className="flex animate-marquee gap-10 w-max">
                    {doubled.map((collab, idx) => (
                        <a
                            key={idx}
                            href={collab.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={collab.name}
                            className="flex-shrink-0 flex items-center justify-center w-40 h-24 bg-white rounded-2xl shadow-md px-4 hover:shadow-xl hover:scale-105 transition-all duration-300"
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={collab.logo}
                                alt={collab.name}
                                className="max-h-14 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
