"use client";

import { usePathname } from "next/navigation";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://api-aztu.karamshukurlu.site";

const VIDEOS = {
    about: `${API_BASE}/media/prod/hero/hero_videos/about.mp4`,
    academic: `${API_BASE}/media/prod/hero/hero_videos/academic.mp4`,
    management: `${API_BASE}/media/prod/hero/hero_videos/management.mp4`,
} as const;

interface Props {
    overlayClassName?: string;
}

function pickVideoSrc(pathname: string): string | null {
    if (pathname.startsWith("/az/haqqimizda") || pathname.startsWith("/en/about") || pathname.startsWith("/en/haqqimizda") || pathname.startsWith("/az/about")) return VIDEOS.about;
    if (pathname.startsWith("/az/akademik") || pathname.startsWith("/en/academic") || pathname.startsWith("/en/akademik") || pathname.startsWith("/az/academic")) return VIDEOS.academic;
    if (pathname.startsWith("/az/idareetme") || pathname.startsWith("/en/management") || pathname.startsWith("/en/idareetme") || pathname.startsWith("/az/management")) return VIDEOS.management;
    return null;
}

export default function AboutHeroVideoBg({ overlayClassName }: Props) {
    const pathname = usePathname();
    const src = pickVideoSrc(pathname);
    if (!src) return null;

    return (
        <>
            <video
                key={src}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
            >
                <source src={src} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[#0a0c1a]/30" />
            <div
                className={
                    overlayClassName ??
                    "absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0c1a]/15 to-[#0a0c1a]/70"
                }
            />
        </>
    );
}
