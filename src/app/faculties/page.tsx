"use client";

import { useEffect, useState } from "react";
import { FacultyInterface, getFaculties } from "@/services/facultyService/facultyService";
import HeaderChanger from "@/components/header/HeaderChanger";
import Footer from "@/components/footer/Footer";
import SchoolIcon from '@mui/icons-material/School';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export default function FacultiesPage() {
    const [faculties, setFaculties] = useState<FacultyInterface[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        getFaculties()
            .then((res) => {
                if (Array.isArray(res)) {
                    setFaculties(res);
                } else {
                    setFaculties([]);
                    if (res === "ERROR") setError(true);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <HeaderChanger />
            <main className="min-h-screen">
                {/* Page Banner */}
                <div className="bg-[#1a2355] px-4 md:px-10 lg:px-20 py-16">
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Faculties</h1>
                    <p className="text-white/70 text-base">
                        Explore our academic faculties and departments at Azerbaijan Technical University.
                    </p>
                </div>

                {/* Content */}
                <section className="px-4 md:px-10 lg:px-20 py-12">
                    {loading && (
                        <div className="flex justify-center items-center py-20">
                            <div className="w-10 h-10 border-4 border-[#1a2355] border-t-transparent rounded-full animate-spin" />
                        </div>
                    )}

                    {error && !loading && (
                        <div className="text-center py-20 text-red-500 font-semibold">
                            Failed to load faculties. Please try again later.
                        </div>
                    )}

                    {!loading && !error && faculties.length === 0 && (
                        <div className="text-center py-20 text-gray-400 font-semibold">
                            No faculties found.
                        </div>
                    )}

                    {!loading && faculties.length > 0 && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {faculties.map((faculty) => (
                                <div
                                    key={faculty.faculty_id}
                                    className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="w-12 h-12 rounded-xl bg-[#1a2355]/10 flex items-center justify-center">
                                            <SchoolIcon sx={{ color: '#1a2355' }} />
                                        </div>
                                        {faculty.short_name && (
                                            <span className="text-xs font-bold text-[#1a2355] bg-[#1a2355]/10 px-3 py-1 rounded-full">
                                                {faculty.short_name}
                                            </span>
                                        )}
                                    </div>

                                    <h2 className="text-[#1a2355] font-bold text-lg leading-snug">
                                        {faculty.name}
                                    </h2>

                                    {faculty.description && (
                                        <p className="text-gray-500 text-sm flex-1 line-clamp-3">
                                            {faculty.description}
                                        </p>
                                    )}

                                    <button className="group flex items-center gap-1 text-[#1a2355] font-semibold text-sm mt-auto w-fit">
                                        Learn more
                                        <ChevronRightIcon
                                            sx={{ fontSize: 18 }}
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}
