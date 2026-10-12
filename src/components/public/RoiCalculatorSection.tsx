"use client";

import * as React from "react";
import {
  Calculator,
  TrendingUp,
  Clock,
  DollarSign,
  Users,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function RoiCalculatorSection() {
  const [teamSize, setTeamSize] = React.useState<number>(4);
  const [manualHoursPerWeek, setManualHoursPerWeek] = React.useState<number>(8);
  const [hourlyRate, setHourlyRate] = React.useState<number>(45);

  // Calculations: Assuming BrightFlow automates 80% of repetitive operational tasks
  const automationEfficiencyFactor = 0.8;
  const hoursSavedPerWeek = Math.round(teamSize * manualHoursPerWeek * automationEfficiencyFactor);
  const hoursSavedPerYear = hoursSavedPerWeek * 50;
  const dollarsSavedPerYear = hoursSavedPerYear * hourlyRate;
  const multiplier = ((manualHoursPerWeek / (manualHoursPerWeek * (1 - automationEfficiencyFactor)))).toFixed(1);

  return (
    <section id="calculator" className="py-24 bg-slate-50/70 dark:bg-[#0E111D] relative border-t border-slate-200/60 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/80 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Calculator className="h-3.5 w-3.5" />
            <span>Interactive ROI Calculator</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            See Exactly How Much Time & Capital{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-500 bg-clip-text text-transparent">
              You Will Reclaim
            </span>
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-300">
            Slide the controls below to discover the tangible hours and financial return of placing your operations on BrightFlow autopilot.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#141724] p-6 sm:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Sliders */}
          <div className="lg:col-span-6 space-y-8">
            {/* Slider 1: Team Size */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Users className="h-4 w-4 text-indigo-500" />
                  <span>Team Members in Operations</span>
                </label>
                <span className="text-lg font-black text-indigo-600 dark:text-cyan-400 font-mono">
                  {teamSize} {teamSize === 1 ? "Person" : "People"}
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={30}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>1 member</span>
                <span>15 members</span>
                <span>30+ members</span>
              </div>
            </div>

            {/* Slider 2: Manual Hours */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <Clock className="h-4 w-4 text-amber-500" />
                  <span>Manual Admin Hours Per Person / Wk</span>
                </label>
                <span className="text-lg font-black text-amber-600 dark:text-amber-400 font-mono">
                  {manualHoursPerWeek} Hours / Wk
                </span>
              </div>
              <input
                type="range"
                min={2}
                max={25}
                value={manualHoursPerWeek}
                onChange={(e) => setManualHoursPerWeek(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>2 hrs (Light)</span>
                <span>12 hrs (Average)</span>
                <span>25 hrs (Heavy)</span>
              </div>
            </div>

            {/* Slider 3: Hourly Value */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-emerald-500" />
                  <span>Average Hourly Loaded Cost</span>
                </label>
                <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                  ${hourlyRate} / Hour
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={150}
                step={5}
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>$20/hr</span>
                <span>$75/hr</span>
                <span>$150/hr</span>
              </div>
            </div>
          </div>

          {/* Right Column: Calculated Results Display */}
          <div className="lg:col-span-6 rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-indigo-950 via-slate-900 to-[#0A0D17] text-white border border-white/10 shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 flex items-center gap-1.5 font-bold">
                <Sparkles className="h-4 w-4" />
                <span>Estimated Annual Yield</span>
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-300 border border-cyan-400/20 font-semibold">
                {multiplier}x Operational Speed
              </span>
            </div>

            {/* Big Dollar Value */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Direct Annual Capital Reclaimed
              </span>
              <div className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight font-mono">
                ${dollarsSavedPerYear.toLocaleString()}
                <span className="text-base text-slate-400 font-sans font-normal ml-1">/ year</span>
              </div>
            </div>

            {/* Split Metrics */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/5 space-y-1">
                <span className="text-[11px] text-slate-400 font-medium">Hours Saved / Week</span>
                <div className="text-2xl font-black text-cyan-300 font-mono">
                  {hoursSavedPerWeek} hrs
                </div>
                <span className="text-[10px] text-slate-500">Every single week</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/5 space-y-1">
                <span className="text-[11px] text-slate-400 font-medium">Hours Saved / Year</span>
                <div className="text-2xl font-black text-indigo-300 font-mono">
                  {hoursSavedPerYear.toLocaleString()} hrs
                </div>
                <span className="text-[10px] text-slate-500">Available for real growth</span>
              </div>
            </div>

            {/* CTA directly linked */}
            <div className="pt-2">
              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Reclaim These {hoursSavedPerYear.toLocaleString()} Hours Now</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
