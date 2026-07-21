"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import { API_BASE_URL } from "@/util/apiClient";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VerifiedIcon from "@mui/icons-material/Verified";
import AboutHeroVideoBg from "@/components/about/AboutHeroVideoBg";

interface StaffMember {
    name: string;
    title: string;
    email: string;
    phone: string;
    image?: string;
}

function buildImageUrl(path?: string): string | undefined {
    if (!path) return undefined;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    const base = (API_BASE_URL ?? "").replace(/\/$/, "");
    return `${base}/${path.replace(/^\//, "")}`;
}

export default function RectorsOfficePage() {
    const t = useTranslation();
    const { lang } = useLanguage();
    const p = t.pages.about.rectorsOffice;

    const leadershipLabel = lang === "az" ? "Rəhbərlik və İdarəetmə" : "Leadership and Management";
    const leadershipHref = lang === "az" ? "/haqqimizda/rehbetlik-ve-idareetme" : "/about/leadership-and-management";
    const aboutHref = lang === "az" ? "/haqqimizda" : "/about";

    const overview =
        lang === "az"
            ? "Rektorat Azərbaycan Texniki Universitetinin gündəlik fəaliyyətini koordinasiya edən mərkəzi inzibati strukturdur. Rektorun köməkçiləri və referentləri rəhbərliklə akademik bölmələr, dövlət qurumları, beynəlxalq tərəfdaşlar və ictimaiyyət arasında əlaqəni təmin edir, sənəd dövriyyəsini idarə edir və rəsmi qəbulların təşkilatını həyata keçirir."
            : "The Rector's Office is the central administrative unit that coordinates the day-to-day operations of Azerbaijan Technical University. Assistants and secretaries to the Rector facilitate communication between leadership, academic units, government bodies, international partners and the public — handling document flow, scheduling, and the organization of official engagements.";

    const responsibilities = [
        {
            icon: AssignmentIndIcon,
            title: lang === "az" ? "Sənəd dövriyyəsi" : "Document Management",
            text:
                lang === "az"
                    ? "Daxil olan və göndərilən rəsmi sənədlərin qəbulu, qeydiyyatı və izlənilməsi."
                    : "Receipt, registration and tracking of all incoming and outgoing official correspondence.",
        },
        {
            icon: SupportAgentIcon,
            title: lang === "az" ? "Qəbul və görüşlər" : "Reception & Meetings",
            text:
                lang === "az"
                    ? "Rektorla görüşlərin planlaşdırılması, rəsmi qəbulların və nümayəndə heyətlərinin qarşılanması."
                    : "Scheduling of meetings with the Rector and coordination of official receptions and visiting delegations.",
        },
        {
            icon: GroupsIcon,
            title: lang === "az" ? "Daxili koordinasiya" : "Internal Coordination",
            text:
                lang === "az"
                    ? "Fakültələr, kafedralar və inzibati bölmələrlə effektiv əlaqələrin qurulması."
                    : "Maintaining effective communication between faculties, departments and administrative units.",
        },
    ];

    const heroStats = [
        {
            icon: GroupsIcon,
            label: lang === "az" ? "Heyət" : "Members",
            value: String(p.staff.length),
        },
        {
            icon: VerifiedIcon,
            label: lang === "az" ? "Hesabat verir" : "Reports to",
            value: lang === "az" ? "Rektora" : "The Rector",
        },
        {
            icon: AccessTimeIcon,
            label: lang === "az" ? "İş saatları" : "Hours",
            value: "09:00 – 18:00",
        },
    ];

    const officeContact = {
        address:
            lang === "az"
                ? "H.Cavid prospekti 25, Bakı, AZ 1073"
                : "25 H. Javid Ave, Baku, AZ 1073",
        email: "rector@aztu.edu.az",
        phone: "+994 12 539 08 57",
    };

    const related = [
        {
            title: lang === "az" ? "Rektor" : "Rector",
            href: lang === "az" ? "/haqqimizda/rehbetlik-ve-idareetme/rektor" : "/about/leadership-and-management/rector",
        },
        {
            title: lang === "az" ? "Prorektorlar" : "Vice-Rectors",
            href: lang === "az" ? "/haqqimizda/rehbetlik-ve-idareetme/prorektor" : "/about/leadership-and-management/vice-rector",
        },
        {
            title: lang === "az" ? "Elmi Şura" : "Scientific Board",
            href: lang === "az" ? "/haqqimizda/rehbetlik-ve-idareetme/elmi-sura" : "/about/leadership-and-management/scientific-board",
        },
    ];

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden">

            {/* HERO */}
            <div className="relative min-h-[60vh] lg:min-h-[70vh] flex flex-col pt-44 lg:pt-48 z-10">
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <AboutHeroVideoBg />
                </div>

                <div className="relative z-10 flex-1 flex flex-col max-w-[1600px] mx-auto w-full px-4 md:px-10 lg:px-20 pb-16">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-white/60 text-xs mb-12 lg:mb-16">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 14 }} />
                            Home
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={aboutHref} className="hover:text-white transition-colors">
                            {t.nav.sections.about}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <Link href={leadershipHref} className="hover:text-white transition-colors">
                            {leadershipLabel}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <span className="text-[#ee7c7e] font-bold">{p.breadcrumb}</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                        className="max-w-4xl"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.14em] mb-6">
                            {p.eyebrow}
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-white leading-[1.05] tracking-tight">
                            {p.title}
                        </h1>
                        <p className="text-lg lg:text-xl text-white/75 font-medium mb-10 leading-relaxed max-w-2xl border-l-4 border-[#ee7c7e]/60 pl-6">
                            {p.subtitle}
                        </p>
                    </motion.div>

                    {/* Stat strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-3xl"
                    >
                        {heroStats.map((s) => (
                            <div
                                key={s.label}
                                className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-xl bg-[#ee7c7e]/15 border border-[#ee7c7e]/30 flex items-center justify-center shrink-0">
                                    <s.icon className="text-[#ee7c7e]" sx={{ fontSize: 20 }} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5 truncate">{s.label}</p>
                                    <p className="text-sm font-bold text-white truncate">{s.value}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* OVERVIEW + RESPONSIBILITIES */}
            <section className="relative px-4 md:px-10 lg:px-20 py-24 z-10">
                <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-5"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-1.5 h-8 bg-[#ee7c7e] rounded-full" />
                            <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#1a2355] dark:text-white/60">
                                {lang === "az" ? "Ofis haqqında" : "About the office"}
                            </span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-black text-[#1a2355] dark:text-white leading-tight tracking-tight mb-6">
                            {lang === "az" ? "Rektorun gündəlik fəaliyyət mərkəzi" : "The Rector's day-to-day operations hub"}
                        </h2>
                        <p className="text-base lg:text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
                            {overview}
                        </p>
                    </motion.div>

                    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {responsibilities.map((r, i) => (
                            <motion.div
                                key={r.title}
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.05 + i * 0.08, duration: 0.5 }}
                                className="group relative bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl rounded-[12px] p-6 border border-[#1a2355]/15 dark:border-white/10 hover:border-[#ee7c7e]/40 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                            >
                                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ee7c7e]/5 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-700" />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-2xl bg-[#1a2355]/5 dark:bg-white/5 border border-[#1a2355]/15 dark:border-white/10 flex items-center justify-center mb-4 group-hover:bg-[#ee7c7e] group-hover:border-[#ee7c7e] transition-colors duration-300">
                                        <r.icon className="text-[#1a2355] dark:text-white group-hover:text-white transition-colors" sx={{ fontSize: 24 }} />
                                    </div>
                                    <h3 className="text-base font-black text-[#1a2355] dark:text-white mb-2">
                                        {r.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                                        {r.text}
                                    </p>
                                </div>
                            </motion.div>
                        ))}

                        {/* Filler card with the staff count, only when we have a 4th slot */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.05 + responsibilities.length * 0.08, duration: 0.5 }}
                            className="relative bg-[#1a2355] text-white rounded-[12px] p-6 overflow-hidden"
                        >
                            <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#ee7c7e]/30 blur-3xl rounded-full" />
                            <div className="relative z-10 h-full flex flex-col justify-between gap-6">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#ee7c7e] mb-3">
                                        {lang === "az" ? "Birbaşa əlaqə" : "Direct contact"}
                                    </p>
                                    <p className="text-base font-bold leading-snug">
                                        {lang === "az"
                                            ? "Rektorla görüş tələbləri rektoratlıq vasitəsilə qəbul edilir."
                                            : "Requests for meetings with the Rector are handled through the Rector's Office."}
                                    </p>
                                </div>
                                <a
                                    href={`mailto:${officeContact.email}`}
                                    className="inline-flex items-center gap-2 self-start px-4 py-2.5 rounded-xl bg-white text-[#1a2355] font-black text-xs uppercase tracking-widest hover:bg-[#ee7c7e] hover:text-white transition-colors"
                                >
                                    <AlternateEmailIcon sx={{ fontSize: 16 }} />
                                    {lang === "az" ? "Yaz" : "Email us"}
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* STAFF SECTION */}
            <section className="relative px-4 md:px-10 lg:px-20 pb-12 z-10">
                <div className="max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-1.5 h-8 bg-[#ee7c7e] rounded-full" />
                                <span className="text-[10px] font-black uppercase tracking-[0.14em] text-[#1a2355] dark:text-white/60">
                                    {lang === "az" ? "Heyət" : "Team"}
                                </span>
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-black text-[#1a2355] dark:text-white tracking-tight">
                                {lang === "az" ? "Rektoratlıq əməkdaşları" : "Office Staff"}
                            </h2>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-slate-400 max-w-md leading-relaxed">
                            {lang === "az"
                                ? "Aşağıdakı əməkdaşlar rektoratlıqda fəaliyyət göstərir və birbaşa əlaqə üçün açıqdır."
                                : "The team below works in the Rector's Office and is available for direct contact."}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {p.staff.map((member: StaffMember, i: number) => (
                            <motion.article
                                key={member.email}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1, duration: 0.6 }}
                                className="group relative bg-white/85 dark:bg-slate-900/70 backdrop-blur-xl rounded-[12px] border border-[#1a2355]/15 dark:border-white/10 hover:border-[#ee7c7e]/40 hover:shadow-2xl hover:shadow-[#1a2355]/10 transition-all duration-500 overflow-hidden flex flex-col sm:flex-row"
                            >
                                {/* Left: photo */}
                                <div className="relative w-full sm:w-[40%] aspect-[4/5] sm:aspect-auto bg-gradient-to-br from-[#1a2355] to-[#0f172a] flex items-center justify-center shrink-0 overflow-hidden">
                                    {member.image ? (
                                        <img
                                            src={buildImageUrl(member.image)}
                                            alt={member.name}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    ) : (
                                        <PersonIcon sx={{ fontSize: 96, color: "white", opacity: 0.25 }} />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/70 via-transparent to-transparent" />
                                    <div className="absolute inset-0 bg-[#ee7c7e]/0 group-hover:bg-[#ee7c7e]/10 transition-colors duration-500" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-black uppercase tracking-widest text-white">
                                            <div className="w-1.5 h-1.5 rounded-full bg-[#ee7c7e] animate-pulse" />
                                            {lang === "az" ? "Rektoratlıq" : "Rector's Office"}
                                        </div>
                                    </div>
                                </div>

                                {/* Right: info */}
                                <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between gap-6">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.14em] text-[#ee7c7e] font-black mb-2">
                                            {member.title}
                                        </p>
                                        <h3 className="text-2xl lg:text-3xl font-black text-[#1a2355] dark:text-white leading-tight tracking-tight group-hover:text-[#ee7c7e] transition-colors duration-300">
                                            {member.name}
                                        </h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-2.5">
                                        <a
                                            href={`mailto:${member.email}`}
                                            className="group/link flex items-center gap-3 px-4 py-3 rounded-xl bg-[#1a2355]/5 dark:bg-white/5 border border-[#1a2355]/15 dark:border-white/10 hover:bg-[#1a2355] hover:border-[#1a2355] hover:text-white text-[#1a2355] dark:text-white transition-all duration-300"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-[#1a2355]/10 dark:bg-white/10 flex items-center justify-center group-hover/link:bg-white/15 transition-colors">
                                                <EmailIcon sx={{ fontSize: 16 }} />
                                            </div>
                                            <span className="text-sm font-bold truncate">{member.email}</span>
                                        </a>
                                        <a
                                            href={`tel:${member.phone.replace(/\s+/g, "")}`}
                                            className="group/link flex items-center gap-3 px-4 py-3 rounded-xl bg-[#ee7c7e]/10 border border-[#ee7c7e]/20 hover:bg-[#ee7c7e] hover:text-white text-[#1a2355] dark:text-white transition-all duration-300"
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-[#ee7c7e]/20 flex items-center justify-center group-hover/link:bg-white/15 transition-colors">
                                                <LocalPhoneIcon sx={{ fontSize: 16 }} />
                                            </div>
                                            <span className="text-sm font-bold">{member.phone}</span>
                                        </a>
                                    </div>
                                </div>
                            </motion.article>
                        ))}
                    </div>
                </div>
            </section>

            {/* OFFICE CONTACT STRIP */}
            <section className="relative px-4 md:px-10 lg:px-20 py-16 z-10">
                <div className="max-w-[1400px] mx-auto">
                    <div className="relative bg-[#1a2355] rounded-[14px] p-8 lg:p-12 overflow-hidden text-white">
                        <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-[#ee7c7e]/15 blur-[120px] rounded-full" />
                        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                            <div className="lg:col-span-5">
                                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#ee7c7e] mb-3">
                                    {lang === "az" ? "Ofis əlaqə məlumatları" : "Office contact"}
                                </p>
                                <h2 className="text-2xl lg:text-3xl font-black tracking-tight leading-snug">
                                    {lang === "az"
                                        ? "Rəsmi müraciətlər üçün əlaqə"
                                        : "Get in touch with the Rector's Office"}
                                </h2>
                            </div>

                            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                                    <div className="flex items-center gap-2 mb-2">
                                        <LocationOnIcon className="text-[#ee7c7e]" sx={{ fontSize: 18 }} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">
                                            {lang === "az" ? "Ünvan" : "Address"}
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold leading-snug">{officeContact.address}</p>
                                </div>
                                <a
                                    href={`mailto:${officeContact.email}`}
                                    className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-[#ee7c7e]/40 transition-all"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <EmailIcon className="text-[#ee7c7e]" sx={{ fontSize: 18 }} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">
                                            E-mail
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold leading-snug break-all">{officeContact.email}</p>
                                </a>
                                <a
                                    href={`tel:${officeContact.phone.replace(/\s+/g, "")}`}
                                    className="px-5 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-[#ee7c7e]/40 transition-all"
                                >
                                    <div className="flex items-center gap-2 mb-2">
                                        <LocalPhoneIcon className="text-[#ee7c7e]" sx={{ fontSize: 18 }} />
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/50">
                                            {lang === "az" ? "Telefon" : "Phone"}
                                        </span>
                                    </div>
                                    <p className="text-sm font-bold leading-snug">{officeContact.phone}</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* RELATED LINKS */}
            <div className="relative px-4 md:px-10 lg:px-20 pb-24 z-10">
                <section className="pt-12 border-t border-[#1a2355]/20 dark:border-white/10 max-w-[1400px] mx-auto">
                    <h2 className="text-2xl font-black text-[#1a2355] dark:text-white mb-10 flex items-center gap-4">
                        <div className="w-2.5 h-10 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_15px_rgba(238,124,126,0.5)]" />
                        {t.common.moreInSection}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {related.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="group relative flex items-center justify-between bg-white/80 dark:bg-slate-900/50 backdrop-blur-xl p-8 rounded-[12px] border-2 border-[#1a2355]/30 dark:border-[#1a2355]/30 hover:border-[#ee7c7e]/40 dark:hover:border-[#ee7c7e]/50 transition-all duration-500 shadow-lg hover:shadow-2xl overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#ee7c7e]/5 via-transparent to-[#1a2355]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className="relative text-[#1a2355] dark:text-white font-black text-base group-hover:text-[#ee7c7e] transition-colors">{link.title}</span>
                                <div className="relative w-12 h-12 rounded-2xl bg-[#1a2355]/5 dark:bg-white/5 flex items-center justify-center group-hover:bg-[#1a2355] group-hover:text-white transition-all duration-300 border border-[#1a2355]/30 dark:border-white/5">
                                    <ChevronRightIcon sx={{ fontSize: 24 }} className="group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
