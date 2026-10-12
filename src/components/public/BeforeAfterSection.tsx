"use client";

import * as React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Zap,
  ArrowRight,
  Clock,
  Shuffle,
  FileSpreadsheet,
  Layers,
  PhoneCall,
  Coins,
  Sparkles,
} from "lucide-react";

export function BeforeAfterSection() {
  const [activeTab, setActiveTab] = React.useState<"comparison" | "manual" | "automated">("comparison");

  const comparisons = [
    {
      category: "Client Inflow & Inquiries",
      icon: Layers,
      manual: {
        title: "Lost Messages & Delayed Replies",
        description: "Inquiries arrive scattered across emails, WhatsApp, and scraps of paper. By the time someone replies 2 days later, the client has already hired a competitor.",
        pain: "Lost revenue & chaotic inbox",
        time: "48 hours delay",
      },
      automated: {
        title: "Instant 3-Second Lead Activation",
        description: "Form inquiries are AI-parsed, tagged, and synced directly to your central CRM vault with an instant WhatsApp acknowledgment sent automatically.",
        gain: "100% lead capture & instant trust",
        time: "3 seconds total",
      },
    },
    {
      category: "Invoicing & Billing",
      icon: Coins,
      manual: {
        title: "Spreadsheet Hassle & Late Invoices",
        description: "Manually copying numbers from emails into Word/Excel, exporting PDFs, attaching to emails, and constantly forgetting to chase late payments.",
        pain: "Delayed cash flow & tedious math",
        time: "30 mins per invoice",
      },
      automated: {
        title: "1-Click Branded Invoicing & Auto Reminders",
        description: "Convert any order into an itemized tax invoice in 1 click. Digital payment links, automatic receipt archiving, and polite reminder workflows.",
        gain: "Paid 3x faster with zero manual friction",
        time: "1 click (500ms)",
      },
    },
    {
      category: "Phone Calls & Screening",
      icon: PhoneCall,
      manual: {
        title: "Constant Interruptions & Voicemail Chaos",
        description: "Personal mobile rings nonstop with spam, after-hours calls go to personal voicemail, and urgent client messages get buried.",
        pain: "Loss of focus & burnout",
        time: "Constant interruption",
      },
      automated: {
        title: "SignalWire IVR & Smart Call Screening",
        description: "Automated business greeting, call screening (caller must press 1 to connect), business-hour rules, and audio voicemail transcripts delivered to your inbox.",
        gain: "Professional image & uninterrupted focus",
        time: "Zero personal phone spam",
      },
    },
    {
      category: "Daily Task Management",
      icon: FileSpreadsheet,
      manual: {
        title: "14 Open Tabs & Outdated Statuses",
        description: "Endless WhatsApp messages asking 'Did anyone finish this project?' Nobody knows the exact status of files or payments.",
        pain: "Miscommunication & human error",
        time: "2-3 hours wasted daily",
      },
      automated: {
        title: "Single Source of Truth Command Hub",
        description: "A customized business portal with real-time status boards, Kanban pipelines, client history drawers, and zero messy spreadsheets.",
        gain: "Peace of mind & total operational clarity",
        time: "Saved 15+ hours every week",
      },
    },
  ];

  return (
    <section id="comparison" className="py-24 bg-slate-50/50 dark:bg-[#0E111D] relative border-y border-slate-200/60 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-800/40 text-blue-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
            <Shuffle className="h-3.5 w-3.5" />
            <span>The Reality Check</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Manual Chaos vs.{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 bg-clip-text text-transparent">
              BrightFlow Automation
            </span>
          </h2>

          <p className="text-base text-slate-600 dark:text-slate-300">
            Compare the friction of traditional manual busywork with the effortless speed of our automated infrastructure.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {comparisons.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.category}
                className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#141724] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Category Header */}
                <div className="px-6 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/70 dark:bg-white/[0.02] flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-cyan-400">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">Step 0{index + 1}</span>
                </div>

                {/* Split Content */}
                <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100 dark:divide-white/5 flex-1">
                  {/* Manual Column */}
                  <div className="p-6 space-y-3 bg-rose-500/[0.02] flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
                        <XCircle className="h-4 w-4" />
                        <span>The Manual Way</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                        {item.manual.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.manual.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-rose-100 dark:border-rose-950/40 flex items-center justify-between text-[11px]">
                      <span className="text-rose-700 dark:text-rose-400 font-semibold">{item.manual.pain}</span>
                      <span className="font-mono text-slate-400">{item.manual.time}</span>
                    </div>
                  </div>

                  {/* Automated Column */}
                  <div className="p-6 space-y-3 bg-emerald-500/[0.03] dark:bg-emerald-500/[0.02] flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>The BrightFlow Way</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.automated.title}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.automated.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-emerald-100 dark:border-emerald-950/40 flex items-center justify-between text-[11px]">
                      <span className="text-emerald-700 dark:text-emerald-400 font-bold">{item.automated.gain}</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{item.automated.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner callout */}
        <div className="rounded-3xl p-8 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-900 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-cyan-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="h-4 w-4" />
                <span>Zero Learning Curve</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Ready to cut 80% of repetitive operational tasks?
              </h3>
              <p className="text-sm text-slate-300 max-w-xl">
                We integrate your existing apps, phone lines, and databases into one continuous, effortless flow.
              </p>
            </div>

            <a
              href="#contact"
              className="px-6 py-3.5 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold text-sm shadow-lg shadow-cyan-400/20 transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              Automate My Workflow Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
