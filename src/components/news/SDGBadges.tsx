"use client";

// Official UN SDG colors (1..17)
const SDG_COLORS: Record<number, string> = {
    1: "#E5243B",
    2: "#DDA63A",
    3: "#4C9F38",
    4: "#C5192D",
    5: "#FF3A21",
    6: "#26BDE2",
    7: "#FCC30B",
    8: "#A21942",
    9: "#FD6925",
    10: "#DD1367",
    11: "#FD9D24",
    12: "#BF8B2E",
    13: "#3F7E44",
    14: "#0A97D9",
    15: "#56C02B",
    16: "#00689D",
    17: "#19486A",
};

const SDG_NAMES: Record<number, string> = {
    1: "No Poverty",
    2: "Zero Hunger",
    3: "Good Health and Well-being",
    4: "Quality Education",
    5: "Gender Equality",
    6: "Clean Water and Sanitation",
    7: "Affordable and Clean Energy",
    8: "Decent Work and Economic Growth",
    9: "Industry, Innovation and Infrastructure",
    10: "Reduced Inequalities",
    11: "Sustainable Cities and Communities",
    12: "Responsible Consumption and Production",
    13: "Climate Action",
    14: "Life Below Water",
    15: "Life on Land",
    16: "Peace, Justice and Strong Institutions",
    17: "Partnerships for the Goals",
};

/**
 * Renders a list of SDG (Sustainable Development Goal) badges.
 * If /sdg/E-WEB-Goal-{n}.png assets exist in /public/sdg/ they will be used
 * (drop the official UN SDG square icons there). Otherwise a color-coded numbered
 * tile is rendered as fallback.
 */
export default function SDGBadges({
    numbers,
    size = 56,
    useImages = true,
    className,
}: {
    numbers?: number[] | null;
    size?: number;
    useImages?: boolean;
    className?: string;
}) {
    if (!numbers || numbers.length === 0) return null;
    const cleaned = Array.from(new Set(numbers.filter((n) => n >= 1 && n <= 17))).sort((a, b) => a - b);
    if (cleaned.length === 0) return null;

    return (
        <ul className={`flex flex-wrap items-center gap-2 list-none p-0 ${className ?? ""}`}>
            {cleaned.map((n) => (
                <li
                    key={n}
                    title={`SDG ${n}: ${SDG_NAMES[n]}`}
                    aria-label={`SDG ${n}: ${SDG_NAMES[n]}`}
                    className="inline-flex"
                >
                    {useImages ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={`/sdg-icons/E-WEB-Goal-${n.toString().padStart(2, "0")}.jpg`}
                            alt={`SDG ${n}: ${SDG_NAMES[n]}`}
                            width={size}
                            height={size}
                            loading="lazy"
                            decoding="async"
                            style={{ width: size, height: size, objectFit: "cover" }}
                            className="rounded-md shadow-md block"
                        />
                    ) : (
                        <span
                            className="inline-flex items-center justify-center font-black text-white rounded-md shadow-md"
                            style={{
                                width: size,
                                height: size,
                                background: SDG_COLORS[n] ?? "#1a2355",
                                fontSize: size * 0.42,
                            }}
                        >
                            {n}
                        </span>
                    )}
                </li>
            ))}
        </ul>
    );
}
