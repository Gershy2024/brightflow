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
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Process", href: "#process" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAFAFA]/90 dark:bg-[#0B0E14]/90 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-xs"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo with secret triple-click to /admin */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-center gap-3 group select-none cursor-pointer"
          title="BrightFlow Studio"
        >
          <div className="relative flex items-center justify-center">
            <BrightFlowLogoIcon
              size={36}
              className="transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
              BrightFlow
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/60">
              Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation - 4 clean links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {/* Light / Dark Mode Toggle */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-slate-200 dark:hover:border-white/10"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {/* Let's Talk CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-xs hover:shadow-md transition-all active:scale-[0.98]"
          >
            <span>Let’s Talk</span>
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0B0E14] border-b border-slate-200 dark:border-white/10 px-5 pt-3 pb-6 space-y-4 shadow-xl">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-800 dark:text-slate-200 hover:text-blue-600 py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm shadow-xs"
            >
              <span>Let’s Talk</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
