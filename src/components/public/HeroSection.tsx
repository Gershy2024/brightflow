"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12 sm:space-y-16">
        
        {/* Editorial Headline & Intro */}
        <div className="max-w-3xl space-y-6 text-left">
          <div className="text-xs font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500">
            Independent Digital Studio
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-serif font-bold tracking-tight text-[#121316] dark:text-[#F3F3F5] leading-[1.08]">
            Custom websites.<br />
            <span className="text-[#1D4ED8] dark:text-blue-400 italic font-normal">
              Built for your business.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-2xl">
            We build custom websites, member portals, and operational platforms for growing organizations. Considered design, clean code, and direct collaboration from day one.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-5">
            <a
              href="#work"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#121316] text-[#FAF8F5] dark:bg-[#F3F3F5] dark:text-[#121316] text-sm font-medium hover:bg-blue-700 dark:hover:bg-blue-600 dark:hover:text-white transition-colors"
            >
              <span>See selected work</span>
              <ArrowDown className="h-4 w-4" />
            </a>

            <a
              href="#contact"
              className="text-sm font-normal text-slate-600 dark:text-slate-400 hover:text-blue-700 dark:hover:text-white transition-colors underline underline-offset-4"
            >
              or get in touch
            </a>
          </div>
        </div>

        {/* Hero Featured Work Banner: Wide, full-bleed visual showcase */}
        <div className="space-y-3 pt-4">
          <div className="relative rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] shadow-sm bg-[#FCFAF6] dark:bg-[#141620]">
            
            {/* Browser frame bar */}
            <div className="px-5 py-3 bg-[#F4EFE6]/70 dark:bg-white/[0.04] border-b border-black/[0.05] dark:border-white/[0.05] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
              </div>
              <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                amudei-haolam.com • Donor Portal
              </div>
              <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                Live Production
              </div>
            </div>

            {/* Immersive visual with authentic project brand assets */}
            <div className="relative p-8 sm:p-14 lg:p-16 min-h-[360px] sm:min-h-[440px] flex flex-col justify-between overflow-hidden">
              
              {/* Background visual asset from project */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10 dark:opacity-15 pointer-events-none"
                style={{ backgroundImage: "url('/projects/amudei/pillars-hero-bg.jpg')" }}
              />

              {/* Top brand row */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 relative">
                    <Image
                      src="/projects/amudei/amudei-gold-emblem.svg"
                      alt="Amudei HaOlam Seal"
                      width={40}
                      height={40}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="font-serif font-bold text-lg text-amber-950 dark:text-amber-200">
                      עמודי העולם
                    </div>
                    <div className="text-[11px] text-amber-900/60 dark:text-amber-400/60 font-mono">
                      Kollel Donor Network
                    </div>
                  </div>
                </div>

                <span className="hidden sm:inline-block text-xs font-mono px-3 py-1 rounded bg-amber-900/5 dark:bg-amber-400/10 text-amber-900 dark:text-amber-300 border border-amber-900/10">
                  Custom Platform
                </span>
              </div>

              {/* Center showcase content */}
              <div className="relative z-10 my-auto py-8 max-w-xl text-right ml-auto">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-800 dark:text-amber-300">
                  שטר שותפות יששכר וזבולון
                </span>
                <h3 className="text-2xl sm:text-4xl font-serif font-bold text-slate-900 dark:text-white mt-1 leading-snug">
                  פורטל תורמים יוקרתי ומחולל שטרי שותפות דיגיטליים
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal mt-2 leading-relaxed">
                  הפקת שטרי שותפות מהודרים בפורמט דיגיטלי, אזור אישי לתורמי VIP, ומעקב קבע בזמן אמת עבור הנהלת הכולל.
                </p>
              </div>

              {/* Bottom stats row */}
              <div className="relative z-10 pt-4 border-t border-amber-900/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-mono">Scope</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">Custom Web Application</span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block uppercase font-mono">Delivery</span>
                    <span className="font-medium text-slate-800 dark:text-slate-200">Full Design & Full-Stack</span>
                  </div>
                </div>

                <a
                  href="#work"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1D4ED8] dark:text-blue-400 hover:underline"
                >
                  <span>Explore this project below</span>
                  <ArrowDown className="h-3.5 w-3.5" />
                </a>
              </div>

            </div>
          </div>

          {/* Under-image caption */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
            <span>Featured Case Study — Amudei HaOlam Luxury Philanthropy Portal</span>
            <span className="font-mono text-[11px]">Designed & Engineered by BrightFlow</span>
          </div>
        </div>

      </div>
    </section>
  );
}
