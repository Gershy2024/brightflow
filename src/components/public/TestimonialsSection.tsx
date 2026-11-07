"use client";

import * as React from "react";
import { Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      quote:
        "BrightFlow completely transformed our donor experience. Generating personalized, gold-embossed digital covenants (Shtarot) used to take hours of manual graphic work. Now it happens dynamically in seconds, and our donors love having a direct portal.",
      author: "Rabbi M. Klein",
      role: "Managing Director",
      organization: "Torah Philanthropy Network",
    },
    {
      quote:
        "We were drowning in scattered text messages and spreadsheets for dozens of units. The web platform BrightFlow built gave us a single place for tenant rent tracking, maintenance tickets, and instant PDF receipts. It’s lightning fast and reliable.",
      author: "Aaron F.",
      role: "Operations Lead",
      organization: "MB Properties",
    },
    {
      quote:
        "The telephony integration BrightFlow engineered saved our campaign operations. The representative screening feature alone eliminated missed calls, and having instant logs of every caller keypress gave us total visibility into our lines.",
      author: "S. Braun",
      role: "Campaign Coordinator",
      organization: "Community Foundation",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0E111B] border-b border-slate-200/60 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Trusted by active organizations.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 font-normal">
            Direct feedback from teams running on software we designed and engineered.
          </p>
        </div>

        {/* 3 Clean Testimonial Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {testimonials.map((t) => (
            <div
              key={t.author}
              className="space-y-4 flex flex-col justify-between text-left"
            >
              <div className="space-y-3">
                <Quote className="h-5 w-5 text-blue-600/40 dark:text-blue-400/40" />
                <p className="text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                  “{t.quote}”
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-0.5">
                <div className="text-sm font-bold text-slate-900 dark:text-white">
                  {t.author}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                  {t.role} • {t.organization}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
