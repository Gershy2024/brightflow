"use client";

import * as React from "react";
import {
  Layers,
  Coins,
  PhoneCall,
  ShieldCheck,
  Zap,
  Cpu,
  ArrowRight,
  Database,
  Lock,
  Sparkles,
  BarChart3,
  Bot,
} from "lucide-react";

export function SolutionsBento() {
  return (
    <section id="solutions" className="py-24 bg-white dark:bg-[#0B0E17] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/80 dark:border-indigo-800/40 text-indigo-700 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Cpu className="h-3.5 w-3.5" />
            <span>Engineered Capabilities</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
            Custom Automation Systems{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Tailored For Your Business
            </span>
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-300">
            We don't sell rigid off-the-shelf software. We engineer custom, interconnected operational hubs built specifically around the way you work.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Core CRM (Big Card - 7 cols) */}
          <div className="md:col-span-7 rounded-3xl p-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/40 dark:from-[#141724] dark:via-[#161a29] dark:to-[#1a1f33] border border-slate-200/80 dark:border-white/10 shadow-lg relative overflow-hidden flex flex-col justify-between group">
            <div className="space-y-4 relative z-10">
              <div className="inline-flex p-3 rounded-2xl bg-indigo-600 text-white shadow-md shadow-indigo-600/30">
                <Layers className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Intelligent CRM & Client Command Hub
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                Replace 10 disconnected tools with a unified single source of truth. Manage clients, active orders, and multi-stage Kanban project pipelines with automatic milestone tracking and zero spreadsheet friction.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">360° Client Profile</span>
                  <span className="text-[11px] text-slate-500">Projects, balances & order history in one drawer</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">Visual Kanban Board</span>
                  <span className="text-[11px] text-slate-500">Drag-and-drop status flow with instant cloud save</span>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <span className="text-xs font-bold text-indigo-600 dark:text-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Explore CRM Architecture</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>

          {/* Card 2: Cash Flow & Invoicing (5 cols) */}
          <div className="md:col-span-5 rounded-3xl p-8 bg-gradient-to-br from-emerald-50/50 via-white to-teal-50/30 dark:from-[#141724] dark:via-[#161a29] dark:to-[#172528] border border-slate-200/80 dark:border-white/10 shadow-lg relative overflow-hidden flex flex-col justify-between group">
            <div className="space-y-4 relative z-10">
              <div className="inline-flex p-3 rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/30">
                <Coins className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Instant Quote-to-Cash Invoicing
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Convert completed deals into branded invoices in 1 click. Includes itemized tables, digital payment links, tax compliance, and automated reminder sequences.
              </p>

              <div className="p-3 rounded-xl bg-white/80 dark:bg-white/[0.04] border border-slate-200/60 dark:border-white/5 space-y-1">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                  <span>Average Payment Cycle</span>
                  <span className="text-emerald-600 font-mono">3x Faster</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className="w-4/5 h-full bg-emerald-500 rounded-full" />
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>See Financial Workflows</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>

          {/* Card 3: Telephony & Voice (5 cols) */}
          <div className="md:col-span-5 rounded-3xl p-8 bg-gradient-to-br from-cyan-50/50 via-white to-blue-50/30 dark:from-[#141724] dark:via-[#161a29] dark:to-[#16212b] border border-slate-200/80 dark:border-white/10 shadow-lg relative overflow-hidden flex flex-col justify-between group">
            <div className="space-y-4 relative z-10">
              <div className="inline-flex p-3 rounded-2xl bg-cyan-600 text-white shadow-md shadow-cyan-600/30">
                <PhoneCall className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                SignalWire Telephony & Screening
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Professional business IVR menus, anti-spam call screening (press 1 to connect), voicemail recordings, and free neural voice narration without recurring voice API fees.
              </p>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 text-cyan-800 dark:text-cyan-300 text-xs font-semibold">
                <Sparkles className="h-4 w-4 shrink-0 text-cyan-500" />
                <span>Zero Paid TTS Subscriptions • 100% Free Edge Voice</span>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>View Telephony Architecture</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>

          {/* Card 4: Real-time Cloud Sync & Database Security (7 cols) */}
          <div className="md:col-span-7 rounded-3xl p-8 bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-[#141724] dark:via-[#161a29] dark:to-[#1f1933] border border-slate-200/80 dark:border-white/10 shadow-lg relative overflow-hidden flex flex-col justify-between group">
            <div className="space-y-4 relative z-10">
              <div className="inline-flex p-3 rounded-2xl bg-purple-600 text-white shadow-md shadow-purple-600/30">
                <Database className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Supabase Cloud Sync & Vault Security
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                Enterprise-grade Postgres data architecture with Row Level Security, instant cloud sync, automated JSON backups, and local file scanners that automatically discover your codebase projects.
              </p>

              <div className="flex flex-wrap gap-2 pt-1">
                {["Row Level Security", "Live Webhooks", "Zero-Latency Caching", "Local Scanner", "Encrypted Backups"].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <span className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                <span>Explore Security & Cloud Specs</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
