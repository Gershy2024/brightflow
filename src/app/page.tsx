"use client";

import * as React from "react";
import { PublicNavbar } from "@/components/public/PublicNavbar";
import { HeroSection } from "@/components/public/HeroSection";
import { SpeedRaceSection } from "@/components/public/SpeedRaceSection";
import { BeforeAfterSection } from "@/components/public/BeforeAfterSection";
import { PipelineSimulatorSection } from "@/components/public/PipelineSimulatorSection";
import { TelephonySimulator } from "@/components/public/TelephonySimulator";
import { RoiCalculatorSection } from "@/components/public/RoiCalculatorSection";
import { SolutionsBento } from "@/components/public/SolutionsBento";
import { AutomationQuiz } from "@/components/public/AutomationQuiz";
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
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] dark:bg-[#0B0E17]">
        <div className="h-8 w-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B0E17] text-slate-900 dark:text-slate-100 selection:bg-indigo-500/20 selection:text-indigo-600 font-sans transition-colors duration-200">
      {/* 1. Sticky Navigation (Admin Portal hidden from regular visitors) */}
      <PublicNavbar
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      <main className="flex flex-col">
        {/* 2. Hero Section with Live Micro-Automation Sandbox */}
        <HeroSection />

        {/* 3. Live Benchmark Speed Race (Human vs. BrightFlow Engine) */}
        <SpeedRaceSection />

        {/* 4. Reality Check: Before vs. After Interactive Comparison */}
        <BeforeAfterSection />

        {/* 5. Interactive Live Visual Pipeline Simulator */}
        <PipelineSimulatorSection />

        {/* 6. Interactive Smartphone Telephony & Call Screening Simulator */}
        <TelephonySimulator />

        {/* 7. Interactive ROI & Time-Saved Calculator */}
        <RoiCalculatorSection />

        {/* 8. Core Solutions Bento Grid */}
        <SolutionsBento />

        {/* 9. 60-Second Automation Health Score Diagnostic Quiz */}
        <AutomationQuiz />

        {/* 10. Frequently Asked Questions Accordion */}
        <FaqSection />

        {/* 11. Live Inquiry & Automation Discovery Form */}
        <InquirySection />
      </main>

      {/* 12. Footer with Discreet Security & Architecture Focus */}
      <PublicFooter />
    </div>
  );
}
