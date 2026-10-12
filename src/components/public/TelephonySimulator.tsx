"use client";

import * as React from "react";
import {
  PhoneCall,
  PhoneOff,
  Mic,
  Volume2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Play,
  RotateCcw,
  Zap,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export function TelephonySimulator() {
  const [callState, setCallState] = React.useState<"idle" | "ringing" | "connected" | "verified" | "ended">("idle");
  const [timerSeconds, setTimerSeconds] = React.useState(0);
  const [pressedKey, setPressedKey] = React.useState<string | null>(null);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState === "connected" || callState === "verified") {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callState]);

  const handleStartCall = () => {
    setCallState("ringing");
    setTimerSeconds(0);
    setPressedKey(null);

    setTimeout(() => {
      setCallState("connected");
    }, 1200);
  };

  const handlePressKey = (key: string) => {
    if (callState !== "connected") return;
    setPressedKey(key);

    if (key === "1") {
      setTimeout(() => {
        setCallState("verified");
      }, 400);
    }
  };

  const handleEndCall = () => {
    setCallState("ended");
    setTimeout(() => {
      setCallState("idle");
      setTimerSeconds(0);
      setPressedKey(null);
    }, 1500);
  };

  const formatTimer = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const remaining = sec % 60;
    return `00:${remaining < 10 ? "0" : ""}${remaining}`;
  };

  return (
    <section id="telephony-demo" className="py-24 bg-slate-50/70 dark:bg-[#0E111D] relative border-t border-slate-200/60 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/60 border border-cyan-200/80 dark:border-cyan-800/40 text-cyan-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <PhoneCall className="h-3.5 w-3.5" />
            <span>Interactive Telephony Engine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Smart Voice & Anti-Spam{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Call Screening
            </span>
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-300">
            Test the live smartphone simulator below. See how our SignalWire-powered screening verifies human callers and eliminates robocalls without ever interrupting your focus.
          </p>
        </div>

        {/* Smartphone Simulator + Explanation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Phone Interactive Simulator (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            {/* Phone Bezel */}
            <div className="w-[310px] sm:w-[330px] rounded-[48px] p-3.5 bg-slate-900 dark:bg-black shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border-4 border-slate-700/80 dark:border-slate-800 relative">
              {/* Dynamic Island / Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-20 flex items-center justify-end px-2">
                <div className="h-2 w-2 rounded-full bg-cyan-400/40" />
              </div>

              {/* Screen Content */}
              <div className="w-full h-[580px] rounded-[36px] bg-gradient-to-b from-slate-900 via-[#101424] to-[#0A0D17] text-white p-6 flex flex-col justify-between relative overflow-hidden">
                {/* Top Status */}
                <div className="pt-4 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>BrightFlow Line</span>
                  <span>5G • 100%</span>
                </div>

                {/* State: IDLE */}
                {callState === "idle" && (
                  <div className="text-center space-y-6 my-auto">
                    <div className="h-20 w-20 mx-auto rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
                      <PhoneCall className="h-9 w-9 text-white animate-pulse" />
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-base font-black text-white">+1 (800) BRIGHT-FLOW</h4>
                      <p className="text-xs text-slate-400">Interactive Business Line</p>
                    </div>

                    <button
                      type="button"
                      onClick={handleStartCall}
                      className="px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    >
                      Tap To Call Simulated Line
                    </button>
                  </div>
                )}

                {/* State: RINGING */}
                {callState === "ringing" && (
                  <div className="text-center space-y-6 my-auto animate-pulse">
                    <div className="h-20 w-20 mx-auto rounded-full bg-blue-600 flex items-center justify-center">
                      <PhoneCall className="h-9 w-9 text-white" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">Calling BrightFlow IVR...</h4>
                      <p className="text-xs text-cyan-400 font-mono mt-1">Connecting Trunk Line...</p>
                    </div>
                  </div>
                )}

                {/* State: CONNECTED (Screening prompt) */}
                {callState === "connected" && (
                  <div className="space-y-4 my-auto">
                    <div className="text-center space-y-1">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono">
                        <Volume2 className="h-3 w-3 animate-pulse" />
                        <span>Call Active • {formatTimer(timerSeconds)}</span>
                      </div>
                      <h4 className="text-sm font-bold text-white mt-1">
                        AI Screening Engine
                      </h4>
                      <p className="text-[11px] text-cyan-200/90 leading-tight bg-white/5 p-2 rounded-xl border border-white/10 mt-2">
                        "Thank you for calling. To connect to Gershy, <strong>press 1</strong>."
                      </p>
                    </div>

                    {/* Dialpad */}
                    <div className="grid grid-cols-3 gap-2 pt-2">
                      {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((k) => (
                        <button
                          key={k}
                          type="button"
                          onClick={() => handlePressKey(k)}
                          className={`h-11 rounded-full text-sm font-bold font-mono transition-all flex items-center justify-center ${
                            k === "1"
                              ? "bg-indigo-600 hover:bg-indigo-500 text-white ring-2 ring-cyan-400 animate-bounce"
                              : "bg-white/10 hover:bg-white/20 text-white"
                          }`}
                        >
                          {k}
                        </button>
                      ))}
                    </div>

                    <p className="text-[10px] text-center text-cyan-400 font-semibold">
                      👆 Click button 1 on dialpad to verify
                    </p>
                  </div>
                )}

                {/* State: VERIFIED */}
                {callState === "verified" && (
                  <div className="text-center space-y-5 my-auto animate-in fade-in zoom-in-95 duration-200">
                    <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                      <ShieldCheck className="h-8 w-8" />
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                        Human Verified ✔
                      </span>
                      <h4 className="text-base font-black text-white">
                        Forwarding to Gershy
                      </h4>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Spam bots filtered out. Call routed directly to representative with zero interruption.
                      </p>
                    </div>

                    <div className="p-2.5 rounded-xl bg-white/5 text-[11px] font-mono text-cyan-300 border border-white/10">
                      Duration: {formatTimer(timerSeconds)} • Live Call
                    </div>
                  </div>
                )}

                {/* State: ENDED */}
                {callState === "ended" && (
                  <div className="text-center my-auto space-y-2">
                    <div className="h-12 w-12 mx-auto rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center">
                      <PhoneOff className="h-6 w-6" />
                    </div>
                    <span className="text-xs font-mono text-slate-400">Call Disconnected</span>
                  </div>
                )}

                {/* Bottom Call Controls */}
                <div className="pt-2 flex items-center justify-center">
                  {callState !== "idle" && callState !== "ended" && (
                    <button
                      type="button"
                      onClick={handleEndCall}
                      className="h-12 w-12 rounded-full bg-rose-600 hover:bg-rose-500 text-white flex items-center justify-center shadow-lg shadow-rose-600/30 transition-transform active:scale-90"
                    >
                      <PhoneOff className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Telephony Architecture Benefits (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-500">
                Rule #17 & Rule #36 Telephony Standard
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight">
                Never Get Interrupted By Robocalls Or Spam Again
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Most business owners lose 45 minutes every day answering spam numbers or checking disorganized voicemails. BrightFlow’s smart screening filter forces callers to press 1 to confirm they are human before your phone ever rings.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-[#141724] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 w-fit">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Call Screening (Press 1)</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Stops automated telemarketers cold. Only legitimate clients reach you or your staff.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#141724] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 w-fit">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">100% Free Neural Voice</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Crystal-clear human-like voice greetings powered by free Edge Neural engines with zero monthly voice subscription costs.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#141724] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 w-fit">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Voicemail Transcripts</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  Voicemails are transcribed into clean text and delivered instantly to your Telegram or WhatsApp.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-[#141724] border border-slate-200/80 dark:border-white/10 shadow-xs space-y-2">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 w-fit">
                  <Zap className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Configurable Hours</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  After-hours calls route gracefully to evening greetings or voicemail, protecting your family time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
