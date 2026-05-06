"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, FreeMode } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import CollectionsIcon from "@mui/icons-material/Collections";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Props {
    images: string[];
    title: string;
}

export default function NewsGallery({ images, title }: Props) {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    useEffect(() => {
        document.body.style.overflow = lightboxOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [lightboxOpen]);

    if (images.length < 1) return null;

    return (
        <>
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-[200] bg-black/95 flex flex-col items-center justify-center p-4"
                        onClick={() => setLightboxOpen(false)}
                        role="dialog"
                        aria-label="Şəkil qalereyası"
                        aria-modal="true"
                    >
                        <button
                            type="button"
                            onClick={() => setLightboxOpen(false)}
                            aria-label="Bağla"
                            className="absolute top-5 right-5 text-white/60 hover:text-white text-3xl font-light leading-none cursor-pointer"
                        >
                            ×
                        </button>
                        <motion.div
                            initial={{ scale: 0.92, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.92, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="relative w-full max-w-5xl aspect-video"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Image
                                src={images[lightboxIndex]}
                                alt={`${title} — şəkil ${lightboxIndex + 1}`}
                                fill
                                sizes="(max-width: 1024px) 100vw, 80vw"
                                className="object-contain"
                            />
                        </motion.div>
                        <div className="flex items-center gap-6 mt-5 text-white/60 text-sm">
                            <button
                                type="button"
                                aria-label="Əvvəlki şəkil"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxIndex((i) => (i - 1 + images.length) % images.length);
                                }}
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                <ChevronLeftIcon sx={{ fontSize: 32 }} />
                            </button>
                            <span>{lightboxIndex + 1} / {images.length}</span>
                            <button
                                type="button"
                                aria-label="Növbəti şəkil"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setLightboxIndex((i) => (i + 1) % images.length);
                                }}
                                className="hover:text-white transition-colors cursor-pointer"
                            >
                                <ChevronRightIcon sx={{ fontSize: 32 }} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <section className="bg-[#0f172a] py-16">
                <div className="px-4 md:px-10 lg:px-20 mb-8 flex items-center gap-4">
                    <CollectionsIcon sx={{ fontSize: 22, color: "#ee7c7e" }} />
                    <h2 className="text-xl font-bold text-white">Qalereya</h2>
                    <span className="text-white/30 text-sm">{images.length} şəkil</span>
                    <div className="flex-1 h-px bg-white/10" />
                </div>

                <div className="relative px-4 md:px-10 lg:px-20 group">
                    <button
                        type="button"
                        aria-label="Əvvəlki"
                        className="gallery-prev absolute left-6 md:left-12 lg:left-22 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100"
                    >
                        <ChevronLeftIcon />
                    </button>
                    <button
                        type="button"
                        aria-label="Növbəti"
                        className="gallery-next absolute right-6 md:right-12 lg:right-22 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center transition-all duration-200 cursor-pointer opacity-0 group-hover:opacity-100"
                    >
                        <ChevronRightIcon />
                    </button>

                    <Swiper
                        modules={[Navigation, Thumbs, FreeMode]}
                        navigation={{ prevEl: ".gallery-prev", nextEl: ".gallery-next" }}
                        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                        spaceBetween={16}
                        className="rounded-2xl overflow-hidden h-[55vh] md:h-[70vh] bg-black/60"
                    >
                        {images.map((img, i) => (
                            <SwiperSlide key={i}>
                                <div
                                    className="relative w-full h-full cursor-zoom-in"
                                    onClick={() => {
                                        setLightboxIndex(i);
                                        setLightboxOpen(true);
                                    }}
                                >
                                    <Image
                                        src={img}
                                        alt={`${title} — şəkil ${i + 1}`}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 80vw"
                                        className="object-contain"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="px-4 md:px-10 lg:px-20 mt-4">
                    <Swiper
                        modules={[FreeMode, Thumbs]}
                        onSwiper={setThumbsSwiper}
                        spaceBetween={8}
                        slidesPerView="auto"
                        freeMode
                        watchSlidesProgress
                        className="gallery-thumbs"
                    >
                        {images.map((img, i) => (
                            <SwiperSlide key={i} style={{ width: "80px" }}>
                                <div className="relative w-20 h-14 rounded-lg overflow-hidden cursor-pointer transition-all duration-200">
                                    <Image
                                        src={img}
                                        alt={`${title} — kiçik şəkil ${i + 1}`}
                                        fill
                                        sizes="80px"
                                        className="object-cover"
                                    />
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </section>
        </>
    );
}
