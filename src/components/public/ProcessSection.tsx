"use client";

import * as React from "react";
import { Compass, Code2, Rocket } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      num: "01",
      icon: Compass,
      title: "Discovery & Architecture",
      desc: "We analyze your business workflow, identify operational friction, and map the complete database schema and screen wireframes before coding.",
    },
    {
      num: "02",
      icon: Code2,
      title: "Bespoke Design & Build",
      desc: "We engineer pixel-perfect interfaces with high-performance code. You receive private staging access to test actual working features every week.",
    },
    {
      num: "03",
      icon: Rocket,
      title: "Launch & Direct Support",
      desc: "We handle domain configuration, cloud databases, edge security, and performance audits. You get direct support from the engineer who built it.",
    },
  ];

  return (
    <section id="process" className="py-24 bg-[#FAFAFA] dark:bg-[#0B0E14] border-b border-slate-200/60 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            Process
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            How we work with you.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 font-normal">
            A simple, transparent 3-step path from concept to a live platform.
          </p>
        </div>

        {/* 3 Step Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="space-y-4 text-left">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-mono font-medium text-slate-400">
                    Step {step.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
