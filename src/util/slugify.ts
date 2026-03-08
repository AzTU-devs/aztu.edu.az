const AZ_MAP: Record<string, string> = {
    ə: "e", Ə: "e",
    ı: "i", İ: "i",
    ö: "o", Ö: "o",
    ü: "u", Ü: "u",
    ğ: "g", Ğ: "g",
    ş: "s", Ş: "s",
    ç: "c", Ç: "c",
};

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .split("")
        .map((c) => AZ_MAP[c] ?? c)
        .join("")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

export function newsSlug(newsId: number, title: string): string {
    return `${slugify(title)}-${newsId}`;
}

export function parseNewsSlug(slug: string): number {
    const parts = slug.split("-");
    return parseInt(parts[parts.length - 1], 10);
}
