"use client";

import * as React from "react";
import { Quote, Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "BrightFlow completely transformed our donor experience. Generating personalized, gold-embossed digital covenants (Shtarot) used to take hours of manual graphic work. Now it happens dynamically in seconds, and our donors love having a private, dedicated portal.",
      author: "Rabbi M. Klein",
      role: "Managing Director",
      organization: "Torah Philanthropy Network",
      project: "Amudei HaOlam Portal",
    },
    {
      quote:
        "We were drowning in scattered text messages and spreadsheets for dozens of units. The web platform BrightFlow built gave us a single place for tenant rent tracking, maintenance tickets, and instant PDF receipts. It’s lightning fast and reliable.",
      author: "Aaron F.",
      role: "Operations Lead",
      organization: "MB Properties",
      project: "MB Management System",
    },
    {
      quote:
        "The telephony integration BrightFlow engineered saved our campaign operations. The representative screening feature alone eliminated missed calls, and having instant logs of every caller keypress gave us total visibility into our lines.",
      author: "S. Braun",
      role: "Campaign Coordinator",
      organization: "Community Foundation",
      project: "Smart IVR Routing Engine",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0E111B] border-b border-slate-200/70 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>Client Feedback</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Trusted by organizations that care about quality.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Real outcomes from clients whose daily operations run on systems we custom designed and engineered.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={t.author}
              className="rounded-2xl bg-[#FAFAFA] dark:bg-[#131622] border border-slate-200/80 dark:border-white/5 p-7 sm:p-8 flex flex-col justify-between shadow-xs hover:border-slate-300 dark:hover:border-white/10 transition-colors"
            >
              <div className="space-y-4">
                <Quote className="h-6 w-6 text-blue-600/40 dark:text-blue-400/40" />
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  “{t.quote}”
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-white/5 space-y-1">
                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  {t.author}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {t.role} • {t.organization}
                </div>
                <div className="text-[11px] font-medium text-blue-600 dark:text-blue-400 pt-0.5">
                  Project: {t.project}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
