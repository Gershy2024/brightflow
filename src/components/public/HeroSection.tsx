"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-36 sm:pb-24 bg-[#FAFAFA] dark:bg-[#0B0E14] border-b border-slate-200/60 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-center">
          
          {/* Left Column: Focused headline & 2-line subtitle */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-block text-xs font-medium text-blue-600 dark:text-blue-400 tracking-wide uppercase">
              Web Design & Development Studio
            </div>

            {/* Exactly two balanced lines */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Custom websites.<br />
              <span className="text-blue-600 dark:text-blue-400">
                Built for your business.
              </span>
            </h1>

            {/* Crisp 2-line paragraph with normal font weight */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-lg">
              We design and build bespoke, high-performance websites and digital platforms for growing organizations — tailored from initial concept to launch.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-all active:scale-[0.98] shadow-xs"
              >
                <span>View Our Work</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white dark:bg-white/[0.05] text-slate-800 dark:text-white font-medium text-sm border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all"
              >
                <span>Let’s Talk</span>
              </a>
            </div>
          </div>

          {/* Right Column: Large, uncluttered hero visual */}
          <div className="lg:col-span-6">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              
              {/* Desktop Screen Mockup - Clean, high visual presence */}
              <div className="rounded-2xl bg-white dark:bg-[#121520] border border-slate-200/90 dark:border-white/10 shadow-xl overflow-hidden">
                {/* Browser Top Bar */}
                <div className="px-4 py-2.5 bg-slate-100/90 dark:bg-slate-800/90 border-b border-slate-200/80 dark:border-white/5 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                  </div>
                  <div className="flex-1 max-w-[220px] mx-auto bg-white dark:bg-slate-900 rounded px-2.5 py-0.5 text-[11px] text-slate-400 font-mono text-center truncate">
                    amudei-haolam.com
                  </div>
                </div>

                {/* Hero Showcase Slice - Visual emphasis, no tiny cluttered texts */}
                <div className="p-6 sm:p-8 bg-gradient-to-b from-[#FDFBF7] to-[#F5ECE0] dark:from-[#151824] dark:to-[#1B1F30] select-none text-right">
                  <div className="flex items-center justify-between border-b border-amber-900/10 dark:border-white/5 pb-4 mb-6">
                    <span className="font-serif font-bold text-lg text-amber-900 dark:text-amber-200">
                      עמודי העולם
                    </span>
                    <span className="text-xs text-amber-800/70 dark:text-amber-400 font-medium">
                      פורטל תורמים יוקרתי
                    </span>
                  </div>

                  <div className="space-y-4 py-4 max-w-md ml-auto">
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white leading-snug">
                      שותפות נצח בהחזקת תורה
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                      הסכמי יששכר וזבולון מהודרים, מעקב תרומות דיגיטלי, והקדשת לימוד ישירה מול גדולי האברכים.
                    </p>
                    <div className="pt-2 flex items-center justify-end gap-3">
                      <span className="inline-block px-4 py-2 rounded-lg bg-[#C99B48] text-slate-950 font-semibold text-xs shadow-xs">
                        הנפקת שטר חתום
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Mobile Slice - Minimal & Clean */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-6 w-44 rounded-2xl bg-slate-900 p-2 shadow-2xl border-2 border-slate-700/80 hidden sm:block">
                <div className="w-12 h-2.5 bg-slate-800 mx-auto rounded-full mb-1.5" />
                <div className="rounded-xl bg-[#FFFDF9] dark:bg-[#141622] p-3 text-right space-y-2">
                  <div className="text-[10px] font-serif font-bold text-amber-900 dark:text-amber-300">
                    עמודי העולם
                  </div>
                  <div className="h-10 rounded-md bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 p-1.5 flex flex-col justify-center">
                    <span className="text-[9px] text-slate-700 dark:text-slate-200 font-medium">שטר שותפות פעיל</span>
                    <span className="text-[8px] text-emerald-600 font-semibold">מאושר וחתום</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
