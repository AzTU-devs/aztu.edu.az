"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import News from "@/components/home/news/News";
import Footer from "@/components/footer/Footer";
import Loading from "@/components/loading/Loading";
import Projects from "@/components/home/projects/Projects";
import Collaborators from "@/components/home/collaborators/Collaborators";
import HeaderChanger from "@/components/header/HeaderChanger";
import Announcements from "@/components/home/announcements.tsx/Announcements";
import HeroSection from "@/components/home/heroSection/HeroSection";

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
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <HeaderChanger />
      <main className="overflow-x-hidden">
        {/* Hero — no reveal wrapper, plays immediately */}
        <HeroSection />

        {/* News section */}
        <SectionReveal>
          <News />
        </SectionReveal>

        {/* Announcements — dark band */}
        <SectionReveal delay={0.05}>
          <Announcements />
        </SectionReveal>

        {/* Projects */}
        <SectionReveal delay={0.05}>
          <Projects />
        </SectionReveal>

        {/* Collaborators */}
        <SectionReveal delay={0.05}>
          <Collaborators />
        </SectionReveal>
      </main>

      <Footer />
      {isLoading && <Loading />}
    </>
  );
}
