"use client";

import * as React from "react";
import { ArrowUpRight, Check, X, Building2, PhoneCall } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  oneLiner: string;
  whatWeBuilt: string[];
  techStack: string[];
  visualMockup: React.ReactNode;
}

export function WorkSection() {
  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(null);

  const projects: ProjectItem[] = [
    {
      id: "amudei-haolam",
      title: "Amudei HaOlam (עמודי העולם)",
      category: "Philanthropy & Non-Profit",
      oneLiner:
        "A luxury donor portal and automated Hebrew covenant generator for an international Torah institution.",
      whatWeBuilt: [
        "Dynamic SVG/PDF covenant (Shtar) generator with gold-embossed borders",
        "Private VIP donor portal with live pledge statuses and payment history",
        "Interactive directory of over 100 scholars with dedication matching",
        "Ultra-fast edge performance with bank-grade database security",
      ],
      techStack: ["Next.js 15", "Supabase Postgres", "Tailwind CSS", "PDF Engine", "Hebrew RTL"],
      visualMockup: (
        <div className="w-full bg-[#FAF7F0] dark:bg-[#131622] text-right font-sans select-none overflow-hidden">
          {/* Mockup Top Header */}
          <div className="px-6 py-4 border-b border-amber-900/10 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs text-slate-500 font-mono">amudei-haolam.com/portal</span>
            </div>
            <div className="font-serif font-bold text-base text-amber-900 dark:text-amber-200">
              עמודי העולם • סביבת תומכים
            </div>
          </div>

          {/* Large Visual Body */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 rounded-xl bg-gradient-to-br from-[#FFFDF9] to-[#F5ECE0] dark:from-[#1A1D2B] dark:to-[#22273A] p-6 border border-amber-300/40 dark:border-white/5 shadow-xs space-y-3">
                <span className="text-xs font-serif font-bold text-amber-800 dark:text-amber-300">
                  הסכם שותפות יששכר וזבולון
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                  שטר שותפות קבע מהודר — מאושר וחתום
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
                  הרינו מאשרים כי התורם הנכבד נטל על עצמו החזקת תלמיד חכם במלואו, וזכות לימוד התורה עומדת לו ולזרעו לדורות עולם.
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
                  <span>תאריך פירעון: א׳ בכסלו</span>
                  <span className="text-emerald-600 font-medium">תרומה חודשית פעילה</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="rounded-xl bg-white dark:bg-[#1A1D2B] p-4 border border-amber-900/10 dark:border-white/5 shadow-xs">
                  <div className="text-xs text-slate-400 font-normal">חלק לימוד מוקצה</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5">סדר בבא בתרא • כולל עיון</div>
                  <div className="text-xs text-amber-800 dark:text-amber-300 mt-1">אברך מוקצה מתוך המאגר</div>
                </div>
                <div className="rounded-xl bg-white dark:bg-[#1A1D2B] p-4 border border-amber-900/10 dark:border-white/5 shadow-xs">
                  <div className="text-xs text-slate-400 font-normal">סטטוס מסמך</div>
                  <div className="text-sm font-bold text-emerald-600 mt-0.5">תעודת PDF זמינה</div>
                  <div className="text-xs text-slate-500 mt-1 font-mono">Hash: #VF-9042</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "mb-management",
      title: "MB Management",
      category: "Real Estate Operations",
      oneLiner:
        "An all-in-one property operations platform replacing scattered spreadsheets with automated rent tracking and maintenance dispatch.",
      whatWeBuilt: [
        "Property & multi-unit occupancy directory with dynamic vacancy tracking",
        "Tenant ledger with 1-click branded rent receipts and automated PDF invoicing",
        "Maintenance dispatch board with priority badges and contractor assignment",
        "Role-based staff permissions with offline-first database synchronization",
      ],
      techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Hybrid Cloud Storage"],
      visualMockup: (
        <div className="w-full bg-slate-50 dark:bg-[#131622] text-left font-sans select-none overflow-hidden">
          {/* Mockup Top Header */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-blue-600" />
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                MB Management Dashboard
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span>Units: 48 / 49</span>
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-medium">
                98% Occupied
              </span>
            </div>
          </div>

          {/* Large Visual Body */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="rounded-xl bg-white dark:bg-[#1A1D2B] p-5 border border-slate-200/80 dark:border-white/5 shadow-xs">
                <span className="text-xs text-slate-400 font-normal">Monthly Rent Collected</span>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">$94,200</div>
                <div className="text-xs text-emerald-600 font-medium mt-1">96% on schedule</div>
              </div>
              <div className="rounded-xl bg-white dark:bg-[#1A1D2B] p-5 border border-slate-200/80 dark:border-white/5 shadow-xs">
                <span className="text-xs text-slate-400 font-normal">Active Leases</span>
                <div className="text-2xl font-bold text-slate-900 dark:text-white mt-1">48 Units</div>
                <div className="text-xs text-slate-500 font-normal mt-1">1 renewal pending</div>
              </div>
              <div className="rounded-xl bg-white dark:bg-[#1A1D2B] p-5 border border-slate-200/80 dark:border-white/5 shadow-xs">
                <span className="text-xs text-slate-400 font-normal">Maintenance Board</span>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">2 Open</div>
                <div className="text-xs text-slate-500 font-normal mt-1">Avg fix time: 3.2 hrs</div>
              </div>
            </div>

            <div className="rounded-xl bg-white dark:bg-[#1A1D2B] p-4 border border-slate-200/80 dark:border-white/5 shadow-xs flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <span>Unit 4B — Annual Lease Renewed ($2,450/mo)</span>
              </div>
              <span className="text-slate-400">Automated Receipt Sent</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "shekel-hakodesh",
      title: "Shekel HaKodesh Telephony Engine",
      category: "Telephony & Campaigns",
      oneLiner:
        "A cloud IVR and representative call screening system that eliminates missed donor connections in real time.",
      whatWeBuilt: [
        "SignalWire-powered call screening ('press 1 to accept') preventing voicemail traps",
        "DTMF keypress tracking logging the exact journey and buttons callers pressed",
        "In-browser audio waveform player for call recordings with variable speed",
        "Real-time Supabase sync streaming live calls to representative dashboards",
      ],
      techStack: ["SignalWire API", "Supabase Realtime", "Next.js", "WebAudio Waveform", "TypeScript"],
      visualMockup: (
        <div className="w-full bg-slate-50 dark:bg-[#131622] text-left font-sans select-none overflow-hidden">
          {/* Mockup Top Header */}
          <div className="px-6 py-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PhoneCall className="h-4 w-4 text-emerald-600" />
              <span className="font-bold text-sm text-slate-900 dark:text-white">
                Live Rep Telephony Console
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-emerald-600 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>SignalWire Trunk Active</span>
            </div>
          </div>

          {/* Large Visual Body */}
          <div className="p-6 sm:p-10 space-y-6">
            <div className="rounded-xl bg-white dark:bg-[#1A1D2B] p-5 border border-slate-200/80 dark:border-white/5 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono text-slate-900 dark:text-white font-bold">+1 (845) 555-0192</span>
                <span className="text-slate-400">Duration: 04:12</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 font-normal">
                Caller Route: Main IVR ➔ Pressed 1 (Donations) ➔ Screened & Forwarded to Rep 104
              </div>
              <div className="pt-2 flex items-center gap-1.5 h-6">
                {[40, 65, 30, 85, 95, 45, 60, 80, 50, 70, 90, 40, 65, 80, 55, 35, 75, 45].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className="w-1.5 bg-blue-500/70 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="work" className="py-24 bg-[#FAFAFA] dark:bg-[#0B0E14] border-b border-slate-200/60 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-2">
          <div className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
            Selected Work
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Websites & platforms we built.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400 font-normal">
            A small selection of bespoke web applications and platforms designed for real organizations.
          </p>
        </div>

        {/* Gallery of Large Project Showcases */}
        <div className="space-y-16">
          {projects.map((project) => (
            <div
              key={project.id}
              className="space-y-4"
            >
              {/* 1. Large Screenshot / Interface Canvas (~70% visual presence) */}
              <div className="rounded-2xl border border-slate-200/90 dark:border-white/10 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden bg-white dark:bg-[#121520]">
                {project.visualMockup}
              </div>

              {/* 2. Clean, un-crowded info row underneath */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1 px-1">
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      {project.title}
                    </h3>
                    <span className="text-slate-300 dark:text-slate-700">•</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-normal max-w-2xl">
                    {project.oneLiner}
                  </p>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-900 dark:text-white text-xs font-medium transition-colors"
                  >
                    <span>Explore Project</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Clean Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                {selectedProject.category}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {selectedProject.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-normal mt-1 leading-relaxed">
                {selectedProject.oneLiner}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                What we built:
              </h4>
              <ul className="space-y-2">
                {selectedProject.whatWeBuilt.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-normal">
                    <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Technologies:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
