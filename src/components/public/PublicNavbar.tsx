"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BrightFlowLogoIcon } from "@/components/BrightFlowLogo";
import {
  Sun,
  Moon,
  ArrowRight,
  Menu,
  X,
  Sparkles,
  Zap,
} from "lucide-react";

interface PublicNavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function PublicNavbar({ darkMode, onToggleDarkMode }: PublicNavbarProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [logoClicks, setLogoClicks] = React.useState(0);

  // Hidden admin access: Ctrl+Shift+A keyboard shortcut
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        router.push("/admin");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  // Hidden admin access: Triple-click logo
  const handleLogoClick = (e: React.MouseEvent) => {
    const next = logoClicks + 1;
    if (next >= 3) {
      e.preventDefault();
      setLogoClicks(0);
      router.push("/admin");
    } else {
      setLogoClicks(next);
      setTimeout(() => setLogoClicks(0), 1200);
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "Before vs After", href: "#comparison" },
    { label: "Speed Test", href: "#speed-race" },
    { label: "Live Pipeline", href: "#pipeline" },
    { label: "Voice Simulator", href: "#telephony-demo" },
    { label: "ROI Calculator", href: "#calculator" },
    { label: "Quiz", href: "#quiz" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#0B0E17]/80 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/10 shadow-sm shadow-slate-900/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with secret triple-click to /admin */}
        <Link href="/" onClick={handleLogoClick} className="flex items-center gap-3 group select-none">
          <div className="relative">
            <BrightFlowLogoIcon size={38} className="transition-transform duration-300 group-hover:scale-105" />
            <div className="absolute -inset-1 rounded-2xl bg-cyan-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-slate-100 dark:to-cyan-200 bg-clip-text text-transparent">
              The Bright Flow
            </span>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-indigo-600 dark:text-cyan-400">
              Automation Systems
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-white/[0.04] p-1.5 rounded-full border border-slate-200/60 dark:border-white/10 backdrop-blur-md">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white rounded-full transition-colors hover:bg-white dark:hover:bg-white/10 whitespace-nowrap"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Actions: Theme Toggle + High-Converting Public CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Dark / Light Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
          </button>

          {/* Contact CTA */}
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 text-white shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/35 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <span>Start Automating</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-[#0B0E17]/95 backdrop-blur-2xl border-b border-slate-200 dark:border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-white/10 flex flex-col gap-2.5">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 text-sm font-bold text-white rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 shadow-md"
            >
              Start Automating
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
