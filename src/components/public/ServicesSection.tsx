"use client";

import * as React from "react";
import { LayoutGrid, Laptop, PhoneForwarded } from "lucide-react";

export function ServicesSection() {
  const services = [
    {
      icon: LayoutGrid,
      title: "Custom Web Applications",
      desc: "Tailored member portals, donor platforms, and internal operations tools built around your exact business logic — replacing messy spreadsheets with automated software.",
    },
    {
      icon: Laptop,
      title: "High-Converting Websites",
      desc: "Clean, ultra-fast marketing and business websites designed to establish authority, present your brand clearly, and perform flawlessly across all devices.",
    },
    {
      icon: PhoneForwarded,
      title: "Telephony & Operations",
      desc: "SignalWire cloud IVR routing, representative screening, and automated data pipelines that eliminate missed opportunities and keep communications organized.",
    },
  ];

  return (
    <section id="services" className="py-24 bg-white dark:bg-[#0E111B] border-b border-slate-200/60 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            Services
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            What we do.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 font-normal">
            Direct, focused design and full-stack development without agency bloat.
          </p>
        </div>

        {/* 3 Open Columns — No bulky card enclosures */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div key={srv.title} className="space-y-4 text-left">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {srv.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                  {srv.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
