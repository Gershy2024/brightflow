"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 border-b border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start text-left">
          
          {/* Eyebrow / Left Column */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500">
              About The Studio
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#121316] dark:text-[#F3F3F5] leading-tight">
              Small team.<br />Direct collaboration.<br />No agency bloat.
            </h2>
          </div>

          {/* Right Column: Personal & Honest Story */}
          <div className="lg:col-span-8 space-y-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            <p>
              BrightFlow is an independent digital studio founded by Gershy. We build custom websites, private donor portals, and operational tools for businesses and institutions that need something tailored to how they actually work.
            </p>

            <p>
              When you hire a large agency, most of your budget goes to account managers, coordinators, and overhead. At BrightFlow, you work directly with the person who designs the interface and writes the code. That means quicker answers, cleaner execution, and a website built to solve real problems.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-black/[0.06] dark:border-white/[0.08] text-xs text-slate-600 dark:text-slate-400">
              <div>
                <span className="font-mono text-slate-400 block uppercase text-[10px]">Approach</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white mt-1 block">Custom Code Only</span>
                <span className="text-slate-500 mt-0.5 block">No pre-made templates or fragile plugins</span>
              </div>
              <div>
                <span className="font-mono text-slate-400 block uppercase text-[10px]">Communication</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white mt-1 block">Direct Access</span>
                <span className="text-slate-500 mt-0.5 block">Speak directly with your developer</span>
              </div>
              <div>
                <span className="font-mono text-slate-400 block uppercase text-[10px]">Ownership</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white mt-1 block">100% Yours</span>
                <span className="text-slate-500 mt-0.5 block">Full code and database ownership from day one</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
