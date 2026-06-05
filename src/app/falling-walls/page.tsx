"use client";

<<<<<<< HEAD
import Link from "next/link";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/context/LanguageContext";
import PageHero from "@/components/shared/PageHero";
import PageContainer from "@/components/shared/PageContainer";

import PublicIcon from "@mui/icons-material/Public";
import InfoIcon from "@mui/icons-material/Info";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import LayersIcon from "@mui/icons-material/Layers";
import LanguageIcon from "@mui/icons-material/Language";
import GroupIcon from "@mui/icons-material/Group";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function FallingWallsPage() {
  const t = useTranslation();
  const { lang } = useLanguage();
  const fw = (t.pages as any).fallingWalls;

  const sidebarStats = [
    { label: fw.sidebar.finaleLabel, value: fw.sidebar.finaleValue, icon: <EmojiEventsIcon sx={{ fontSize: 22 }} /> },
    { label: fw.sidebar.tripLabel, value: fw.sidebar.tripValue, icon: <FlightTakeoffIcon sx={{ fontSize: 22 }} /> },
    { label: fw.sidebar.durationLabel, value: fw.sidebar.durationValue, icon: <AccessTimeIcon sx={{ fontSize: 22 }} /> },
    { label: fw.sidebar.slidesLabel, value: fw.sidebar.slidesValue, icon: <LayersIcon sx={{ fontSize: 22 }} /> },
    { label: fw.sidebar.formatLabel, value: fw.sidebar.formatValue, icon: <GroupIcon sx={{ fontSize: 22 }} /> },
    { label: fw.sidebar.languageLabel, value: fw.sidebar.languageValue, icon: <LanguageIcon sx={{ fontSize: 22 }} /> },
  ];

  return (
    <main className="relative min-h-screen selection:bg-[#ee7c7e]/30 overflow-hidden bg-page">
      <div className="bg-mesh opacity-100" />
      <div className="bg-grid-premium opacity-10" />
      <div className="fixed top-1/4 -left-20 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full animate-pulse" />
      <div
        className="fixed bottom-1/4 -right-20 w-96 h-96 bg-[#ee7c7e]/5 blur-[120px] rounded-full animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <PageHero
        title={fw.title}
        description={fw.subtitle}
        breadcrumbs={[{ label: fw.breadcrumb }]}
        eyebrow={fw.eyebrow}
      />

      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 -mt-20">
          {/* ── Main Content ── */}
          <div className="lg:col-span-8 space-y-10">

            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-3xl rounded-[3rem] border-2 border-[#1a2355]/20 p-10 md:p-14 shadow-2xl shadow-blue-900/5 relative overflow-hidden hover:border-[#ee7c7e]/20 transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ee7c7e] to-transparent opacity-30" />
              <h2 className="text-2xl font-black text-[#1a2355] uppercase tracking-tighter mb-8 flex items-center gap-4">
                <InfoIcon className="text-[#ee7c7e]" sx={{ fontSize: 32 }} />
                {fw.about.title}
              </h2>
              <div className="space-y-5">
                {fw.about.paragraphs.map((p: string, i: number) => (
                  <p key={i} className="text-gray-700 text-base leading-relaxed font-medium">
                    {p}
                  </p>
                ))}
              </div>
              <div className="mt-8 flex items-center gap-3 text-sm text-gray-500 font-medium">
                <PublicIcon sx={{ fontSize: 18 }} className="text-[#ee7c7e]" />
                <span>{fw.about.moreInfo}</span>
                <Link
                  href={fw.about.moreInfoLink}
                  target="_blank"
                  className="text-[#ee7c7e] font-black hover:underline inline-flex items-center gap-1"
                >
                  falling-walls.com/lab
                  <OpenInNewIcon sx={{ fontSize: 14 }} />
                </Link>
              </div>
            </motion.div>

            {/* Eligibility Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-3xl rounded-[3rem] border-2 border-[#1a2355]/20 p-10 md:p-14 shadow-2xl shadow-blue-900/5 relative overflow-hidden hover:border-[#ee7c7e]/20 transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20" />
              <h2 className="text-2xl font-black text-[#1a2355] uppercase tracking-tighter mb-8 flex items-center gap-4">
                <PeopleIcon className="text-[#ee7c7e]" sx={{ fontSize: 32 }} />
                {fw.eligibility.title}
              </h2>
              <p className="text-gray-700 text-base leading-relaxed font-medium mb-8">
                {fw.eligibility.intro}
              </p>
              <ul className="space-y-4 mb-10">
                {fw.eligibility.requirements.map((req: string, i: number) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4 text-gray-800 font-semibold text-base"
                  >
                    <CheckCircleOutlineIcon className="text-[#ee7c7e] shrink-0" sx={{ fontSize: 22 }} />
                    {req}
                  </motion.li>
                ))}
              </ul>

              {/* Notes */}
              <div className="bg-amber-50/80 border-2 border-amber-200/60 rounded-3xl p-8">
                <h3 className="flex items-center gap-3 text-base font-black text-amber-800 uppercase tracking-wider mb-5">
                  <WarningAmberIcon sx={{ fontSize: 20 }} className="text-amber-500" />
                  {fw.eligibility.notesTitle}
                </h3>
                <ul className="space-y-3">
                  {fw.eligibility.notes.map((note: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 text-amber-900 text-sm font-medium leading-relaxed">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Application Process */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-3xl rounded-[3rem] border-2 border-[#1a2355]/20 p-10 md:p-14 shadow-2xl shadow-blue-900/5 relative overflow-hidden hover:border-[#ee7c7e]/20 transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ee7c7e] to-transparent opacity-30" />
              <h2 className="text-2xl font-black text-[#1a2355] uppercase tracking-tighter mb-8 flex items-center gap-4">
                <AssignmentIcon className="text-[#ee7c7e]" sx={{ fontSize: 32 }} />
                {fw.application.title}
              </h2>
              <p className="text-gray-700 text-base leading-relaxed font-medium mb-6">
                {fw.application.description}
              </p>
              <p className="text-gray-700 text-base leading-relaxed font-medium mb-10">
                {fw.application.afterDeadline}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-6 bg-[#1a2355]/5 rounded-2xl border border-[#1a2355]/10">
                <span className="text-sm font-black text-[#1a2355] uppercase tracking-widest whitespace-nowrap">
                  {fw.application.linkLabel}:
                </span>
                <Link
                  href={fw.application.link}
                  target="_blank"
                  className="inline-flex items-center gap-2 text-[#ee7c7e] font-black text-sm hover:underline break-all"
                >
                  {fw.application.linkDisplay}
                  <OpenInNewIcon sx={{ fontSize: 16 }} />
                </Link>
              </div>
            </motion.div>

            {/* Presentation Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-3xl rounded-[3rem] border-2 border-[#1a2355]/20 p-10 md:p-14 shadow-2xl shadow-blue-900/5 relative overflow-hidden hover:border-[#ee7c7e]/20 transition-all duration-500"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20" />
              <h2 className="text-2xl font-black text-[#1a2355] uppercase tracking-tighter mb-10 flex items-center gap-4">
                <SlideshowIcon className="text-[#ee7c7e]" sx={{ fontSize: 32 }} />
                {fw.presentation.title}
              </h2>

              {/* Time Limit */}
              <div className="flex items-start gap-4 mb-10 p-6 bg-[#ee7c7e]/5 rounded-2xl border border-[#ee7c7e]/20">
                <AccessTimeIcon className="text-[#ee7c7e] shrink-0 mt-0.5" sx={{ fontSize: 24 }} />
                <div>
                  <span className="text-xs font-black text-[#1a2355]/50 uppercase tracking-widest block mb-1">
                    {fw.presentation.timeLimitLabel}
                  </span>
                  <p className="text-gray-800 font-semibold text-base">{fw.presentation.timeLimit}</p>
                </div>
              </div>

              {/* Structure */}
              <div className="mb-10">
                <h3 className="text-lg font-black text-[#1a2355] uppercase tracking-wider mb-4">
                  {fw.presentation.structureTitle}
                </h3>
                <p className="text-gray-700 text-base font-medium mb-6 leading-relaxed">
                  {fw.presentation.structureIntro}
                </p>
                <div className="space-y-3">
                  {fw.presentation.slides.map((slide: string, i: number) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-5"
                    >
                      <div className="w-10 h-10 rounded-2xl bg-[#1a2355] text-white flex items-center justify-center font-black text-sm shrink-0 shadow-lg">
                        {i + 1}
                      </div>
                      <span className="text-gray-700 font-medium text-base">{slide}</span>
                    </motion.div>
                  ))}
                </div>
                <p className="mt-6 text-sm text-gray-500 font-medium italic border-l-4 border-[#ee7c7e]/40 pl-4">
                  {fw.presentation.templateNote}
                </p>
              </div>

              {/* Content Guidelines */}
              <div className="p-6 bg-[#1a2355]/5 rounded-2xl border border-[#1a2355]/10">
                <h3 className="text-base font-black text-[#1a2355] uppercase tracking-wider mb-3">
                  {fw.presentation.guidelinesTitle}
                </h3>
                <p className="text-gray-700 text-sm font-medium leading-relaxed">
                  {fw.presentation.guidelines}
                </p>
              </div>
            </motion.div>
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:col-span-4 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="sticky top-28 space-y-6"
            >
              {/* Key Facts Card */}
              <div className="p-8 rounded-[2.5rem] bg-white border-2 border-[#1a2355]/20 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ee7c7e]/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl bg-gray-50 border border-gray-100 mb-6">
                    <div className="w-2 h-2 rounded-full bg-[#ee7c7e] animate-pulse" />
                    <span className="text-[#1a2355]/60 text-[10px] font-black uppercase tracking-[0.3em]">
                      {fw.sidebar.keyFacts}
                    </span>
                  </div>
                  <div className="space-y-5">
                    {sidebarStats.map((stat, i) => (
                      <div key={i} className="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                        <div className="w-10 h-10 rounded-xl bg-[#ee7c7e]/10 text-[#ee7c7e] flex items-center justify-center shrink-0">
                          {stat.icon}
                        </div>
                        <div>
                          <span className="text-[10px] font-black text-[#1a2355]/40 uppercase tracking-widest block">
                            {stat.label}
                          </span>
                          <span className="text-sm font-black text-[#1a2355]">{stat.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Apply CTA */}
              <Link
                href={fw.sidebar.applyUrl}
                target="_blank"
                className="flex items-center justify-center gap-3 w-full bg-[#1a2355] text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm hover:bg-[#ee7c7e] transition-all shadow-xl shadow-blue-900/10 group"
              >
                <EmojiEventsIcon sx={{ fontSize: 18 }} className="group-hover:scale-110 transition-transform" />
                {fw.sidebar.applyButton}
              </Link>

              <Link
                href={fw.sidebar.moreInfoUrl}
                target="_blank"
                className="flex items-center justify-center gap-3 w-full bg-white text-[#1a2355] py-4 rounded-2xl font-black uppercase tracking-widest text-xs border-2 border-[#1a2355]/20 hover:border-[#ee7c7e]/40 transition-all"
              >
                <PublicIcon sx={{ fontSize: 16 }} />
                {fw.sidebar.moreInfoButton}
              </Link>
            </motion.div>
          </div>
        </div>
      </PageContainer>
    </main>
  );
=======
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { useLanguage } from "@/context/LanguageContext";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import VideocamIcon from "@mui/icons-material/Videocam";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

import DaadLogo from "@/../public/logo/daad.png";

const ZOOM_URL =
    "https://uni-bonn.zoom.us/j/68833298488?pwd=9ccShWCFBhMqTb6o6BzspKPvpfEVDN.1";

const CONTENT = {
    az: {
        home: "Ana səhifə",
        eyebrow: "Beynəlxalq Müsabiqə",
        title: "Falling Walls Lab",
        lead: "Gənc tədqiqatçılar, sahibkarlar və yenilikçilər üçün öz ideyalarını dünya ilə bölüşmək imkanı.",
        sectionTitle: "Falling Walls Lab nədir?",
        paragraphs: [
            "Falling Walls Lab elm, biznes və cəmiyyət arasında körpü quran beynəlxalq bir platformadır. İştirakçılar öz tədqiqat işlərini, biznes ideyalarını və ya sosial təşəbbüslərini cəmi 3 dəqiqə ərzində beynəlxalq münsiflər heyəti qarşısında təqdim edirlər.",
            "Müsabiqə dünyanın 80-dən çox ölkəsində keçirilir və hər il minlərlə tələbə, doktorant və gənc mütəxəssisi bir araya gətirir. Məqsəd “Hansı divarları yıxacaq növbəti böyük addım nədir?” sualına ən təsirli və yaradıcı cavabı tapmaqdır.",
            "Hər bir yerli mərhələnin qalibi Berlində keçirilən Falling Walls Lab Finalında iştirak etmək hüququ qazanır. Bu final hər il Noyabr ayında, Falling Walls Science Summit çərçivəsində baş tutur və qaliblər öz ideyalarını dünyanın aparıcı alimləri və investorları qarşısında təqdim edirlər.",
        ],
        sessionLabel: "Onlayn İnfo Sessiya",
        sessionText:
            "Online info session on 5 June, 5 pm:",
        partnersTitle: "Dəstəkçilər",
    },
    en: {
        home: "Home",
        eyebrow: "International Competition",
        title: "Falling Walls Lab",
        lead: "An opportunity for young researchers, entrepreneurs and innovators to share their breakthrough ideas with the world.",
        sectionTitle: "What is Falling Walls Lab?",
        paragraphs: [
            "Falling Walls Lab is an international platform that bridges science, business and society. Participants present their research work, business ideas or social initiatives to an interdisciplinary jury in just 3 minutes.",
            "The competition takes place in more than 80 countries and every year brings together thousands of students, PhD candidates and young professionals. The goal is to find the most compelling and creative answer to the question: “Which are the next walls to fall?”",
            "Each local winner earns the right to take part in the Falling Walls Lab Finale in Berlin. The Finale is held every November as part of the Falling Walls Science Summit, where winners present their ideas in front of the world’s leading scientists and investors.",
        ],
        sessionLabel: "Online Info Session",
        sessionText: "Online info session on 5 June, 5 pm:",
        partnersTitle: "Supported by",
    },
} as const;

export default function FallingWallsPage() {
    const { lang } = useLanguage();
    const c = CONTENT[lang === "en" ? "en" : "az"];

    return (
        <main className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] selection:bg-[#ee7c7e]/30">
            {/* HERO */}
            <div className="relative overflow-hidden pt-44 lg:pt-48 pb-20 bg-gradient-to-br from-[#0b1e3a] via-[#1a2355] to-[#0b1330]">
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
                     style={{ backgroundImage: "radial-gradient(white 0.5px, transparent 0.5px)", backgroundSize: "32px 32px" }} />
                <div className="absolute top-0 right-0 w-[50%] h-[60%] bg-[#ee7c7e]/[0.08] blur-[120px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-[1200px] mx-auto px-4 md:px-10 lg:px-20">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 text-white/60 text-xs mb-12">
                        <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
                            <HomeIcon sx={{ fontSize: 14 }} />
                            {c.home}
                        </Link>
                        <ChevronRightIcon sx={{ fontSize: 12 }} />
                        <span className="text-[#ee7c7e] font-bold">{c.title}</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#ee7c7e] text-xs font-black uppercase tracking-[0.3em] mb-6">
                            {c.eyebrow}
                        </span>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[1.05] tracking-tight">
                            {c.title}
                        </h1>
                        <p className="text-lg md:text-2xl text-white/80 font-medium max-w-3xl leading-relaxed">
                            {c.lead}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="max-w-[900px] mx-auto px-4 md:px-10 lg:px-0 py-20">
                <section>
                    <h2 className="text-2xl md:text-3xl font-black text-[#1a2355] dark:text-white mb-8 flex items-center gap-3">
                        <div className="w-2 h-8 bg-[#ee7c7e] rounded-full" />
                        {c.sectionTitle}
                    </h2>

                    <div className="space-y-6">
                        {c.paragraphs.map((para, i) => (
                            <p key={i} className="text-base md:text-lg text-gray-600 dark:text-white/70 leading-relaxed">
                                {para}
                            </p>
                        ))}
                    </div>

                    {/* Online info session callout — placed after the last paragraph */}
                    <div className="mt-10 rounded-[1.75rem] border border-[#ee7c7e]/30 bg-[#ee7c7e]/[0.06] dark:bg-[#ee7c7e]/[0.08] p-7 shadow-sm">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#ee7c7e] text-white flex items-center justify-center shadow-lg">
                                <VideocamIcon sx={{ fontSize: 26 }} />
                            </div>
                            <div>
                                <span className="block text-[11px] font-black uppercase tracking-[0.25em] text-[#ee7c7e] mb-2">
                                    {c.sessionLabel}
                                </span>
                                <p className="text-base md:text-lg font-bold text-[#1a2355] dark:text-white leading-relaxed">
                                    {c.sessionText}{" "}
                                    <a
                                        href={ZOOM_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-[#ee7c7e] underline decoration-2 underline-offset-4 break-all hover:text-[#d96365] transition-colors"
                                    >
                                        {ZOOM_URL}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Supported by — DAAD */}
                <section className="mt-16 pt-12 border-t border-gray-200 dark:border-slate-800">
                    <h3 className="text-sm font-black uppercase tracking-[0.25em] text-[#1a2355]/60 dark:text-white/50 mb-6 flex items-center gap-3">
                        <EmojiEventsIcon sx={{ fontSize: 18 }} className="text-[#ee7c7e]" />
                        {c.partnersTitle}
                    </h3>
                    <a
                        href="https://www.daad.de/en/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center justify-center bg-white dark:bg-white/5 border border-gray-100 dark:border-slate-700 rounded-[1.75rem] p-8 shadow-sm hover:shadow-xl hover:border-[#ee7c7e]/30 transition-all duration-300"
                    >
                        <Image
                            src={DaadLogo}
                            alt="DAAD — Deutscher Akademischer Austauschdienst"
                            className="h-16 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                            priority
                        />
                    </a>
                </section>
            </div>
        </main>
    );
>>>>>>> 656b429 (faliing-wall & footer)
}
