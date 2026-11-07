"use client";

import * as React from "react";
import { Laptop, LayoutGrid, PhoneForwarded, ArrowRight, Check } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      icon: LayoutGrid,
      title: "Bespoke Web Applications & Portals",
      desc: "Tailored web applications, member portals, and business dashboards engineered around your exact operational workflows — replacing messy spreadsheets with modern, automated software.",
      features: [
        "Dynamic role-based access & authentication",
        "Interactive tables, filters & batch workflows",
        "Real-time database sync (Supabase / Postgres)",
        "Automated PDF document & receipt generation",
      ],
    },
    {
      icon: Laptop,
      title: "High-Converting Websites & Showcases",
      desc: "Pixel-perfect, ultra-fast websites designed to elevate your brand and build immediate credibility. Built from scratch with clean typography, responsive layouts, and zero bloat.",
      features: [
        "100% custom design — no generic off-the-shelf templates",
        "Lighthouse 95+ performance & mobile-first responsiveness",
        "Bilingual Hebrew & English RTL/LTR support",
        "Clean SEO architecture & fast edge hosting",
      ],
    },
    {
      icon: PhoneForwarded,
      title: "Custom Telephony & Workflow Pipelines",
      desc: "Smart SignalWire cloud telephony, interactive voice response (IVR), call screening systems, and direct database pipelines that keep your communications organized and auditable.",
      features: [
        "Representative call screening ('press 1 to accept')",
        "Live DTMF keypress tracking & caller journey logs",
        "In-browser audio waveform player with playback controls",
        "Automatic email & WhatsApp alert dispatching",
      ],
    },
  ];

  return (
    <section id="services" className="py-24 bg-white dark:bg-[#0E111B] border-b border-slate-200/70 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            What we build for you.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            We don’t do generic, cookie-cutter themes. Every solution is custom-coded to solve specific business problems and scale effortlessly.
          </p>
        </div>

        {/* 3 Core Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.title}
                className="rounded-2xl bg-[#FAFAFA] dark:bg-[#131622] border border-slate-200/80 dark:border-white/5 p-7 sm:p-8 flex flex-col justify-between hover:border-blue-500/40 transition-all duration-200 shadow-xs hover:shadow-md"
              >
                <div className="space-y-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200/60 dark:border-blue-900/50">
                    <Icon className="h-6 w-6" />
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {srv.title}
                  </h3>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {srv.desc}
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-white/5 space-y-2.5">
                    {srv.features.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                        <Check className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
                  >
                    <span>Discuss this service</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
