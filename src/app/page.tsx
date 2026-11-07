"use client";

import * as React from "react";
import { PublicNavbar } from "@/components/public/PublicNavbar";
import { HeroSection } from "@/components/public/HeroSection";
import { WorkSection } from "@/components/public/WorkSection";
import { ServicesSection } from "@/components/public/ServicesSection";
import { ProcessSection } from "@/components/public/ProcessSection";
import { TestimonialsSection } from "@/components/public/TestimonialsSection";
import { FaqSection } from "@/components/public/FaqSection";
import { InquirySection } from "@/components/public/InquirySection";
import { PublicFooter } from "@/components/public/PublicFooter";

export default function BrightFlowPublicWebsite() {
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
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] dark:bg-[#0B0E14]">
        <div className="h-7 w-7 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0B0E14] text-slate-900 dark:text-slate-100 selection:bg-blue-600/15 selection:text-blue-600 font-sans transition-colors duration-200">
      {/* 1. Clean Navigation Bar: Work • Services • Process • Contact */}
      <PublicNavbar
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      <main className="flex flex-col">
        {/* 2. Hero Section: "Custom websites. Built around your business." with Desktop + Mobile mockup */}
        <HeroSection />

        {/* 3. Featured Portfolio: 3 Large Projects (Amudei HaOlam, MB Management, Shekel HaKodesh) */}
        <WorkSection />

        {/* 4. Core Services: Bespoke Web Apps, High-Converting Sites, Telephony & Pipelines */}
        <ServicesSection />

        {/* 5. Process: 3-Step Transparent Methodology */}
        <ProcessSection />

        {/* 6. Testimonials: Authentic Client Quotes */}
        <TestimonialsSection />

        {/* 7. FAQ: Clear Answers on Timing, Tech Stack & Mobile Responsiveness */}
        <FaqSection />

        {/* 8. Shortened Contact Form: Name, Email, Project Type, Notes */}
        <InquirySection />
      </main>

      {/* 9. Minimal Studio Footer */}
      <PublicFooter />
    </div>
  );
}
