"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      q: "How long does a typical project take from start to launch?",
      a: "Most custom websites and specialized web applications are engineered and launched within 2 to 4 weeks. We work in weekly milestones, giving you staging links to review progress at every step.",
    },
    {
      q: "Do you use off-the-shelf templates or generic WordPress themes?",
      a: "No. Everything we build is 100% custom-coded using modern standards: Next.js, React, TypeScript, and Tailwind CSS. This ensures your project is ultra-fast, completely unique to your brand, secure, and free from bloated plugins.",
    },
    {
      q: "Will our website and client portal work seamlessly on mobile phones?",
      a: "Yes. Every application and page is engineered mobile-first. Your platform will feel like a native app on mobile screens while taking full advantage of wide desktop monitors.",
    },
    {
      q: "Can you connect our website to our existing databases, telephony, or payments?",
      a: "Yes. We frequently integrate custom Supabase and Postgres databases, SignalWire cloud telephony, automated PDF billing, and third-party APIs into clean, unified portals.",
    },
    {
      q: "Who do I speak to when I need updates or have questions?",
      a: "You communicate directly with the engineer building your system. No account managers, no ticket queues, and no outsourced junior developers.",
    },
  ];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-24 bg-[#FAFAFA] dark:bg-[#0B0E14] border-b border-slate-200/60 dark:border-white/5 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            FAQ
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Common questions.
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-400 font-normal max-w-lg mx-auto">
            Clear, transparent answers about how we build and support projects.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#121520] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-base font-semibold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "rotate-180 bg-blue-600 text-white"
                        : "bg-slate-100 dark:bg-white/10 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed border-t border-slate-100 dark:border-white/5 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
