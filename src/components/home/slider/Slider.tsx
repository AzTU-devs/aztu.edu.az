"use client";

import "swiper/css";
import "swiper/css/navigation";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import Slide1 from "@/../public/slide-1.png";
import Slide2 from "@/../public/slide-2.png";
import Slide3 from "@/../public/slide-3.png";
import Slide4 from "@/../public/slide-4.png";

export default function Slider() {
    const slides = [
        {
            title:
                "AzTU-da beynəlxalq standartlar səviyyəsində qurulan Kitabxana İnformasiya Mərkəzinin açılışı olub",
            image: Slide1,
        },
        { image: Slide2 },
        { image: Slide3 },
        { image: Slide4 },
    ];

    return (
        <Swiper
            navigation
            modules={[Navigation]}
            className="mySwiper"
            spaceBetween={0}
            slidesPerView={1}
        >
            {slides.map((slide, idx) => (
                <SwiperSlide key={idx}>
                    <div
                        className="w-full h-[700px] bg-center bg-cover flex items-end p-10"
                        style={{ backgroundImage: `url(${slide.image.src})` }}
                    >
                        {slide.title && (
                            <h2 className="text-white text-3xl md:text-4xl font-bold bg-black/40 p-4 rounded-[20px]">
                                {slide.title}
                            </h2>
                        )}
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
