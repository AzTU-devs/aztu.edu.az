"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

const COPY = {
    az: {
        badge: "Hazırlanır",
        title: "Səhifə hazırlanır",
        subtitle:
            "Bakalavr və magistratura ixtisasları, tədris proqramları və öyrənmə nəticələri üçün ayrıca portal hazırlanır. Tezliklə xidmətinizdə olacağıq.",
        items: ["İxtisaslar", "Proqramlar", "Nəticələr", "Tezliklə"],
        back: "Ana səhifəyə qayıt",
        contact: "Əlaqə üçün",
        copyright: "© 2026 Azərbaycan Texniki Universiteti",
        homeHref: "/az",
    },
    en: {
        badge: "In progress",
        title: "Page is being prepared",
        subtitle:
            "A dedicated portal for bachelor's and master's specialties, curricula and learning outcomes is being prepared. We will be back online very soon.",
        items: ["Specialties", "Programs", "Outcomes", "Coming soon"],
        back: "Back to homepage",
        contact: "For inquiries",
        copyright: "© 2026 Azerbaijan Technical University",
        homeHref: "/en",
    },
} as const;

const Icons = {
    Book: () => (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
    ),
    Document: () => (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="9" y1="13" x2="15" y2="13" />
            <line x1="9" y1="17" x2="15" y2="17" />
        </svg>
    ),
    Target: () => (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
        </svg>
    ),
    Rocket: () => (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
    ),
};

const ICON_LIST = [Icons.Book, Icons.Document, Icons.Target, Icons.Rocket];

export default function MajorsUnderConstruction() {
    const { lang } = useLanguage();
    const copy = COPY[lang] ?? COPY.az;

    return (
        <main className="muc-root">
            <div className="muc-bg" aria-hidden />
            <div className="muc-grid" aria-hidden />

            <div className="muc-container">
                <div className="muc-logo-wrapper">
                    <svg className="muc-logo-shield" viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path
                            d="M 55 0 L 55 50 L 75 50 L 75 25 L 100 50 L 125 25 L 125 50 L 145 50 L 145 0 L 120 0 L 100 25 L 80 0 Z"
                            fill="#1e3a8a"
                        />
                        <path
                            d="M 40 60 L 40 200 L 100 250 L 160 200 L 160 60 Z M 75 80 L 125 80 L 125 175 Q 125 195 100 195 Q 75 195 75 175 Z"
                            fill="#1e3a8a"
                            fillRule="evenodd"
                        />
                    </svg>
                    <svg className="muc-logo-text" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <text
                            x="100"
                            y="40"
                            textAnchor="middle"
                            fontFamily="Arial Black, sans-serif"
                            fontSize="44"
                            fontWeight="900"
                            fill="#fff"
                            letterSpacing="2"
                        >
                            AZTU
                        </text>
                    </svg>
                </div>

                <div className="muc-badge">
                    <span className="muc-dot" />
                    <span>{copy.badge}</span>
                </div>

                <h1 className="muc-title">{copy.title}</h1>
                <div className="muc-domain">majors.aztu.edu.az</div>
                <p className="muc-subtitle">{copy.subtitle}</p>

                <div className="muc-icons">
                    {ICON_LIST.map((Icon, idx) => (
                        <div key={idx} className="muc-icon-item">
                            <div className="muc-icon-circle">
                                <Icon />
                            </div>
                            <span>{copy.items[idx]}</span>
                        </div>
                    ))}
                </div>

                <Link href={copy.homeHref} className="muc-back">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                    </svg>
                    {copy.back}
                </Link>

                <div className="muc-footer">
                    <p>
                        {copy.contact}: <a href="mailto:info@aztu.edu.az">info@aztu.edu.az</a>
                    </p>
                    <p style={{ marginTop: 8 }}>{copy.copyright}</p>
                </div>
            </div>

            <style jsx>{`
                .muc-root {
                    min-height: 100vh;
                    background: #0a0e27;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 20px;
                    overflow: hidden;
                    position: relative;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                }
                .muc-bg {
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(circle at 20% 30%, rgba(30, 58, 138, 0.4) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.25) 0%, transparent 50%),
                        radial-gradient(circle at 50% 100%, rgba(99, 102, 241, 0.2) 0%, transparent 50%);
                    animation: muc-pulse 8s ease-in-out infinite;
                    pointer-events: none;
                }
                .muc-grid {
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
                    background-size: 40px 40px;
                    pointer-events: none;
                }
                @keyframes muc-pulse {
                    0%, 100% { opacity: 0.6; }
                    50% { opacity: 1; }
                }
                .muc-container {
                    position: relative;
                    z-index: 1;
                    max-width: 640px;
                    width: 100%;
                    text-align: center;
                    padding: 40px 20px;
                    animation: muc-fade-in 1s ease-out;
                }
                @keyframes muc-fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .muc-logo-wrapper {
                    margin-bottom: 40px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                }
                .muc-logo-shield {
                    width: 110px;
                    height: auto;
                    filter: drop-shadow(0 10px 30px rgba(59, 130, 246, 0.4));
                    animation: muc-float 3s ease-in-out infinite;
                }
                .muc-logo-text {
                    width: 140px;
                    height: auto;
                }
                @keyframes muc-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                .muc-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(59, 130, 246, 0.1);
                    border: 1px solid rgba(59, 130, 246, 0.3);
                    padding: 8px 18px;
                    border-radius: 50px;
                    font-size: 13px;
                    color: #93c5fd;
                    margin-bottom: 24px;
                    letter-spacing: 1px;
                    text-transform: uppercase;
                }
                .muc-dot {
                    width: 8px;
                    height: 8px;
                    background: #3b82f6;
                    border-radius: 50%;
                    animation: muc-blink 1.5s ease-in-out infinite;
                }
                @keyframes muc-blink {
                    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
                    50% { opacity: 0.6; box-shadow: 0 0 0 8px rgba(59, 130, 246, 0); }
                }
                .muc-title {
                    font-size: 38px;
                    font-weight: 700;
                    margin-bottom: 18px;
                    background: linear-gradient(135deg, #fff 0%, #93c5fd 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    letter-spacing: -1px;
                    line-height: 1.2;
                }
                .muc-domain {
                    display: inline-block;
                    font-family: "SF Mono", Monaco, Menlo, monospace;
                    background: rgba(59, 130, 246, 0.12);
                    border: 1px solid rgba(59, 130, 246, 0.35);
                    color: #bfdbfe;
                    padding: 10px 22px;
                    border-radius: 12px;
                    font-size: 18px;
                    margin-bottom: 24px;
                    letter-spacing: 0.5px;
                }
                .muc-subtitle {
                    font-size: 16px;
                    line-height: 1.65;
                    color: rgba(255, 255, 255, 0.7);
                    margin: 0 auto 40px;
                    max-width: 520px;
                }
                .muc-icons {
                    display: flex;
                    justify-content: center;
                    gap: 30px;
                    margin-bottom: 40px;
                    flex-wrap: wrap;
                }
                .muc-icon-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 12px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }
                .muc-icon-circle {
                    width: 56px;
                    height: 56px;
                    border-radius: 14px;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                }
                .muc-icon-item:hover .muc-icon-circle {
                    background: rgba(59, 130, 246, 0.2);
                    border-color: rgba(59, 130, 246, 0.5);
                    transform: translateY(-4px);
                }
                .muc-icon-circle :global(svg) {
                    width: 24px;
                    height: 24px;
                    stroke: #93c5fd;
                }
                .muc-back {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: linear-gradient(135deg, #3b82f6 0%, #6366f1 100%);
                    color: #fff;
                    text-decoration: none;
                    padding: 12px 28px;
                    border-radius: 10px;
                    font-size: 14px;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    transition: all 0.3s ease;
                    box-shadow: 0 8px 24px rgba(59, 130, 246, 0.35);
                }
                .muc-back:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 12px 30px rgba(59, 130, 246, 0.5);
                }
                .muc-footer {
                    margin-top: 50px;
                    padding-top: 30px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    font-size: 13px;
                    color: rgba(255, 255, 255, 0.4);
                }
                .muc-footer a {
                    color: #93c5fd;
                    text-decoration: none;
                    margin: 0 4px;
                    transition: color 0.3s ease;
                }
                .muc-footer a:hover {
                    color: #fff;
                }
                @media (max-width: 600px) {
                    .muc-title { font-size: 28px; }
                    .muc-domain { font-size: 15px; padding: 8px 16px; }
                    .muc-icons { gap: 20px; }
                    .muc-logo-shield { width: 90px; }
                }
            `}</style>
        </main>
    );
}
