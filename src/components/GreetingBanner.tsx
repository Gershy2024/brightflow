"use client";

import * as React from "react";
import { Sparkles, Plus, FolderSearch, Activity } from "lucide-react";
import { Button } from "./ui/button";
import { Language, Project } from "@/lib/types";

interface GreetingBannerProps {
  projects: Project[];
  onNewProject: () => void;
  onOpenScanner: () => void;
  lang: Language;
}

export function GreetingBanner({
  projects,
  onNewProject,
  onOpenScanner,
  lang,
}: GreetingBannerProps) {
  const isHe = lang === "he";
  const liveCount = projects.filter((p) => p.status === "live").length;

  return (
    <div className="relative overflow-hidden rounded-3xl p-6 sm:p-8 border border-slate-200/60 dark:border-white/10 bg-white dark:bg-[#1a1d2e] shadow-[0_4px_25px_rgba(0,0,0,0.03)] dark:shadow-none transition-all">
      {/* Soft decorative background gradient glow */}
      <div className="absolute -top-24 end-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-purple-500/0 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Left / Start: Greeting & Context */}
        <div className="space-y-2">
          {/* Status Pulse Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>
              {isHe ? "כל השירותים והשרתים פעילים" : "All Systems Operational"}
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {isHe ? "שלום גרשי! 👋 ברוך שובך" : "Hello Gershy! 👋 Welcome Back"}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
            {isHe
              ? `ריכוז מעקב וניטור מלא אחר כל ${projects.length} הפרויקטים שלך, כולל ${liveCount} אפליקציות חיות ב-Vercel ו-Railway, מסדי נתונים וספרי טלפונים.`
              : `Centralized dashboard monitoring all your ${projects.length} applications, including ${liveCount} live deployments, databases, and contacts.`}
          </p>
        </div>

        {/* Right / End: Quick Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenScanner}
            className="h-10 px-4 rounded-2xl text-xs font-semibold gap-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-sm transition-all"
          >
            <FolderSearch className="h-4 w-4 text-blue-500" strokeWidth={2} />
            <span>{isHe ? "סרוק תיקיות במחשב" : "Scan Local Projects"}</span>
          </Button>

          <Button
            size="sm"
            onClick={onNewProject}
            className="h-10 px-4 rounded-2xl text-xs font-semibold gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] transition-all"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            <span>{isHe ? "פרויקט חדש" : "New Project"}</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
