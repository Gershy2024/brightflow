"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, Check, X, Building2, PhoneCall, Layers } from "lucide-react";

interface ProjectDetail {
  id: string;
  title: string;
  category: string;
  summary: string;
  problemSolved: string;
  whatWeBuilt: string[];
  techStack: string[];
}

export function WorkSection() {
  const [activeProject, setActiveProject] = React.useState<ProjectDetail | null>(null);

  const projects: Record<string, ProjectDetail> = {
    amudei: {
      id: "amudei",
      title: "Amudei HaOlam (עמודי העולם)",
      category: "Philanthropy & Community Platform",
      summary:
        "A luxury donor portal and automated Hebrew covenant generator for an international Torah institution.",
      problemSolved:
        "The organization previously spent hours creating personalized donor certificates manually on graphics software. Donors lacked a secure personal area to track their monthly pledges.",
      whatWeBuilt: [
        "Dynamic SVG/PDF covenant (Shtar) generator with traditional gold borders",
        "Private VIP donor portal with pledge status and payment receipts",
        "Interactive directory of over 100 scholars with dedication matching",
        "Fast global edge hosting with secure database permissions",
      ],
      techStack: ["Next.js", "Supabase Postgres", "Tailwind CSS", "PDF Engine", "Hebrew RTL"],
    },
    mb: {
      id: "mb",
      title: "MB Management",
      category: "Real Estate Operations Platform",
      summary:
        "A centralized operations platform replacing spreadsheets with automated tenant rent tracking and maintenance dispatching.",
      problemSolved:
        "Managing dozens of multi-family units across separate chat threads caused delayed maintenance responses, missed rent notices, and confusing monthly ledgers.",
      whatWeBuilt: [
        "Property and multi-unit directory with live occupancy overview",
        "Tenant payment ledger with 1-click rent receipt generation",
        "Maintenance ticket board with priority tracking and contractor assignment",
        "Staff permissions with reliable local/cloud offline sync",
      ],
      techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Hybrid Storage"],
    },
    telephony: {
      id: "telephony",
      title: "Campaign Telephony & Call Screening",
      category: "Cloud Communications System",
      summary:
        "An intelligent cloud telephony system that screens calls, routes donor inquiries, and eliminates missed connections in real time.",
      problemSolved:
        "Campaign call centers were losing critical calls to personal representative voicemails, with zero visibility into which IVR menus callers actually navigated.",
      whatWeBuilt: [
        "SignalWire-powered call screening ('press 1 to accept') preventing voicemail traps",
        "Real-time DTMF button tracking logging the caller's navigation journey",
        "In-browser waveform audio player for call recordings and voicemails",
        "Bi-directional database sync streaming live calls to representative screens",
      ],
      techStack: ["SignalWire API", "Supabase Realtime", "Next.js", "WebAudio Waveform"],
    },
  };

  // Keyboard escape to close modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="work" className="py-24 border-b border-black/[0.06] dark:border-white/[0.08]">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 text-left">
          <div className="text-xs font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500">
            Selected Work
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#121316] dark:text-[#F3F3F5]">
            Featured projects.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal">
            Real systems designed and built for actual organizations — focused on clarity, usability, and speed.
          </p>
        </div>

        {/* 1. Flagship Project (Full Width) */}
        <div className="space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-[#F7F4EE] dark:bg-[#151824] shadow-sm hover:shadow-md transition-shadow">
            
            <div className="p-8 sm:p-12 lg:p-14 relative overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
                style={{ backgroundImage: "url('/projects/amudei/pillars-hero-bg.jpg')" }}
              />

              <div className="relative z-10 flex flex-col justify-between min-h-[380px] space-y-8">
                
                {/* Brand Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 relative">
                      <Image
                        src="/projects/amudei/amudei-gold-emblem.svg"
                        alt="Amudei Gold Emblem"
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <span className="font-serif font-bold text-lg text-amber-950 dark:text-amber-200">
                        עמודי העולם
                      </span>
                      <span className="text-[11px] block font-mono text-amber-900/60 dark:text-amber-400/60">
                        Luxury Donor Experience
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-mono px-3 py-1 rounded bg-amber-950/5 dark:bg-amber-400/10 text-amber-900 dark:text-amber-300">
                    Live Platform
                  </span>
                </div>

                {/* Center Showcase Mockup */}
                <div className="rounded-xl bg-white/90 dark:bg-[#1A1D2B]/90 backdrop-blur-sm p-6 sm:p-8 border border-amber-900/10 dark:border-white/5 max-w-2xl ml-auto text-right space-y-3">
                  <span className="text-xs font-serif font-bold text-amber-800 dark:text-amber-300">
                    הסכם שותפות יששכר וזבולון
                  </span>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white">
                    מחולל שטרות דיגיטליים וסביבת תומכים אישית
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                    מערכת ייעודית המאפשרת הפקת שטרות שותפות מהודרים בהתאמה אישית, חתימות הנהלה, ומעקב תרומות שקוף בזמן אמת.
                  </p>
                </div>

                {/* Bottom details link */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-amber-900/10 dark:border-white/5">
                  <span className="font-mono text-[11px]">Next.js • Supabase • Dynamic SVG/PDF</span>
                  <button
                    type="button"
                    onClick={() => setActiveProject(projects.amudei)}
                    className="inline-flex items-center gap-1 font-medium text-[#1D4ED8] dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    <span>Explore project</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            </div>

          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 px-1">
            <div className="flex items-baseline gap-2">
              <h3 className="font-serif text-xl font-bold text-[#121316] dark:text-[#F3F3F5]">
                Amudei HaOlam (עמודי העולם)
              </h3>
              <span className="text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-normal">
                Philanthropy & Community Platform
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-normal">
              A luxury donor portal and dynamic covenant generator designed for an international Torah institution.
            </p>
          </div>
        </div>

        {/* 2. Secondary Projects (2-Column Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          
          {/* Project 2: MB Management */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-[#F5F7FA] dark:bg-[#141724] shadow-sm hover:shadow-md transition-shadow">
              <div className="p-7 sm:p-8 flex flex-col justify-between min-h-[340px] space-y-6">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                      MB
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">
                        MB Management
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">
                        Property Operations
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300">
                    Live Platform
                  </span>
                </div>

                <div className="rounded-xl bg-white dark:bg-[#1A1D2B] p-5 border border-black/[0.06] dark:border-white/5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-black/[0.05] dark:border-white/5">
                    <span className="font-medium text-slate-800 dark:text-slate-200">Portfolio Dashboard</span>
                    <span className="text-emerald-600 font-medium">48/49 Occupied</span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Monthly Collections</span>
                      <span className="text-sm font-bold text-slate-900 dark:text-white">$94,200</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">Maintenance Tickets</span>
                      <span className="text-sm font-bold text-blue-600 dark:text-blue-400">2 Resolved Today</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-black/[0.05] dark:border-white/5">
                  <span className="font-mono text-[11px]">Operations & Tenant Portal</span>
                  <button
                    type="button"
                    onClick={() => setActiveProject(projects.mb)}
                    className="inline-flex items-center gap-1 font-medium text-[#1D4ED8] dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    <span>Explore project</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            </div>

            <div className="space-y-1 px-1">
              <div className="flex items-baseline gap-2">
                <h4 className="font-serif text-lg font-bold text-[#121316] dark:text-[#F3F3F5]">
                  MB Management
                </h4>
                <span className="text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-normal">Real Estate Operations</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-normal">
                An operational web platform replacing spreadsheets with automated tenant rent tracking and maintenance dispatch.
              </p>
            </div>
          </div>

          {/* Project 3: Telephony & IVR */}
          <div className="space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-[#F5F8F6] dark:bg-[#13191F] shadow-sm hover:shadow-md transition-shadow">
              <div className="p-7 sm:p-8 flex flex-col justify-between min-h-[340px] space-y-6">
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
                      <PhoneCall className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white">
                        Telephony & IVR Engine
                      </div>
                      <div className="text-[10px] font-mono text-slate-500">
                        SignalWire Trunk Integration
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300">
                    Live System
                  </span>
                </div>

                <div className="rounded-xl bg-white dark:bg-[#1A1D2B] p-5 border border-black/[0.06] dark:border-white/5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 pb-2 border-b border-black/[0.05] dark:border-white/5">
                    <span className="font-medium text-slate-800 dark:text-slate-200">Active Representative Trunk</span>
                    <span className="text-emerald-600 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Screening Active
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 font-mono space-y-1">
                    <div>Route: Main Menu ➔ Press 1 ➔ Ext 104</div>
                    <div className="text-[11px] text-slate-400">Caller screening: verified representative connect</div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-black/[0.05] dark:border-white/5">
                  <span className="font-mono text-[11px]">SignalWire & Real-Time Sync</span>
                  <button
                    type="button"
                    onClick={() => setActiveProject(projects.telephony)}
                    className="inline-flex items-center gap-1 font-medium text-[#1D4ED8] dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    <span>Explore project</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>

              </div>
            </div>

            <div className="space-y-1 px-1">
              <div className="flex items-baseline gap-2">
                <h4 className="font-serif text-lg font-bold text-[#121316] dark:text-[#F3F3F5]">
                  Campaign Telephony & IVR
                </h4>
                <span className="text-slate-400">•</span>
                <span className="text-xs text-slate-500 font-normal">Cloud Communications</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-normal">
                An intelligent cloud telephony system that screens calls, routes donor inquiries, and eliminates missed connections.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Project Detail Modal */}
      {activeProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-2xl bg-[#FAF8F5] dark:bg-[#121520] border border-black/[0.08] dark:border-white/[0.1] shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto text-left">
            
            <button
              type="button"
              onClick={() => setActiveProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-[#1D4ED8] dark:text-blue-400">
                {activeProject.category}
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#121316] dark:text-white">
                {activeProject.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed pt-1">
                {activeProject.summary}
              </p>
            </div>

            {/* Problem Solved */}
            <div className="space-y-1.5 pt-2 border-t border-black/[0.06] dark:border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
                The Problem It Solved:
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                {activeProject.problemSolved}
              </p>
            </div>

            {/* What We Built */}
            <div className="space-y-2 pt-2 border-t border-black/[0.06] dark:border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
                What We Built:
              </h4>
              <ul className="space-y-2">
                {activeProject.whatWeBuilt.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                    <Check className="h-4 w-4 text-[#1D4ED8] dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="space-y-2 pt-2 border-t border-black/[0.06] dark:border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
                Technologies:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {activeProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 text-slate-700 dark:text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="px-5 py-2.5 rounded-lg bg-[#121316] text-[#FAF8F5] dark:bg-white dark:text-[#121316] text-xs font-medium cursor-pointer"
              >
                Close details
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
