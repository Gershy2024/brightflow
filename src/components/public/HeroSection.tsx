"use client";

import * as React from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 border-b border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8 text-left space-y-8">
        
        {/* Studio Eyebrow */}
        <div className="text-xs font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500">
          Independent Digital Studio
        </div>

        {/* Headline: Balanced, upright, refined letter-spacing */}
        <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-serif font-bold tracking-[-0.03em] text-[#121316] dark:text-[#F3F3F5] leading-[1.12]">
          Custom websites.<br />
          <span className="text-[#1D4ED8] dark:text-blue-400 font-serif font-normal">
            Built for your business.
          </span>
        </h1>

        {/* Short, grounded description */}
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-2xl">
          We design and build custom websites, member portals, and business platforms for growing organizations. Direct collaboration, clean code, and software built around how you actually work.
        </p>

        {/* Actions */}
        <div className="pt-2 flex flex-wrap items-center gap-6">
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#121316] text-[#FAF8F5] dark:bg-[#F3F3F5] dark:text-[#121316] text-sm font-medium hover:bg-[#1D4ED8] dark:hover:bg-blue-600 dark:hover:text-white transition-colors shadow-xs"
          >
            <span>View selected work</span>
            <ArrowDown className="h-4 w-4" />
          </a>

          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-[#1D4ED8] dark:hover:text-white transition-colors"
          >
            <span>Start a project</span>
            <ArrowUpRight className="h-4 w-4 text-slate-400" />
          </a>
        </div>

      </div>
    </section>
  );
}
