"use client";

import { useEffect, useState } from "react";
import News from "@/components/home/news/News";
import Footer from "@/components/footer/Footer";
import Loading from "@/components/loading/Loading";
import Slider from "@/components/home/slider/Slider";
import Projects from "@/components/home/projects/Projects";
import HeaderChanger from "@/components/header/HeaderChanger";
import Announcements from "@/components/home/announcements.tsx/Announcements";

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
      <main>
        <Slider />
        <News />
        <Announcements />
        {/* <Projects /> */}
      </main>
      <Footer />
      {isLoading && <Loading />}
    </>
  );
}
