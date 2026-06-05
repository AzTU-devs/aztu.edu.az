"use client";

import Image from "next/image";
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
import VideocamIcon from "@mui/icons-material/Videocam";

import DaadLogo from "@/../public/logo/daad.png";

const ZOOM_URL =
  "https://uni-bonn.zoom.us/j/68833298488?pwd=9ccShWCFBhMqTb6o6BzspKPvpfEVDN.1";

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

              {/* Online info session — added after the last paragraph */}
              <div className="mt-8 rounded-3xl border-2 border-[#ee7c7e]/30 bg-[#ee7c7e]/5 p-6 md:p-7">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-[#ee7c7e] text-white flex items-center justify-center shadow-lg">
                    <VideocamIcon sx={{ fontSize: 26 }} />
                  </div>
                  <div>
                    <span className="block text-[11px] font-black uppercase tracking-[0.25em] text-[#ee7c7e] mb-2">
                      {lang === "az" ? "Onlayn İnfo Sessiya" : "Online Info Session"}
                    </span>
                    <p className="text-[#1a2355] font-bold text-base leading-relaxed">
                      Online info session on 5 June, 5 pm:{" "}
                      <Link
                        href={ZOOM_URL}
                        target="_blank"
                        className="text-[#ee7c7e] underline decoration-2 underline-offset-4 break-all hover:text-[#d96365] transition-colors"
                      >
                        {ZOOM_URL}
                      </Link>
                    </p>
                  </div>
                </div>
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

              {/* Supported by — DAAD */}
              <div className="p-8 rounded-[2.5rem] bg-white border-2 border-[#1a2355]/20 shadow-2xl">
                <span className="text-[10px] font-black text-[#1a2355]/40 uppercase tracking-[0.3em] block mb-5">
                  {lang === "az" ? "Dəstəkçilər" : "Supported by"}
                </span>
                <a
                  href="https://www.daad.de/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center bg-white border border-gray-100 rounded-3xl p-6 hover:border-[#ee7c7e]/40 transition-all"
                >
                  <Image
                    src={DaadLogo}
                    alt="DAAD — Deutscher Akademischer Austauschdienst"
                    className="h-14 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                    priority
                  />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </PageContainer>
    </main>
  );
}
