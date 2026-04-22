"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";
import { useLanguage } from "@/context/LanguageContext";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SubjectIcon from "@mui/icons-material/Subject";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

type Dict = {
    eyebrow: string;
    title: string;
    description: string;
    breadcrumb: string;
    getInTouch: string;
    contactInfo: string;
    addressLabel: string;
    addressValue: string;
    phoneLabel: string;
    emailLabel: string;
    hoursLabel: string;
    hoursValue: string;
    followUs: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    thanks: string;
    thanksBody: string;
    mapTitle: string;
};

const COPY: Record<"az" | "en", Dict> = {
    az: {
        eyebrow: "Bizimlə əlaqə",
        title: "Əlaqə",
        description: "Suallarınız, təklifləriniz və ya əməkdaşlıq üçün bizimlə əlaqə saxlayın — sizi eşitməkdən məmnun olarıq.",
        breadcrumb: "Əlaqə",
        getInTouch: "Əlaqə Saxlayın",
        contactInfo: "Əlaqə Məlumatları",
        addressLabel: "Ünvan",
        addressValue: "H.Cavid prospekti 25, Bakı, Azərbaycan AZ 1073",
        phoneLabel: "Telefon",
        emailLabel: "E-poçt",
        hoursLabel: "İş Saatları",
        hoursValue: "Bazar ertəsi – Cümə: 09:00 – 18:00",
        followUs: "Bizi İzləyin",
        formTitle: "Bizə Mesaj Göndərin",
        formSubtitle: "Formu doldurun — komandamız ən qısa müddətdə sizə cavab verəcək.",
        nameLabel: "Ad və Soyad",
        namePlaceholder: "Adınızı daxil edin",
        emailPlaceholder: "sizin@email.com",
        subjectLabel: "Mövzu",
        subjectPlaceholder: "Mesajınızın mövzusu",
        messageLabel: "Mesaj",
        messagePlaceholder: "Mesajınızı buraya yazın...",
        submit: "Mesajı Göndər",
        submitting: "Göndərilir...",
        thanks: "Təşəkkür edirik!",
        thanksBody: "Mesajınız uğurla göndərildi. Tezliklə sizinlə əlaqə saxlayacağıq.",
        mapTitle: "Bizi Xəritədə Tapın",
    },
    en: {
        eyebrow: "Get in touch",
        title: "Contact Us",
        description: "Have a question, idea or want to collaborate? We would love to hear from you.",
        breadcrumb: "Contact",
        getInTouch: "Reach Out",
        contactInfo: "Contact Information",
        addressLabel: "Address",
        addressValue: "H.Cavid Avenue 25, Baku, Azerbaijan AZ 1073",
        phoneLabel: "Phone",
        emailLabel: "Email",
        hoursLabel: "Working Hours",
        hoursValue: "Monday – Friday: 09:00 – 18:00",
        followUs: "Follow Us",
        formTitle: "Send Us a Message",
        formSubtitle: "Fill out the form — our team will get back to you as soon as possible.",
        nameLabel: "Full Name",
        namePlaceholder: "Enter your name",
        emailPlaceholder: "your@email.com",
        subjectLabel: "Subject",
        subjectPlaceholder: "Subject of your message",
        messageLabel: "Message",
        messagePlaceholder: "Write your message here...",
        submit: "Send Message",
        submitting: "Sending...",
        thanks: "Thank you!",
        thanksBody: "Your message has been sent. We will be in touch soon.",
        mapTitle: "Find Us on the Map",
    },
};

const PHONES = ["(+994 12) 539-13-05", "(+994 12) 538-33-83"];
const EMAIL = "aztu@aztu.edu.az";

const SOCIAL = [
    { platform: "facebook", url: "https://www.facebook.com/aztu1950.official/", Icon: FacebookIcon },
    { platform: "instagram", url: "https://www.instagram.com/aztueduaz", Icon: InstagramIcon },
    { platform: "linkedin", url: "https://www.linkedin.com/school/aztueduaz/", Icon: LinkedInIcon },
    { platform: "youtube", url: "https://www.youtube.com/channel/UCu_PoZ-9DKNYs3hxuK9pW1Q", Icon: YouTubeIcon },
];

export default function ContactPage() {
    const { lang } = useLanguage();
    const t = COPY[lang];

    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
    const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setTimeout(() => {
            setStatus("success");
            setForm({ name: "", email: "", subject: "", message: "" });
        }, 900);
    };

    return (
        <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden">
            <div className="bg-mesh" />
            <div className="bg-grid-premium" />

            <PageHero
                title={t.title}
                description={t.description}
                breadcrumbs={[{ label: t.breadcrumb }]}
                eyebrow={t.eyebrow}
            />

            <PageContainer>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10">
                    {/* Left: Contact Info Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="lg:col-span-5"
                    >
                        <div className="sticky top-28 relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#0b1330] via-[#1a2355] to-[#13365E] p-10 md:p-12 text-white shadow-2xl border-2 border-white/10">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ee7c7e]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                            <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

                            <div className="relative z-10">
                                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/10 border border-white/10 mb-6">
                                    <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">{t.getInTouch}</span>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-10 leading-tight">
                                    {t.contactInfo}
                                </h2>

                                <ul className="space-y-7">
                                    <li className="flex items-start gap-5 group">
                                        <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/10 flex items-center justify-center text-[#ee7c7e] group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300 border border-white/10">
                                            <LocationOnIcon sx={{ fontSize: 22 }} />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-black uppercase tracking-[0.25em] text-white/50 mb-1">
                                                {t.addressLabel}
                                            </span>
                                            <span className="text-base font-bold leading-relaxed text-white/90">
                                                {t.addressValue}
                                            </span>
                                        </div>
                                    </li>

                                    <li className="flex items-start gap-5 group">
                                        <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/10 flex items-center justify-center text-[#ee7c7e] group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300 border border-white/10">
                                            <LocalPhoneIcon sx={{ fontSize: 22 }} />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-black uppercase tracking-[0.25em] text-white/50 mb-1">
                                                {t.phoneLabel}
                                            </span>
                                            <div className="flex flex-col gap-1">
                                                {PHONES.map((phone) => (
                                                    <a
                                                        key={phone}
                                                        href={`tel:${phone.replace(/\s|\(|\)|-/g, "")}`}
                                                        className="text-base font-bold text-white/90 hover:text-[#ee7c7e] transition-colors"
                                                    >
                                                        {phone}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </li>

                                    <li className="flex items-start gap-5 group">
                                        <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/10 flex items-center justify-center text-[#ee7c7e] group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300 border border-white/10">
                                            <EmailIcon sx={{ fontSize: 22 }} />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-black uppercase tracking-[0.25em] text-white/50 mb-1">
                                                {t.emailLabel}
                                            </span>
                                            <a
                                                href={`mailto:${EMAIL}`}
                                                className="text-base font-bold text-white/90 hover:text-[#ee7c7e] transition-colors break-all"
                                            >
                                                {EMAIL}
                                            </a>
                                        </div>
                                    </li>

                                    <li className="flex items-start gap-5 group">
                                        <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/10 flex items-center justify-center text-[#ee7c7e] group-hover:bg-[#ee7c7e] group-hover:text-white transition-all duration-300 border border-white/10">
                                            <AccessTimeIcon sx={{ fontSize: 22 }} />
                                        </div>
                                        <div>
                                            <span className="block text-[10px] font-black uppercase tracking-[0.25em] text-white/50 mb-1">
                                                {t.hoursLabel}
                                            </span>
                                            <span className="text-base font-bold text-white/90">{t.hoursValue}</span>
                                        </div>
                                    </li>
                                </ul>

                                <div className="mt-10 pt-8 border-t border-white/10">
                                    <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-4">
                                        {t.followUs}
                                    </span>
                                    <div className="flex gap-3">
                                        {SOCIAL.map(({ platform, url, Icon }) => (
                                            <motion.a
                                                key={platform}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ y: -4, scale: 1.08 }}
                                                className="flex items-center justify-center w-11 h-11 bg-white/10 border border-white/10 rounded-xl text-white/80 hover:text-white hover:bg-[#ee7c7e] hover:border-[#ee7c7e] transition-all duration-300"
                                                aria-label={platform}
                                            >
                                                <Icon sx={{ fontSize: 20 }} />
                                            </motion.a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="lg:col-span-7"
                    >
                        <div className="relative overflow-hidden bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[3rem] border-2 border-[#1a2355]/10 dark:border-[#1a2355]/30 p-10 md:p-14 shadow-2xl shadow-blue-900/5">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-[#ee7c7e]/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-4">
                                    <span className="w-2.5 h-10 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_15px_rgba(238,124,126,0.5)]" />
                                    <h2 className="text-3xl md:text-4xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter">
                                        {t.formTitle}
                                    </h2>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 text-base mb-10 leading-relaxed pl-6">
                                    {t.formSubtitle}
                                </p>

                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-8 rounded-3xl bg-green-50 dark:bg-green-900/20 border-2 border-green-500/30"
                                    >
                                        <h3 className="text-2xl font-black text-green-700 dark:text-green-400 mb-2">
                                            {t.thanks}
                                        </h3>
                                        <p className="text-green-800/80 dark:text-green-300/80 font-medium">
                                            {t.thanksBody}
                                        </p>
                                        <button
                                            onClick={() => setStatus("idle")}
                                            className="mt-6 text-sm font-black uppercase tracking-[0.2em] text-green-700 dark:text-green-400 hover:text-[#ee7c7e] transition-colors"
                                        >
                                            ← {lang === "az" ? "Yenidən yaz" : "Send another"}
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <FormField
                                                icon={<PersonOutlineIcon sx={{ fontSize: 20 }} />}
                                                label={t.nameLabel}
                                            >
                                                <input
                                                    type="text"
                                                    name="name"
                                                    required
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    placeholder={t.namePlaceholder}
                                                    className="w-full bg-transparent outline-none text-[#1a2355] dark:text-white font-semibold placeholder-gray-400"
                                                />
                                            </FormField>

                                            <FormField
                                                icon={<EmailIcon sx={{ fontSize: 20 }} />}
                                                label={t.emailLabel}
                                            >
                                                <input
                                                    type="email"
                                                    name="email"
                                                    required
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    placeholder={t.emailPlaceholder}
                                                    className="w-full bg-transparent outline-none text-[#1a2355] dark:text-white font-semibold placeholder-gray-400"
                                                />
                                            </FormField>
                                        </div>

                                        <FormField
                                            icon={<SubjectIcon sx={{ fontSize: 20 }} />}
                                            label={t.subjectLabel}
                                        >
                                            <input
                                                type="text"
                                                name="subject"
                                                required
                                                value={form.subject}
                                                onChange={handleChange}
                                                placeholder={t.subjectPlaceholder}
                                                className="w-full bg-transparent outline-none text-[#1a2355] dark:text-white font-semibold placeholder-gray-400"
                                            />
                                        </FormField>

                                        <FormField
                                            icon={<ChatBubbleOutlineIcon sx={{ fontSize: 20 }} />}
                                            label={t.messageLabel}
                                            align="top"
                                        >
                                            <textarea
                                                name="message"
                                                required
                                                rows={6}
                                                value={form.message}
                                                onChange={handleChange}
                                                placeholder={t.messagePlaceholder}
                                                className="w-full bg-transparent outline-none text-[#1a2355] dark:text-white font-semibold placeholder-gray-400 resize-none"
                                            />
                                        </FormField>

                                        <motion.button
                                            type="submit"
                                            disabled={status === "submitting"}
                                            whileHover={{ scale: status === "submitting" ? 1 : 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#1a2355] text-white font-black uppercase tracking-[0.2em] text-sm px-10 py-5 rounded-2xl shadow-xl shadow-[#1a2355]/20 hover:bg-[#ee7c7e] hover:shadow-[#ee7c7e]/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                                        >
                                            {status === "submitting" ? t.submitting : t.submit}
                                            <SendIcon sx={{ fontSize: 18 }} />
                                        </motion.button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Map Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mt-20 relative z-10"
                >
                    <div className="flex items-center gap-4 mb-10">
                        <span className="w-2.5 h-10 bg-[#ee7c7e] rounded-full animate-pulse shadow-[0_0_15px_rgba(238,124,126,0.5)]" />
                        <h2 className="text-3xl md:text-4xl font-black text-[#1a2355] dark:text-white uppercase tracking-tighter">
                            {t.mapTitle}
                        </h2>
                    </div>
                    <div className="relative rounded-[3rem] overflow-hidden border-2 border-[#1a2355]/10 dark:border-[#1a2355]/30 shadow-2xl shadow-blue-900/10 h-[450px] md:h-[520px]">
                        <iframe
                            title="AzTU Map"
                            src="https://www.google.com/maps?q=H.Cavid+25,+Baku,+Azerbaijan&output=embed"
                            className="absolute inset-0 w-full h-full"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </motion.div>
            </PageContainer>
        </main>
    );
}

function FormField({
    icon,
    label,
    children,
    align = "center",
}: {
    icon: React.ReactNode;
    label: string;
    children: React.ReactNode;
    align?: "center" | "top";
}) {
    return (
        <label className="block">
            <span className="block text-[10px] font-black uppercase tracking-[0.25em] text-[#1a2355]/60 dark:text-white/60 mb-3">
                {label}
            </span>
            <div
                className={`flex ${align === "top" ? "items-start" : "items-center"} gap-4 px-5 py-4 rounded-2xl bg-white dark:bg-slate-950/40 border-2 border-[#1a2355]/10 dark:border-white/10 focus-within:border-[#ee7c7e] focus-within:ring-4 focus-within:ring-[#ee7c7e]/10 transition-all duration-300`}
            >
                <span className={`text-[#1a2355]/40 dark:text-white/40 ${align === "top" ? "mt-1" : ""}`}>{icon}</span>
                {children}
            </div>
        </label>
    );
}
