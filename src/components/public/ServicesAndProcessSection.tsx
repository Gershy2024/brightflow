"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";

export function ServicesAndProcessSection() {
  const services = [
    {
      title: "Custom Web Applications & Portals",
      desc: "Private portals, donor dashboards, and internal operating tools built around your exact business logic — replacing spreadsheets with software that saves time.",
    },
    {
      title: "Business & Marketing Websites",
      desc: "Fast, clear websites designed to present your organization at its highest standard. Built with clean typography, responsive layouts, and zero template bloat.",
    },
    {
      title: "Telephony & Operational Workflows",
      desc: "SignalWire cloud IVR routing, representative screening, and automated database sync that prevent missed calls and keep records organized.",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Discovery & Blueprint",
      desc: "We discuss your exact operational needs, map user journeys, and draft the technical plan before writing any code.",
    },
    {
      num: "02",
      title: "Custom Build & Staging",
      desc: "We write clean code from scratch. You receive private staging links to click, test, and give feedback on real working pages each week.",
    },
    {
      num: "03",
      title: "Launch & Direct Support",
      desc: "We configure domain records, database security, and edge hosting. Once live, you have direct contact with the developer for updates.",
    },
  ];

  return (
    <section id="services" className="py-24 border-b border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 text-left">
          <div className="text-xs font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500">
            Capabilities & Process
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#121316] dark:text-[#F3F3F5]">
            What we build, and how we work.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal">
            No endless meetings or rigid agency packages. Just straightforward solutions built to fit your needs.
          </p>
        </div>

        {/* Asymmetrical Split: Services on the left, Process on the right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start text-left">
          
          {/* Left Column: What We Build */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 border-b border-black/[0.06] dark:border-white/10 pb-3">
              Services
            </h3>

            <div className="space-y-8">
              {services.map((srv) => (
                <div key={srv.title} className="space-y-2">
                  <h4 className="font-serif text-xl font-bold text-[#121316] dark:text-white">
                    {srv.title}
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: How We Work */}
          <div className="lg:col-span-6 space-y-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 border-b border-black/[0.06] dark:border-white/10 pb-3">
              The Process
            </h3>

            <div className="space-y-8">
              {steps.map((st) => (
                <div key={st.num} className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono font-semibold text-[#1D4ED8] dark:text-blue-400">
                      {st.num}
                    </span>
                    <h4 className="font-serif text-xl font-bold text-[#121316] dark:text-white">
                      {st.title}
                    </h4>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed pl-6">
                    {st.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
