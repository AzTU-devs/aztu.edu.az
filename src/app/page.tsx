"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";
import HeroSection from "@/components/home/heroSection/HeroSection";
import StatsSection from "@/components/home/stats/StatsSection";

const News = dynamic(() => import("@/components/home/news/News"), { ssr: false });
const Announcements = dynamic(() => import("@/components/home/announcements.tsx/Announcements"), { ssr: false });
const Collaborators = dynamic(() => import("@/components/home/collaborators/Collaborators"), { ssr: false });
const Projects = dynamic(() => import("@/components/home/projects/Projects"), { ssr: false });

function SectionReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <SectionReveal>
        <News />
      </SectionReveal>
      <SectionReveal delay={0.05}>
        <Announcements />
      </SectionReveal>
      <SectionReveal delay={0.05}>
        <Collaborators />
      </SectionReveal>
      <SectionReveal delay={0.05}>
        <Projects />
      </SectionReveal>
    </main>
  );
}
