"use client";

import * as React from "react";
import {
  HelpCircle,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  RotateCcw,
  Clock,
  Coins,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export function AutomationQuiz() {
  const [step, setStep] = React.useState<number>(1);
  const [businessType, setBusinessType] = React.useState<string>("");
  const [bottleneck, setBottleneck] = React.useState<string>("");
  const [primaryGoal, setPrimaryGoal] = React.useState<string>("");

  const businessTypes = [
    { label: "Agency & Professional Services", icon: "💼" },
    { label: "Real Estate & Property", icon: "🏢" },
    { label: "Operations, Logistics & Trade", icon: "🚚" },
    { label: "Consulting & Financial Services", icon: "📈" },
    { label: "Other Fast-Growing Business", icon: "⚡" },
  ];

  const bottlenecks = [
    { label: "Invoicing & chasing unpaid bills manually", hours: "6-8 hrs" },
    { label: "Messy spreadsheets & lost customer details", hours: "8-12 hrs" },
    { label: "Unscreened phone calls & constant spam", hours: "4-6 hrs" },
    { label: "Scattered WhatsApps & missed project deadlines", hours: "7-10 hrs" },
  ];

  const goals = [
    { label: "Reclaim 20+ hours of personal time weekly", desc: "Maximum time liberation" },
    { label: "Look 10x more professional with automated portals", desc: "Instant client trust" },
    { label: "Scale revenue without hiring expensive office staff", desc: "Cost-efficient growth" },
    { label: "Eliminate human copy-paste mistakes completely", desc: "Zero operational errors" },
  ];

  const handleSelectBusiness = (b: string) => {
    setBusinessType(b);
    setStep(2);
  };

  const handleSelectBottleneck = (b: string) => {
    setBottleneck(b);
    setStep(3);
  };

  const handleSelectGoal = (g: string) => {
    setPrimaryGoal(g);
    setStep(4);
  };

  const handleReset = () => {
    setStep(1);
    setBusinessType("");
    setBottleneck("");
    setPrimaryGoal("");
  };

  return (
    <section id="quiz" className="py-24 bg-white dark:bg-[#0B0E17] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/40 text-indigo-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>60-Second Diagnostic</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Get Your Free{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Automation Health Score
            </span>
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300">
            Answer 3 quick questions to discover how many hours your business can unlock with custom automation.
          </p>
        </div>

        {/* Quiz Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#141724] p-8 sm:p-10 shadow-xl relative min-h-[420px] flex flex-col justify-between">
          {/* Progress bar */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400">
              <span>{step <= 3 ? `Question ${step} of 3` : "Diagnostic Results"}</span>
              <span className="font-mono">{step === 4 ? "100%" : `${Math.round((step / 4) * 100)}%`}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-600 to-cyan-400 transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-4 my-auto animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                What type of business are you operating?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {businessTypes.map((b) => (
                  <button
                    key={b.label}
                    type="button"
                    onClick={() => handleSelectBusiness(b.label)}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-indigo-500 hover:shadow-md text-left text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-3 transition-all cursor-pointer group"
                  >
                    <span className="text-xl">{b.icon}</span>
                    <span className="group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                      {b.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-4 my-auto animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Where does your team lose the most hours each week?
              </h3>
              <div className="space-y-3 pt-2">
                {bottlenecks.map((b) => (
                  <button
                    key={b.label}
                    type="button"
                    onClick={() => handleSelectBottleneck(b.label)}
                    className="w-full p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-indigo-500 hover:shadow-md text-left text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center justify-between transition-all cursor-pointer group"
                  >
                    <span className="group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                      {b.label}
                    </span>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-900/40 font-semibold shrink-0 ml-2">
                      {b.hours} wasted
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="space-y-4 my-auto animate-in fade-in duration-200">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                What is your #1 primary objective?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {goals.map((g) => (
                  <button
                    key={g.label}
                    type="button"
                    onClick={() => handleSelectGoal(g.label)}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/[0.03] hover:border-indigo-500 hover:shadow-md text-left text-xs font-bold text-slate-800 dark:text-slate-200 space-y-1 transition-all cursor-pointer group"
                  >
                    <span className="block group-hover:text-indigo-600 dark:group-hover:text-cyan-400 transition-colors">
                      {g.label}
                    </span>
                    <span className="text-[11px] font-normal text-slate-500 block">
                      {g.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Diagnosis Results */}
          {step === 4 && (
            <div className="space-y-6 my-auto text-center animate-in zoom-in-95 duration-300">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                <CheckCircle2 className="h-4 w-4" />
                <span>Diagnostic Complete</span>
              </div>

              <div className="space-y-2">
                <div className="text-5xl font-black text-indigo-600 dark:text-cyan-400 font-mono">
                  92% Automatable
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  Your Operations Are Primed For Autopilot
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
                  Based on your focus in <strong>{businessType}</strong>, automated workflows can eliminate your bottleneck in <em>"{bottleneck}"</em>, recovering an estimated <strong>22 hours every single week</strong>.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-xs shadow-md shadow-indigo-600/25 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>Request Custom Setup Roadmap</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-3 rounded-2xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-white/10 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          )}

          {/* Bottom Back Button */}
          {step > 1 && step < 4 && (
            <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex justify-start">
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                ← Back to previous question
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
