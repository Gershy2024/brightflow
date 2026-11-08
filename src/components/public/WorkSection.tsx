"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowUpRight, Check, X, Building2, PhoneCall, Scroll, Download, ShieldCheck } from "lucide-react";

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
      title: "עמודי העולם — Amudei HaOlam",
      category: "Philanthropy & Donor Experience",
      summary:
        "A luxury donor portal and dynamic covenant generator designed for an international Torah institution.",
      problemSolved:
        "The institution previously created individual donor certificates manually on desktop graphics programs, taking hours per donor. Donors had no dedicated personal portal to review their pledges or view their assigned scholar's progress.",
      whatWeBuilt: [
        "Dynamic SVG/PDF covenant (Shtar) generator with traditional gold borders and authentic seals",
        "Private VIP donor portal with live pledge statuses and monthly receipts",
        "Scholar directory of over 100 scholars with dedication matching",
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
        "Managing multi-family units across scattered spreadsheets and messaging apps led to delayed maintenance responses, missed rent notices, and confusing monthly ledgers.",
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
      title: "Campaign Telephony & IVR Engine",
      category: "Cloud Communications System",
      summary:
        "An intelligent cloud telephony system that screens calls, routes donor inquiries, and eliminates missed connections in real time.",
      problemSolved:
        "Campaign call centers were losing high-value calls to personal representative voicemails, with zero visibility into which IVR menus callers actually navigated.",
      whatWeBuilt: [
        "SignalWire-powered call screening ('press 1 to accept') preventing voicemail traps",
        "Real-time DTMF button tracking logging the caller's navigation journey",
        "In-browser waveform audio player for call recordings and voicemails",
        "Bi-directional database sync streaming live calls to representative screens",
      ],
      techStack: ["SignalWire API", "Supabase Realtime", "Next.js", "WebAudio Waveform"],
    },
  };

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
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-20">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 text-left">
          <div className="text-xs font-mono tracking-widest uppercase text-slate-400 dark:text-slate-500">
            Selected Work
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold tracking-tight text-[#121316] dark:text-[#F3F3F5]">
            Featured projects.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 font-normal">
            Real software systems designed and built for actual organizations — focused on clarity, usability, and speed.
          </p>
        </div>

        {/* 1. Flagship Showcase: Amudei HaOlam (Actual Software Screens) */}
        <div className="space-y-6">
          <div className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-[#FAF7F0] dark:bg-[#121520] shadow-sm">
            
            {/* Real Application Window Top Bar */}
            <div className="px-5 py-3.5 bg-[#F0EBE0] dark:bg-black/30 border-b border-black/[0.06] dark:border-white/5 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                <span className="w-2.5 h-2.5 rounded-full bg-black/20 dark:bg-white/20" />
                <span className="ml-2 text-slate-600 dark:text-slate-400 hidden sm:inline">
                  amudei-haolam.com/portal
                </span>
              </div>
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Production Environment</span>
              </div>
            </div>

            {/* Real Interface: Donor Portal & Shtar Viewer */}
            <div className="p-6 sm:p-10 space-y-6 text-right font-sans select-none" dir="rtl">
              
              {/* App Internal Nav */}
              <div className="flex items-center justify-between border-b border-amber-900/10 dark:border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#C99B48] flex items-center justify-center text-slate-950 font-serif font-bold text-base shadow-xs">
                    ע
                  </div>
                  <div>
                    <span className="font-serif font-bold text-base text-amber-950 dark:text-amber-200">
                      עמודי העולם
                    </span>
                    <span className="text-[11px] block text-slate-500 font-normal">
                      סביבת תורם VIP • הוראת קבע פעילה
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded bg-amber-900/5 dark:bg-amber-400/10 text-amber-900 dark:text-amber-300 text-xs font-medium border border-amber-900/10">
                    שטר מס׳ SKV-5787
                  </span>
                </div>
              </div>

              {/* Two Screen Split: Real Shtar Certificate + Real Donor Ledger */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch text-right">
                
                {/* Screen A: The Real Shtar Parchment Certificate */}
                <div className="lg:col-span-7 rounded-xl bg-[#FFFDF9] dark:bg-[#181C28] p-6 sm:p-7 border border-[#C99B48]/30 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between border-b border-[#C99B48]/20 pb-3">
                    <span className="text-xs font-serif font-bold text-[#8C6514] dark:text-[#D4A348]">
                      שטר שותפות יששכר וזבולון • נוסח מהודר
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-bold">
                      מאושר וחתום
                    </span>
                  </div>

                  <div className="space-y-3 py-2">
                    <h4 className="font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                      הסכם שותפות קבע בהחזקת תלמיד חכם
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                      הרינו מאשרים כי נחתם הסכם יששכר וזבולון כדת וכהלכה, והתורם נוטל על עצמו החזקת אברך בכולל עיון, וזכות לימוד התורה עומדת לו ולזרעו.
                    </p>
                  </div>

                  {/* Signatures & Seal Bar */}
                  <div className="pt-3 border-t border-[#C99B48]/20 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 relative shrink-0">
                        <Image
                          src="/projects/amudei/engraved-gold-seal.svg"
                          alt="Seal"
                          width={24}
                          height={24}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-[11px] font-serif font-semibold text-amber-900 dark:text-amber-200">
                        חתימת הנהלת הכולל מאושרת
                      </span>
                    </div>

                    <span className="text-[10px] font-mono text-slate-400">
                      אימות SHA-256
                    </span>
                  </div>
                </div>

                {/* Screen B: Donor Portal Action Ledger */}
                <div className="lg:col-span-5 rounded-xl bg-white dark:bg-[#181C28] p-5 sm:p-6 border border-black/[0.06] dark:border-white/5 shadow-xs flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block">
                      פרטי השותפות במערכת
                    </span>

                    <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#121520] border border-black/[0.04] dark:border-white/5 space-y-1">
                      <span className="text-[10px] text-slate-400 block">מסכת נלמדת בכולל</span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">בבא בתרא • כולל עיון מעמיק</span>
                    </div>

                    <div className="p-3 rounded-lg bg-[#FAF8F5] dark:bg-[#121520] border border-black/[0.04] dark:border-white/5 space-y-1">
                      <span className="text-[10px] text-slate-400 block">מחזור תרומה חודשי</span>
                      <span className="text-xs font-bold text-emerald-600">$360.00 / חודש — אוטומטי</span>
                    </div>
                  </div>

                  {/* Action Button inside system */}
                  <div className="pt-2">
                    <div className="w-full py-2.5 px-3 rounded-lg bg-[#FAF8F5] dark:bg-[#121520] border border-amber-900/20 text-[#8C6514] dark:text-[#D4A348] text-xs font-medium flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Download className="h-3.5 w-3.5" />
                        <span>הורדת שטר חתום דיגיטלית (PDF)</span>
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">1.8 MB</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Under-Image Metadata: Spacious, properly separated, no awkward breaks */}
          <div className="pt-2 text-left space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-black/[0.06] dark:border-white/5">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#121316] dark:text-[#F3F3F5]">
                  עמודי העולם — Amudei HaOlam
                </h3>
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-0.5 block">
                  Philanthropy & Donor Portal Platform
                </span>
              </div>

              <button
                type="button"
                onClick={() => setActiveProject(projects.amudei)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-xs font-medium text-[#121316] dark:text-white transition-colors cursor-pointer self-start sm:self-auto"
              >
                <span>Explore Project Details</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-[#1D4ED8]" />
              </button>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed max-w-3xl">
              A bespoke digital donor platform that generates illuminated Hebrew covenant certificates (Shtarot), provides private VIP donor accounts, and tracks recurring pledges in real time.
            </p>
          </div>
        </div>

        {/* 2. Secondary Showcases: MB Management & Telephony Engine */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-14 pt-4">
          
          {/* Project 2: MB Management */}
          <div className="space-y-5 text-left">
            <div className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-[#F5F7FA] dark:bg-[#131622] shadow-sm">
              
              {/* App Bar */}
              <div className="px-4 py-3 bg-[#EAEFF5] dark:bg-black/30 border-b border-black/[0.05] dark:border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  MB Management Console
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">
                  Live Operations
                </span>
              </div>

              {/* Real Dashboard Screen View */}
              <div className="p-6 sm:p-7 space-y-4 select-none">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-white dark:bg-[#1A1D2B] border border-black/[0.06] dark:border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Occupancy Rate</span>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">98.0%</span>
                    <span className="text-[11px] text-emerald-600 block">48 of 49 Units Active</span>
                  </div>
                  <div className="p-4 rounded-xl bg-white dark:bg-[#1A1D2B] border border-black/[0.06] dark:border-white/5 space-y-1">
                    <span className="text-[10px] text-slate-400 font-mono uppercase block">Monthly Ledger</span>
                    <span className="text-2xl font-bold text-slate-900 dark:text-white">$94,200</span>
                    <span className="text-[11px] text-slate-500 block">Automated Receipts</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A1D2B] border border-black/[0.06] dark:border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <span className="font-medium text-slate-800 dark:text-slate-200">Unit 4B — Annual Renewal</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px]">PDF Dispatched</span>
                </div>
              </div>

            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-black/[0.06] dark:border-white/5">
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#121316] dark:text-[#F3F3F5]">
                    MB Management
                  </h4>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mt-0.5">
                    Real Estate Operations Platform
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProject(projects.mb)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#1D4ED8] hover:underline cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                A centralized operations system replacing scattered spreadsheets with automated tenant rent tracking and maintenance ticket dispatch.
              </p>
            </div>
          </div>

          {/* Project 3: Telephony & IVR */}
          <div className="space-y-5 text-left">
            <div className="rounded-2xl overflow-hidden border border-black/[0.08] dark:border-white/[0.08] bg-[#F5F8F6] dark:bg-[#12181F] shadow-sm">
              
              {/* App Bar */}
              <div className="px-4 py-3 bg-[#EAF2ED] dark:bg-black/30 border-b border-black/[0.05] dark:border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  SignalWire Telephony Router
                </span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Trunk Connected
                </span>
              </div>

              {/* Real Telephony Routing Screen View */}
              <div className="p-6 sm:p-7 space-y-4 select-none">
                <div className="p-4 rounded-xl bg-white dark:bg-[#1A1D2B] border border-black/[0.06] dark:border-white/5 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-slate-900 dark:text-white">+1 (845) 555-0192</span>
                    <span className="text-slate-400">Duration: 04:12</span>
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 font-normal">
                    IVR Journey: Main Menu ➔ Pressed 1 ➔ Screened & Forwarded to Rep 104
                  </div>
                  <div className="pt-2 flex items-center gap-1.5 h-5">
                    {[40, 65, 30, 85, 95, 45, 60, 80, 50, 70, 90, 40, 65, 80, 55, 35, 75, 45].map((h, i) => (
                      <div
                        key={i}
                        style={{ height: `${h}%` }}
                        className="w-1.5 bg-[#1D4ED8]/70 rounded-full"
                      />
                    ))}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white dark:bg-[#1A1D2B] border border-black/[0.06] dark:border-white/5 flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-300">Call Screening: "Press 1 to Connect"</span>
                  <span className="text-emerald-600 font-medium font-mono text-[11px]">Voicemail Blocked</span>
                </div>
              </div>

            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between pb-1.5 border-b border-black/[0.06] dark:border-white/5">
                <div>
                  <h4 className="font-serif text-xl font-bold text-[#121316] dark:text-[#F3F3F5]">
                    Campaign Telephony & IVR
                  </h4>
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mt-0.5">
                    Cloud Communications System
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveProject(projects.telephony)}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#1D4ED8] hover:underline cursor-pointer"
                >
                  <span>Explore</span>
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </button>
              </div>

              <p className="text-sm text-slate-600 dark:text-slate-400 font-normal leading-relaxed">
                An intelligent cloud telephony system that screens calls, routes donor inquiries, and eliminates missed connections in real time.
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
