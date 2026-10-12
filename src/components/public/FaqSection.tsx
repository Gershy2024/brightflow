"use client";

import * as React from "react";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  const faqs = [
    {
      q: "How quickly can BrightFlow automate our daily operations?",
      a: "Most bespoke pipelines—such as lead-to-cash invoicing, WhatsApp notifications, CRM data vaults, and SignalWire call screening—are architected, tested, and live within 3 to 7 business days, with zero downtime for your existing business.",
    },
    {
      q: "Do we need to replace our existing software or spreadsheets?",
      a: "No! We do not force you into rigid third-party software. BrightFlow connects seamlessly to your existing workflows, databases, webhooks, and mobile apps, acting as the intelligent glue that automates the friction away.",
    },
    {
      q: "Are there expensive monthly voice or AI subscription fees for telephony?",
      a: "No. Unlike agencies that resell expensive paid TTS subscriptions (like ElevenLabs), we engineer telephony using free, zero-cost high-fidelity Edge Neural engines and standard SignalWire trunks, keeping your telephony costs near zero.",
    },
    {
      q: "What happens if our operational workflow changes in the future?",
      a: "All systems built by BrightFlow are clean, modular, and extensible. Updating an invoice template, adding a new approval step, or onboarding new staff takes minutes without breaking existing workflows.",
    },
    {
      q: "How is our sensitive client and financial data protected?",
      a: "Security is non-negotiable. Every system runs with Row Level Security (RLS) on enterprise Postgres databases, secure serverless functions, encrypted API keys, and regular automated cloud backups.",
    },
  ];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-24 bg-slate-50/50 dark:bg-[#0E111D] relative border-t border-slate-200/60 dark:border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/40 text-blue-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="h-3.5 w-3.5" />
            <span>Common Questions</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Everything You Need To Know About{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              BrightFlow
            </span>
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            Clear, transparent answers on how we transform manual friction into effortless flow.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#141724] overflow-hidden transition-all shadow-xs"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <div
                    className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? "rotate-180 bg-indigo-600 text-white"
                        : "bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-white/5 animate-in fade-in duration-200">
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
