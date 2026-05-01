import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Azərbaycan Texniki Universiteti",
        short_name: "AzTU",
        description:
            "Azərbaycan Texniki Universitetinin (AzTU) rəsmi veb saytı — qəbul, fakültələr, tədqiqat və beynəlxalq əməkdaşlıq.",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#1a2355",
        orientation: "portrait-primary",
        scope: "/",
        lang: "az-AZ",
        categories: ["education", "university", "research"],
        icons: [
            {
                src: "/logo/aztu-logo-light.png",
                sizes: "192x192",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/logo/aztu-logo-light.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/logo/aztu-logo-light.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "maskable",
            },
        ],
    };
}
