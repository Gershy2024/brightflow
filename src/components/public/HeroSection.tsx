"use client";

import * as React from "react";
import {
  Sparkles,
  Zap,
  ArrowRight,
  CheckCircle2,
  Clock,
  RotateCcw,
  ShieldCheck,
  FileText,
  MessageSquare,
  Users,
  Play,
  TrendingUp,
} from "lucide-react";

export function HeroSection() {
  // Live micro-automation sandbox state
  const [isRunning, setIsRunning] = React.useState(false);
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [runTimeMs, setRunTimeMs] = React.useState(385);

  const steps = [
    {
      title: "Lead Captured & AI-Parsed",
      detail: "Inquiry received from web form, qualified & extracted",
      icon: MessageSquare,
      color: "text-blue-500",
      time: "85ms",
    },
    {
      title: "CRM Profile & Vault Created",
      detail: "Synced to Supabase database, tagged & assigned",
      icon: Users,
      color: "text-indigo-500",
      time: "140ms",
    },
    {
      title: "Branded Invoice & Pay Link Built",
      detail: "PDF generated, itemized line items, Stripe linked",
      icon: FileText,
      color: "text-emerald-500",
      time: "260ms",
    },
    {
      title: "Confirmation Dispatched",
      detail: "WhatsApp & email sent with trackable receipt",
      icon: Zap,
      color: "text-cyan-500",
      time: "385ms",
    },
  ];

  const handleRunDemo = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsCompleted(false);
    setCurrentStep(1);

    const randomMs = Math.floor(340 + Math.random() * 80);
    setRunTimeMs(randomMs);

    setTimeout(() => setCurrentStep(2), 250);
    setTimeout(() => setCurrentStep(3), 500);
    setTimeout(() => setCurrentStep(4), 750);
    setTimeout(() => {
      setIsRunning(false);
      setIsCompleted(true);
    }, 950);
  };

  const handleReset = () => {
    setCurrentStep(0);
    setIsCompleted(false);
    setIsRunning(false);
  };

  return (
    <section id="overview" className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 overflow-hidden">
      {/* Dynamic ambient background glow meshes */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-500/15 via-blue-500/15 to-cyan-400/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Vision & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Super-badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/80 dark:border-indigo-800/60 shadow-xs">
              <span className="flex h-2 w-2 rounded-full bg-cyan-500 animate-pulse" />
              <span className="text-xs font-bold tracking-wide uppercase bg-gradient-to-r from-indigo-600 to-cyan-600 dark:from-indigo-400 dark:to-cyan-300 bg-clip-text text-transparent">
                Next-Gen Business Automation
              </span>
              <Sparkles className="h-3.5 w-3.5 text-indigo-500 dark:text-cyan-400" />
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.12]">
              Put Your Business On{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Autopilot.
              </span>
              <br />
              Make Complex Work{" "}
              <span className="underline decoration-indigo-400/40 decoration-wavy decoration-2">
                Effortless.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Stop wasting hours manually copy-pasting customer details, chasing overdue invoices, and untangling messy spreadsheets.
              <strong className="text-slate-900 dark:text-white font-semibold"> The Bright Flow</strong> builds intelligent, custom automation pipelines that handle your daily operations in milliseconds.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-2">
              <a
                href="#pipeline"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold text-sm shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Explore Live Pipelines</span>
                <ArrowRight className="h-4 w-4" />
              </a>

              <a
                href="#calculator"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white dark:bg-white/[0.06] text-slate-800 dark:text-white font-bold text-sm border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 transition-all shadow-xs"
              >
                <TrendingUp className="h-4 w-4 text-emerald-500" />
                <span>Calculate Your ROI</span>
              </a>
            </div>

            {/* Trust points strip */}
            <div className="pt-4 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 border-t border-slate-200/80 dark:border-white/10 text-left">
              <div>
                <div className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">99.4%</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Faster execution</div>
              </div>
              <div>
                <div className="text-2xl font-black text-indigo-600 dark:text-cyan-400 tracking-tight">20+ hrs</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Saved per week</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">0 errors</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">Human copy-paste loss</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Micro-Automation Sandbox Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl p-1 bg-gradient-to-br from-indigo-500/30 via-blue-500/20 to-cyan-500/30 shadow-2xl shadow-indigo-500/10">
              <div className="rounded-[22px] bg-white dark:bg-[#141724] border border-slate-200/90 dark:border-white/10 p-6 sm:p-7 space-y-6">
                {/* Sandbox Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="h-3 w-3 rounded-full bg-rose-500/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-400 ml-1">
                      sandbox.brightflow.run
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Active Engine
                  </span>
                </div>

                {/* Subtitle description */}
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500 fill-amber-500" />
                    <span>Experience The 1-Click Speed</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    See what normally takes an employee 25 minutes happen in 0.4 seconds.
                  </p>
                </div>

                {/* Step Timeline */}
                <div className="space-y-3">
                  {steps.map((st, idx) => {
                    const stepNum = idx + 1;
                    const isDone = currentStep >= stepNum;
                    const isCurrent = currentStep === stepNum && isRunning;
                    const Icon = st.icon;

                    return (
                      <div
                        key={st.title}
                        className={`flex items-start gap-3 p-2.5 rounded-2xl transition-all duration-300 border ${
                          isDone
                            ? "bg-slate-50/80 dark:bg-white/[0.04] border-slate-200/80 dark:border-white/10"
                            : isCurrent
                            ? "bg-indigo-50/50 dark:bg-indigo-950/30 border-indigo-300 dark:border-indigo-700 shadow-sm"
                            : "opacity-40 border-transparent"
                        }`}
                      >
                        <div
                          className={`mt-0.5 p-1.5 rounded-xl transition-colors ${
                            isDone
                              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                              : "bg-slate-200/80 dark:bg-white/10 text-slate-500"
                          }`}
                        >
                          {isDone ? (
                            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          ) : (
                            <Icon className={`h-4 w-4 ${st.color}`} />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                              {st.title}
                            </span>
                            {isDone && (
                              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                                {st.time}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {st.detail}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Trigger Button & Status Summary */}
                <div className="pt-2 border-t border-slate-100 dark:border-white/5 space-y-3">
                  {!isCompleted ? (
                    <button
                      type="button"
                      onClick={handleRunDemo}
                      disabled={isRunning}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-blue-600 text-white font-bold text-xs shadow-md shadow-indigo-600/25 hover:shadow-indigo-600/40 active:scale-[0.99] transition-all disabled:opacity-60 cursor-pointer"
                    >
                      {isRunning ? (
                        <>
                          <div className="h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Executing Pipeline in Real-Time...</span>
                        </>
                      ) : (
                        <>
                          <Play className="h-3.5 w-3.5 fill-white" />
                          <span>Run Live Automation Trigger</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/40">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                          <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300">
                            Flow Completed in {runTimeMs}ms!
                          </span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          100% Automated
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={handleReset}
                        className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                      >
                        <RotateCcw className="h-3 w-3" />
                        <span>Reset & Run Again</span>
                      </button>
                    </div>
                  )}

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                    <Clock className="h-3 w-3" />
                    <span>Average manual equivalent: 25 minutes saved</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
