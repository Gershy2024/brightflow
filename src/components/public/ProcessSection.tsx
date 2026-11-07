"use client";

import * as React from "react";
import { Compass, Code2, Rocket, ArrowRight } from "lucide-react";

export function ProcessSection() {
  const steps = [
    {
      num: "01",
      icon: Compass,
      title: "Discovery & Architectural Blueprint",
      desc: "We start by deeply understanding your business, daily friction, and exact user needs. We map the complete data flow, wireframe key screens, and establish a clear technical plan before writing a single line of code.",
      points: [
        "Direct consultation on business goals",
        "Clear technical specification & scope",
        "Transparent timeline & milestone planning",
      ],
    },
    {
      num: "02",
      icon: Code2,
      title: "Bespoke Design & Agile Build",
      desc: "We craft clean, modern interfaces paired with bulletproof backend logic. You get live staging access so you can click, test, and provide feedback on actual working software every single week.",
      points: [
        "Pixel-perfect, tailored user experience",
        "Weekly interactive staging previews",
        "Zero template bloat or unnecessary dependencies",
      ],
    },
    {
      num: "03",
      icon: Rocket,
      title: "Launch, Training & Direct Support",
      desc: "We handle domain configuration, edge deployment, SSL certificates, and database security audits. Once live, you receive personal walkthroughs and direct developer support whenever you need an enhancement.",
      points: [
        "Fast global edge hosting with 99.9% uptime",
        "Hands-on walkthrough for your team",
        "Direct access to the engineer who built it",
      ],
    },
  ];

  return (
    <section id="process" className="py-24 bg-[#FAFAFA] dark:bg-[#0B0E14] border-b border-slate-200/70 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <span>How We Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            A simple, transparent 3-step process.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            No endless meetings, no bureaucratic layers, and no surprises. Just a straightforward path from your idea to a high-impact digital platform.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-white/10 p-7 sm:p-8 space-y-6 shadow-xs relative overflow-hidden"
              >
                {/* Large Subtle Step Number Watermark */}
                <span className="absolute top-4 right-5 text-4xl font-black text-slate-100 dark:text-white/5 select-none font-mono">
                  {step.num}
                </span>

                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-200/60 dark:border-blue-900/50">
                  <Icon className="h-6 w-6" />
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">
                    Step {step.num}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {step.title}
                  </h3>
                </div>

                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {step.desc}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-2">
                  {step.points.map((pt, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
