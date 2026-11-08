"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sun, Moon, ArrowUpRight, Menu, X } from "lucide-react";

interface PublicNavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export function PublicNavbar({ darkMode, onToggleDarkMode }: PublicNavbarProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [logoClicks, setLogoClicks] = React.useState(0);

  // Hidden admin access: Ctrl+Shift+A
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
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF8F5]/90 dark:bg-[#0E1015]/90 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.08]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Wordmark with secret triple-click to /admin */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="flex items-baseline gap-2 group cursor-pointer select-none"
        >
          <span className="font-serif text-2xl font-bold tracking-tight text-[#121316] dark:text-[#F3F3F5] group-hover:text-blue-700 transition-colors">
            BrightFlow
          </span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500">
            Studio
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-normal text-slate-600 dark:text-slate-300 hover:text-[#121316] dark:hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#121316] text-[#FAF8F5] dark:bg-[#F3F3F5] dark:text-[#121316] text-xs font-medium hover:bg-blue-700 dark:hover:bg-blue-600 dark:hover:text-white transition-colors"
          >
            <span>Start a project</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            type="button"
            onClick={onToggleDarkMode}
            className="p-1.5 text-slate-500"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-800 dark:text-slate-100"
            aria-label="Open menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] dark:bg-[#0E1015] border-b border-black/[0.06] dark:border-white/[0.08] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-normal text-slate-800 dark:text-slate-200 py-1"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-1.5 py-3 rounded-lg bg-[#121316] text-[#FAF8F5] dark:bg-[#F3F3F5] dark:text-[#121316] text-sm font-medium"
            >
              <span>Start a project</span>
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
