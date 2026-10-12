"use client";

import * as React from "react";
import {
  Zap,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Timer,
  AlertCircle,
  FileSpreadsheet,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function SpeedRaceSection() {
  const [isRacing, setIsRacing] = React.useState(false);
  const [raceFinished, setRaceFinished] = React.useState(false);
  const [humanStep, setHumanStep] = React.useState(0);
  const [humanTimer, setHumanTimer] = React.useState("00:00");
  const [engineFinished, setEngineFinished] = React.useState(false);

  const humanSteps = [
    "Opening Excel spreadsheet and searching row...",
    "Copying customer name and phone into invoice draft...",
    "Correcting typo in billing address...",
    "Exporting PDF and saving to desktop folder...",
    "Opening email client, attaching PDF, typing message...",
    "Searching WhatsApp for client chat to send link...",
  ];

  const handleStartRace = () => {
    if (isRacing) return;
    setIsRacing(true);
    setRaceFinished(false);
    setHumanStep(0);
    setEngineFinished(false);

    // BrightFlow finishes in 380ms
    setTimeout(() => {
      setEngineFinished(true);
    }, 380);

    // Human steps simulate slow manual progression
    setTimeout(() => {
      setHumanStep(1);
      setHumanTimer("02:15");
    }, 700);

    setTimeout(() => {
      setHumanStep(2);
      setHumanTimer("06:40");
    }, 1400);

    setTimeout(() => {
      setHumanStep(3);
      setHumanTimer("11:20");
    }, 2100);

    setTimeout(() => {
      setHumanStep(4);
      setHumanTimer("15:55");
    }, 2800);

    setTimeout(() => {
      setHumanStep(5);
      setHumanTimer("18:42");
      setIsRacing(false);
      setRaceFinished(true);
    }, 3500);
  };

  const handleReset = () => {
    setIsRacing(false);
    setRaceFinished(false);
    setHumanStep(0);
    setHumanTimer("00:00");
    setEngineFinished(false);
  };

  return (
    <section id="speed-race" className="py-24 bg-white dark:bg-[#0B0E17] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/40 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Timer className="h-3.5 w-3.5" />
            <span>Real-Time Speed Benchmark</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            The Head-to-Head{" "}
            <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-clip-text text-transparent">
              Speed Race
            </span>
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-300">
            Click to start the benchmark and witness the staggering contrast between manual human execution and the BrightFlow autonomous engine.
          </p>

          <div className="pt-2">
            {!raceFinished ? (
              <button
                type="button"
                onClick={handleStartRace}
                disabled={isRacing}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all disabled:opacity-60 cursor-pointer"
              >
                {isRacing ? (
                  <>
                    <div className="h-3.5 w-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Benchmarking In Progress...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-slate-950" />
                    <span>Start Live Speed Benchmark</span>
                  </>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset Benchmark</span>
              </button>
            )}
          </div>
        </div>

        {/* Dual Lane Race Board */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {/* Lane 1: Manual Human Process */}
          <div className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-[#141724] p-7 space-y-6 shadow-md relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-4">
                <div>
                  <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                    Lane 1 • Manual Work
                  </span>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Human Office Employee
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">Elapsed Time</span>
                  <span className="text-xl font-mono font-black text-rose-600 dark:text-rose-400">
                    {humanTimer} min
                  </span>
                </div>
              </div>

              {/* Steps Progress */}
              <div className="space-y-2.5">
                {humanSteps.map((step, idx) => {
                  const isDone = humanStep > idx;
                  const isCurrent = humanStep === idx && isRacing;
                  return (
                    <div
                      key={step}
                      className={`p-3 rounded-2xl text-xs flex items-center gap-3 transition-all ${
                        isDone
                          ? "bg-rose-500/10 text-rose-900 dark:text-rose-200 border border-rose-500/20"
                          : isCurrent
                          ? "bg-amber-500/10 text-amber-900 dark:text-amber-200 border border-amber-500/30 animate-pulse font-bold"
                          : "opacity-40 bg-slate-100 dark:bg-white/[0.02]"
                      }`}
                    >
                      <span className="h-5 w-5 rounded-full flex items-center justify-center text-[10px] font-mono font-bold shrink-0 bg-slate-200 dark:bg-white/10">
                        {isDone ? "✔" : idx + 1}
                      </span>
                      <span className="truncate">{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom lane summary */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/5 flex items-center justify-between text-xs">
              <span className="text-slate-500">Error rate: ~12% (typos, delay)</span>
              <span className="font-bold text-rose-600 dark:text-rose-400">Total: 18m 42s</span>
            </div>
          </div>

          {/* Lane 2: BrightFlow Autonomous Engine */}
          <div className="rounded-3xl border-2 border-indigo-500/60 dark:border-cyan-500/60 bg-gradient-to-br from-indigo-950 via-[#141724] to-slate-950 p-7 text-white space-y-6 shadow-2xl relative flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3" />
                    <span>Lane 2 • Autonomous Flow</span>
                  </span>
                  <h3 className="text-lg font-black text-white">
                    BrightFlow Engine
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-mono">Execution Time</span>
                  <span className="text-2xl font-mono font-black text-emerald-400">
                    {engineFinished ? "0.38 sec" : "Ready"}
                  </span>
                </div>
              </div>

              {/* Engine Result Box */}
              {engineFinished ? (
                <div className="space-y-3 animate-in fade-in zoom-in-95 duration-300">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>All 6 Operations Executed Flawlessly!</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Lead ingested, CRM synced, invoice PDF formatted, tax calculated, Stripe link generated, and WhatsApp receipt sent in 380 milliseconds.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
                      <span className="text-slate-400 block text-[10px]">Speed Advantage</span>
                      <span className="text-base font-black text-cyan-300">2,950x Faster</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/[0.04] border border-white/5">
                      <span className="text-slate-400 block text-[10px]">Data Accuracy</span>
                      <span className="text-base font-black text-emerald-300">100.0% Verified</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="p-8 rounded-2xl border border-dashed border-white/20 text-center space-y-2">
                  <Zap className="h-8 w-8 text-cyan-400 mx-auto animate-pulse" />
                  <p className="text-xs text-slate-300 font-medium">
                    Waiting for race trigger. Press "Start Live Speed Benchmark" above.
                  </p>
                </div>
              )}
            </div>

            {/* Bottom lane summary */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-400">0 human minutes required</span>
              <span className="font-mono font-bold text-emerald-400">Total: 380ms</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
