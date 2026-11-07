"use client";

import * as React from "react";
import { ArrowRight, ExternalLink, Sparkles, Laptop, Smartphone } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden bg-[#FAFAFA] dark:bg-[#0B0E14] border-b border-slate-200/70 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Clear, punchy headline & actions */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Subtle Studio Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-semibold tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              <span>Independent Design & Development Studio</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Custom websites.
              <br />
              <span className="text-blue-600 dark:text-blue-400">
                Built around your business.
              </span>
            </h1>

            {/* Sub-headline: 1 clear sentence */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
              We engineer bespoke websites, member portals, and business platforms for ambitious organizations — crafted from initial concept to high-performance code.
            </p>

            {/* Two Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#work"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
              >
                <span>View Our Work</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white dark:bg-white/[0.05] text-slate-800 dark:text-white font-semibold text-sm border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-xs"
              >
                <span>Let’s Talk</span>
              </a>
            </div>

            {/* Short proof note */}
            <div className="pt-4 flex items-center gap-6 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-slate-800 dark:text-slate-200">100% Custom Code</span>
                <span>•</span>
                <span>No Templates</span>
                <span>•</span>
                <span>Direct Engineer Access</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Showcase (Desktop Laptop + Floating Mobile Screen) */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              
              {/* Desktop Browser / Laptop Window */}
              <div className="relative rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-2xl shadow-slate-900/10 overflow-hidden transition-all">
                {/* Browser Header Bar */}
                <div className="px-4 py-3 bg-slate-100/80 dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-slate-700/80 flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <div className="flex-1 max-w-xs mx-auto bg-white dark:bg-slate-900 rounded-md px-3 py-1 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5 border border-slate-200/60 dark:border-slate-700 font-mono shadow-2xs">
                    <span className="text-slate-400">https://</span>
                    <span className="text-slate-800 dark:text-slate-200 font-medium">amudei-haolam.com/portal</span>
                  </div>
                </div>

                {/* Desktop Mockup Preview Content */}
                <div className="p-5 sm:p-6 bg-[#FCFAF6] dark:bg-[#11131A] space-y-4 select-none">
                  {/* Mock Site Navbar */}
                  <div className="flex items-center justify-between border-b border-amber-900/10 dark:border-white/5 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-[#C99B48] flex items-center justify-center text-slate-950 font-bold text-xs">
                        ע
                      </div>
                      <span className="font-serif font-bold text-sm text-[#7A4B0E] dark:text-[#E8BA60]">
                        עמודי העולם • פורטל תומכים
                      </span>
                    </div>
                    <div className="hidden sm:flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                      <span>לוח תרומות</span>
                      <span>שטרי יששכר וזבולון</span>
                      <span className="px-2 py-0.5 rounded-md bg-[#C99B48]/15 text-[#8C5D19] font-bold border border-[#C99B48]/30">
                        אזור אישי
                      </span>
                    </div>
                  </div>

                  {/* Mock Site Hero Card */}
                  <div className="rounded-xl bg-gradient-to-br from-[#FFFDF9] to-[#F7EED9] dark:from-[#181B26] dark:to-[#1F2332] p-4 border border-[#C99B48]/30 shadow-xs space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-bold tracking-wider uppercase text-[#8C5D19] dark:text-[#D4A348]">
                          שטר הסכם שותפות מהודר
                        </span>
                        <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5 font-serif">
                          הסכם שותפות קבע — כולל אברכים מצטיינים
                        </h4>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        פעיל ומאושר
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 pt-1">
                      <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5">
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">אברך מוקצה</div>
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-100">הרב ישראל כהן</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5">
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">מסכת נלמדת</div>
                        <div className="text-xs font-bold text-slate-900 dark:text-slate-100">בבא בתרא</div>
                      </div>
                      <div className="p-2.5 rounded-lg bg-white/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-white/5">
                        <div className="text-[10px] text-slate-500 dark:text-slate-400">תעודת PDF</div>
                        <div className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                          הורד חתום
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mock Site Data Strip */}
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1 px-1">
                    <span className="flex items-center gap-1.5 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      סנכרון תרומות חי במסד הנתונים
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">Next.js 15 • Supabase Realtime</span>
                  </div>
                </div>
              </div>

              {/* Floating Mobile Device Mockup */}
              <div className="absolute -bottom-8 -right-4 sm:-bottom-10 sm:-right-6 w-44 sm:w-52 rounded-[28px] bg-slate-900 p-2 shadow-2xl border-4 border-slate-800/90 transition-transform duration-300 hover:-translate-y-1">
                {/* Phone Notch */}
                <div className="w-20 h-3.5 bg-slate-800 mx-auto rounded-b-xl mb-2" />
                
                {/* Mobile Screen Content */}
                <div className="rounded-[20px] bg-[#FFFDF9] dark:bg-[#151824] p-3 space-y-2.5 select-none overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-1.5">
                    <div className="flex items-center gap-1">
                      <div className="w-4 h-4 rounded bg-[#C99B48] text-slate-950 font-bold text-[9px] flex items-center justify-center">
                        ע
                      </div>
                      <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">פורטל מובייל</span>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  </div>

                  <div className="rounded-lg bg-amber-50/80 dark:bg-amber-950/30 p-2 border border-amber-300/40 text-center">
                    <div className="text-[9px] font-bold text-amber-800 dark:text-amber-300">שטר דיגיטלי מוכן</div>
                    <div className="text-[11px] font-bold text-slate-900 dark:text-white mt-0.5">יששכר וזבולון</div>
                    <div className="mt-1.5 py-1 px-2 rounded bg-amber-600 text-white text-[9px] font-semibold">
                      צפייה בשטר
                    </div>
                  </div>

                  <div className="text-[8px] text-slate-400 text-center font-mono">
                    100% רספונסיבי למכשירים
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
