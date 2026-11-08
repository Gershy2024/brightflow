"use client";

import * as React from "react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 border-b border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start text-left">
          
          {/* Eyebrow / Left Column */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500">
              About BrightFlow
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-[#121316] dark:text-[#F3F3F5] leading-snug">
              Websites built around how your organization actually runs.
            </h2>
          </div>

          {/* Right Column: Personal & Honest Story */}
          <div className="lg:col-span-8 space-y-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            <p>
              Hi, I’m Gershy. I run BrightFlow — an independent digital studio focused on custom web design and full-stack development.
            </p>

            <p>
              I build custom websites, private donor portals, and operational platforms for organizations that need software tailored to their exact workflow. When you work with me, you communicate directly with the person architecting, designing, and coding your system.
            </p>

            <p>
              That means clear communication, weekly staging previews where you can test working pages, and a dependable partner on hand after launch.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-black/[0.06] dark:border-white/[0.08] text-xs text-slate-600 dark:text-slate-400">
              <div>
                <span className="font-mono text-slate-400 block uppercase text-[10px]">Direct Contact</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white mt-1 block">Speak Directly</span>
                <span className="text-slate-500 mt-0.5 block">Zero middle layers or account managers</span>
              </div>
              <div>
                <span className="font-mono text-slate-400 block uppercase text-[10px]">Weekly Previews</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white mt-1 block">Test Working Pages</span>
                <span className="text-slate-500 mt-0.5 block">Review progress in private staging links</span>
              </div>
              <div>
                <span className="font-mono text-slate-400 block uppercase text-[10px]">Full Ownership</span>
                <span className="text-sm font-semibold text-slate-900 dark:text-white mt-1 block">100% Yours</span>
                <span className="text-slate-500 mt-0.5 block">Complete code and database ownership</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
