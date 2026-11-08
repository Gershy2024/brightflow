"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function PublicFooter() {
  const router = useRouter();
  const [logoClicks, setLogoClicks] = React.useState(0);

  // Hidden admin shortcut via footer logo: triple click
  const handleLogoClick = () => {
    const next = logoClicks + 1;
    if (next >= 3) {
      setLogoClicks(0);
      router.push("/admin");
    } else {
      setLogoClicks(next);
      setTimeout(() => setLogoClicks(0), 1200);
    }
  };

  return (
    <footer className="border-t border-black/[0.06] dark:border-white/[0.08] py-14 text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-6">
          <div className="space-y-1">
            <button
              type="button"
              onClick={handleLogoClick}
              className="font-serif text-xl font-bold tracking-tight text-[#121316] dark:text-[#F3F3F5] text-left cursor-pointer"
            >
              BrightFlow Studio
            </button>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-normal">
              Bespoke websites and web applications built around your business.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-slate-400">
            <a href="#work" className="hover:text-[#121316] dark:hover:text-white transition-colors">
              Work
            </a>
            <a href="#about" className="hover:text-[#121316] dark:hover:text-white transition-colors">
              About
            </a>
            <a href="#services" className="hover:text-[#121316] dark:hover:text-white transition-colors">
              Services & Process
            </a>
            <a href="#contact" className="hover:text-[#121316] dark:hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-black/[0.04] dark:border-white/[0.04] text-[11px] text-slate-400">
          <div>
            © {new Date().getFullYear()} BrightFlow. Independent Digital Studio.
          </div>
          <div>
            מופעל ע״י BrightFlow
          </div>
        </div>

      </div>
    </footer>
  );
}
