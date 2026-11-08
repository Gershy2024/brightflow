"use client";

import * as React from "react";
import { Plus, Minus } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      q: "How long does a typical project take?",
      a: "Most custom websites and web applications are completed in 2 to 4 weeks. We work in weekly milestones, providing working staging links so you can test real pages as they are built.",
    },
    {
      q: "Do you use WordPress or ready-made themes?",
      a: "No. Everything is custom-coded using modern standards: Next.js, React, TypeScript, and Tailwind CSS. This ensures your site is fast, secure, and built specifically for your requirements without bloated plugins.",
    },
    {
      q: "Will our website work properly on mobile phones?",
      a: "Yes. Every interface is built mobile-first and tested across smartphones, tablets, and desktop displays.",
    },
    {
      q: "Can you connect the site to our existing database or phone system?",
      a: "Yes. We frequently integrate custom Supabase and Postgres databases, SignalWire cloud telephony, and automated document generation into unified web dashboards.",
    },
    {
      q: "How does maintenance and ongoing support work?",
      a: "You communicate directly with the developer who built your project. We offer ongoing maintenance, minor feature updates, and technical support as your business evolves.",
    },
  ];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="py-20 border-b border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start text-left">
          
          {/* Left Column */}
          <div className="lg:col-span-4 space-y-2">
            <div className="text-xs font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500">
              Questions
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#121316] dark:text-[#F3F3F5]">
              Common questions.
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 font-normal">
              Practical details on timelines, technology, and working together.
            </p>
          </div>

          {/* Right Column: Compact Accordion */}
          <div className="lg:col-span-8 divide-y divide-black/[0.06] dark:divide-white/[0.08]">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={faq.q} className="py-4 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full text-left flex items-center justify-between gap-4 cursor-pointer hover:text-[#1D4ED8] transition-colors"
                  >
                    <span className="text-sm sm:text-base font-medium text-[#121316] dark:text-[#F3F3F5]">
                      {faq.q}
                    </span>
                    <span className="text-slate-400 shrink-0">
                      {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pt-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed pr-6 animate-in fade-in duration-150">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
