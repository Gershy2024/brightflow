"use client";

import * as React from "react";
import {
  ExternalLink,
  Layers,
  Building2,
  PhoneCall,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Eye,
  X,
} from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  clientType: string;
  statusBadge: string;
  overview: string;
  whatWeBuilt: string[];
  techStack: string[];
  previewUrl?: string;
  visualTheme: {
    badgeBg: string;
    borderHover: string;
    accentColor: string;
  };
  mockupPreview: React.ReactNode;
}

export function WorkSection() {
  const [activeModalProject, setActiveModalProject] = React.useState<ProjectItem | null>(null);

  const projects: ProjectItem[] = [
    {
      id: "amudei-haolam",
      title: "Amudei HaOlam (עמודי העולם)",
      subtitle: "Luxury Philanthropy & Kollel Shtar Donor Portal",
      clientType: "Philanthropy & Non-Profit Organization",
      statusBadge: "Live Production Platform",
      overview:
        "A bespoke, high-end donor experience designed for an esteemed Kollel network. Replaced manual paperwork with a luxury portal featuring dynamic Hebrew covenant (Shtar) generation, real-time pledge tracking, and direct donor-scholar connections.",
      whatWeBuilt: [
        "Dynamic SVG/PDF Certificate rendering engine with custom calligraphy borders",
        "Private VIP donor portal with verified donation receipts and real-time statuses",
        "Directory of over 100 scholars (Avreichim) with direct study dedication matching",
        "Bank-grade Row Level Security (RLS) on Postgres database",
      ],
      techStack: ["Next.js 15", "Supabase", "Tailwind CSS", "PDF Generation", "Hebrew RTL Engine"],
      previewUrl: "https://amudei-haolam.vercel.app",
      visualTheme: {
        badgeBg: "bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200/80 dark:border-amber-900/50",
        borderHover: "hover:border-amber-300 dark:hover:border-amber-800/60",
        accentColor: "text-amber-700 dark:text-amber-400",
      },
      mockupPreview: (
        <div className="rounded-xl bg-[#FAF7F0] dark:bg-[#141620] p-4 sm:p-5 border border-amber-900/15 dark:border-white/5 space-y-3.5 select-none font-sans">
          <div className="flex items-center justify-between border-b border-amber-900/10 dark:border-white/5 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-serif font-bold text-amber-900 dark:text-amber-200">
                עמודי העולם • סביבת תורם
              </span>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-semibold">
              שטר מס׳ 1042
            </span>
          </div>

          <div className="rounded-lg bg-white dark:bg-[#1C2030] p-3.5 border border-amber-300/40 dark:border-white/5 space-y-2">
            <div className="text-[11px] font-serif text-slate-800 dark:text-slate-100 font-bold">
              הסכם שותפות יששכר וזבולון — חתום ע״י הנהלת הכולל
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              הרינו מאשרים כי התורם הנכבד נטל על עצמו החזקת תלמיד חכם במלואו, וזכות לימוד התורה עומדת לו ולזרעו.
            </p>
            <div className="pt-1 flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-300 font-medium">
              <span>תאריך פירעון: א׳ בכסלו</span>
              <span className="text-emerald-600 font-semibold">תרומה חודשית פעילה</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "mb-management",
      title: "MB Management",
      subtitle: "Commercial & Residential Property Operations Platform",
      clientType: "Real Estate & Asset Operations",
      statusBadge: "Live Production Platform",
      overview:
        "A full-scale property management web application designed for real estate operators. Centralizes multi-unit leasing, tenant communication, automated rent collection, and instant maintenance ticket dispatching in a unified command center.",
      whatWeBuilt: [
        "Comprehensive property & multi-unit occupancy directory with dynamic vacancy stats",
        "Tenant payment ledger with 1-click branded PDF invoice and rent receipt generation",
        "Maintenance dispatch board with priority badges, assignment tracking, and photo attachments",
        "Role-based access control (Admin, Property Manager, Maintenance Staff, Tenant)",
      ],
      techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Hybrid Cloud Storage"],
      previewUrl: "https://mb-management.vercel.app",
      visualTheme: {
        badgeBg: "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-200/80 dark:border-blue-900/50",
        borderHover: "hover:border-blue-300 dark:hover:border-blue-800/60",
        accentColor: "text-blue-600 dark:text-blue-400",
      },
      mockupPreview: (
        <div className="rounded-xl bg-slate-50 dark:bg-[#121522] p-4 sm:p-5 border border-slate-200 dark:border-white/5 space-y-3.5 select-none font-sans">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2.5">
            <div className="flex items-center gap-2">
              <Building2 className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                MB Management Dashboard
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 font-semibold">
              98.2% Occupancy
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-left">
            <div className="rounded-lg bg-white dark:bg-slate-800 p-2.5 border border-slate-200/70 dark:border-white/5">
              <span className="text-[10px] text-slate-500">Active Units</span>
              <div className="text-sm font-bold text-slate-900 dark:text-white">48 / 49</div>
            </div>
            <div className="rounded-lg bg-white dark:bg-slate-800 p-2.5 border border-slate-200/70 dark:border-white/5">
              <span className="text-[10px] text-slate-500">Open Tickets</span>
              <div className="text-sm font-bold text-blue-600 dark:text-blue-400">2 Resolved Today</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "shekel-hakodesh",
      title: "Shekel HaKodesh Telephony Command",
      subtitle: "Intelligent Cloud IVR & Representative Routing System",
      clientType: "Telephony & Campaign Operations",
      statusBadge: "Live Production Platform",
      overview:
        "A customized cloud telephony routing system built on SignalWire. Features automated representative call screening ('press 1 to accept'), real-time caller DTMF button tracking, and in-browser waveform playback.",
      whatWeBuilt: [
        "SignalWire-powered dynamic call forwarding with 1-click representative screening",
        "DTMF keypress tracker logging the exact buttons and navigation paths callers took",
        "In-browser audio waveform player for call recordings and voicemails with speed controls",
        "Bi-directional Supabase database sync updating live call logs dynamically",
      ],
      techStack: ["SignalWire API", "Supabase Realtime", "Next.js", "WebAudio Waveform", "TypeScript"],
      previewUrl: "https://shekel-hakodesh-rep.vercel.app",
      visualTheme: {
        badgeBg: "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/80 dark:border-emerald-900/50",
        borderHover: "hover:border-emerald-300 dark:hover:border-emerald-800/60",
        accentColor: "text-emerald-600 dark:text-emerald-400",
      },
      mockupPreview: (
        <div className="rounded-xl bg-slate-50 dark:bg-[#121522] p-4 sm:p-5 border border-slate-200 dark:border-white/5 space-y-3.5 select-none font-sans">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/5 pb-2.5">
            <div className="flex items-center gap-2">
              <PhoneCall className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Live Rep Dispatch • SignalWire
              </span>
            </div>
            <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active Trunk
            </span>
          </div>

          <div className="rounded-lg bg-white dark:bg-slate-800 p-3 border border-slate-200/70 dark:border-white/5 space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-semibold text-slate-800 dark:text-slate-200">+1 (845) 555-0192</span>
              <span className="text-xs text-slate-500 font-mono">03:42</span>
            </div>
            <div className="text-[10px] text-slate-500 flex items-center gap-2">
              <span>DTMF: Pressed 1 ➔ Ext 104</span>
              <span>•</span>
              <span className="text-emerald-600 font-medium">Screened & Connected</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="work" className="py-24 bg-[#FAFAFA] dark:bg-[#0B0E14] border-b border-slate-200/70 dark:border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/80 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider">
            <Layers className="h-3.5 w-3.5" />
            <span>Featured Case Studies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            Proven work. Real business impact.
          </h2>
          <p className="text-base text-slate-600 dark:text-slate-400">
            Every project is engineered custom for the exact operational needs of the organization — with zero bloat and clean, maintainable architecture.
          </p>
        </div>

        {/* 3 Large Showcase Project Cards */}
        <div className="space-y-14">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className={`rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-white/10 shadow-xs hover:shadow-xl transition-all duration-300 p-6 sm:p-8 lg:p-10 ${project.visualTheme.borderHover}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                
                {/* Left/Main Column: Project Details & Scope */}
                <div className="lg:col-span-7 space-y-5 text-left">
                  {/* Category & Status Badge */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                      {project.clientType}
                    </span>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${project.visualTheme.badgeBg}`}>
                      {project.statusBadge}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">
                      {project.subtitle}
                    </p>
                  </div>

                  {/* Overview */}
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
                    {project.overview}
                  </p>

                  {/* What We Built List */}
                  <div className="space-y-2 pt-1">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                      What Was Engineered:
                    </h4>
                    <ul className="space-y-1.5">
                      {project.whatWeBuilt.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                          <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack tags */}
                  <div className="flex flex-wrap items-center gap-2 pt-2">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2.5 py-1 rounded-md bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200/80 dark:border-white/5 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(project)}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-900 dark:text-white text-xs font-semibold transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>View Project Architecture & Details</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Visual Mockup / Interface Preview with Soft Shadow */}
                <div className="lg:col-span-5">
                  <div className="rounded-xl border border-slate-200/80 dark:border-white/10 bg-slate-100/50 dark:bg-slate-900/50 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
                    {project.mockupPreview}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Project Architecture Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-2xl rounded-2xl bg-white dark:bg-[#121520] border border-slate-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200/80">
                {activeModalProject.clientType}
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-2">
                {activeModalProject.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {activeModalProject.subtitle}
              </p>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {activeModalProject.overview}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Detailed Implementation Highlights:
              </h4>
              <ul className="space-y-2">
                {activeModalProject.whatWeBuilt.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">
                Engineered custom by BrightFlow
              </span>
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold"
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
