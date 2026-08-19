"use client";

import Link from "next/link";

import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import BusinessIcon from "@mui/icons-material/Business";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { SectionCard } from "@/components/department/ui";
import { useLanguage } from "@/context/LanguageContext";
import { useTranslation } from "@/hooks/useTranslation";

export default function HeiContactPage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.hei;
    const contact = p.contactInfo;

    const rows = [
        {
            icon: BusinessIcon,
            label: lang === "az" ? "Ünvan" : "Address",
            value: contact.address,
        },
        {
            icon: PhoneIcon,
            label: lang === "az" ? "Telefon" : "Phone",
            value: contact.phone,
            href: `tel:${contact.phone}`,
        },
        {
            icon: EmailIcon,
            label: lang === "az" ? "E-poçt" : "Email",
            value: contact.email,
            href: `mailto:${contact.email}`,
        },
        {
            icon: AccessTimeIcon,
            label: lang === "az" ? "İş saatları" : "Office hours",
            value: contact.hours,
        },
    ];

    return (
        <div className="space-y-6">
            <SectionCard
                icon={CallOutlinedIcon}
                eyebrow={lang === "az" ? "Bizə yazın" : "Get in touch"}
                title={contact.title}
            >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {rows.map((row) => {
                        const Icon = row.icon;
                        const body = (
                            <>
                                <span className="mb-1.5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">
                                    <Icon sx={{ fontSize: 14 }} className="text-[#ee7c7e]" />
                                    {row.label}
                                </span>
                                <span className="block text-[15px] font-black leading-snug text-[#1a2355] dark:text-white">
                                    {row.value}
                                </span>
                            </>
                        );
                        const shell =
                            "block rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-4 transition-colors dark:border-white/10 dark:bg-white/5";
                        return row.href ? (
                            <a
                                key={row.label}
                                href={row.href}
                                className={`${shell} hover:border-[#ee7c7e]/50`}
                            >
                                {body}
                            </a>
                        ) : (
                            <div key={row.label} className={shell}>
                                {body}
                            </div>
                        );
                    })}
                </div>
            </SectionCard>

            <SectionCard
                icon={LinkOutlinedIcon}
                eyebrow={lang === "az" ? "Davamı" : "Keep reading"}
                title={t.common.moreInSection}
                delay={0.04}
            >
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {p.related.map((link: { title: string; href: string }) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="group flex items-center justify-between gap-4 rounded-xl border border-slate-200 px-5 py-4 transition-colors hover:border-[#ee7c7e]/50 dark:border-white/10"
                        >
                            <span className="text-sm font-black text-[#1a2355] transition-colors group-hover:text-[#ee7c7e] dark:text-white">
                                {link.title}
                            </span>
                            <ChevronRightIcon
                                sx={{ fontSize: 18 }}
                                className="shrink-0 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-[#ee7c7e] dark:text-slate-600"
                            />
                        </Link>
                    ))}
                </div>
            </SectionCard>
        </div>
    );
}
