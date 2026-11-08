"use client";

import * as React from "react";
import { PublicNavbar } from "@/components/public/PublicNavbar";
import { HeroSection } from "@/components/public/HeroSection";
import { WorkSection } from "@/components/public/WorkSection";
import { AboutSection } from "@/components/public/AboutSection";
import { ServicesAndProcessSection } from "@/components/public/ServicesAndProcessSection";
import { FaqSection } from "@/components/public/FaqSection";
import { InquirySection } from "@/components/public/InquirySection";
import { PublicFooter } from "@/components/public/PublicFooter";

export default function BrightFlowStudioHome() {
  const [darkMode, setDarkMode] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("bf_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleToggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    localStorage.setItem("bf_theme", next ? "dark" : "light");
    if (next) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] dark:bg-[#0E1015]">
        <div className="h-6 w-6 rounded-full border-2 border-[#1D4ED8] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#0E1015] text-[#121316] dark:text-[#F3F3F5] selection:bg-blue-600/15 selection:text-blue-600 font-sans transition-colors duration-200">
      {/* 1. Header Navigation */}
      <PublicNavbar
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      <main className="flex flex-col">
        {/* 2. Hero: Headline + Wide Featured Work */}
        <HeroSection />

        {/* 3. Selected Work: Flagship Full Width + 2 Secondary Projects */}
        <WorkSection />

        {/* 4. About: Short, honest, personal studio introduction */}
        <AboutSection />

        {/* 5. Services & Process: Asymmetrical, concise, no repetitive 3-column cards */}
        <ServicesAndProcessSection />

        {/* 6. FAQ: Compact, clean accordion */}
        <FaqSection />

        {/* 7. Contact: Grounded inquiry form */}
        <InquirySection />
      </main>

      {/* 8. Clean Studio Footer */}
      <PublicFooter />
    </div>
  );
}
