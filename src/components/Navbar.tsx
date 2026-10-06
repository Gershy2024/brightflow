"use client";

import * as React from "react";
import {
  FolderSearch,
  Plus,
  Moon,
  Sun,
  Globe,
  Download,
  Upload,
  Layers,
  Sparkles,
  User,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";
import { Language } from "@/lib/types";
import { translations } from "@/lib/i18n";
import { BrightFlowLogoIcon } from "./BrightFlowLogo";

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onNewProject: () => void;
  onOpenScanner: () => void;
  onOpenInquiries?: () => void;
  inquiriesCount?: number;
  onExportAll: () => void;
  onImportBackup: (file: File) => void;
  onLogout?: () => void;
}

export function Navbar({
  lang,
  onToggleLang,
  darkMode,
  onToggleDarkMode,
  onNewProject,
  onOpenScanner,
  onOpenInquiries,
  inquiriesCount = 0,
  onExportAll,
  onImportBackup,
  onLogout,
}: NavbarProps) {
  const t = translations[lang];
  const isHe = lang === "he";
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportBackup(file);
      e.target.value = "";
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/70 dark:border-white/10 bg-white/90 dark:bg-[#1a1d2e]/90 backdrop-blur-md transition-colors">
      <div className="w-full max-w-[1750px] mx-auto px-6 sm:px-8 lg:px-10 h-16 flex items-center justify-between gap-4">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center p-1.5 rounded-xl bg-white dark:bg-white/95 shadow-sm border border-slate-200/80 dark:border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brightflow-logo.png"
              alt="TheBrightFlow"
              className="h-8 w-auto object-contain"
            />
          </div>
          <div className="hidden md:block">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-800/60 uppercase tracking-wider">
                Teo Pulse
              </span>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-400 truncate max-w-xs font-medium">
              {t.appSubtitle}
            </p>
          </div>
        </div>

        {/* Right side controls & user avatar */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Client Inquiries Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenInquiries}
            className="inline-flex items-center gap-1.5 text-xs h-9 px-3.5 rounded-2xl border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200 shadow-sm relative"
            title="פניות ושאלות לקוחות"
          >
            <MessageSquare className="h-4 w-4 text-indigo-600 dark:text-indigo-400" strokeWidth={2} />
            <span className="hidden lg:inline">{t.inquiries?.title || "פניות לקוחות"}</span>
            {inquiriesCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-bold px-1.5 font-mono">
                {inquiriesCount}
              </span>
            )}
          </Button>

          {/* Scan local folders button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenScanner}
            className="hidden md:inline-flex items-center gap-1.5 text-xs h-9 px-3.5 rounded-2xl border-dashed border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800 font-semibold text-slate-700 dark:text-slate-200 shadow-sm"
          >
            <FolderSearch className="h-4 w-4 text-blue-600" strokeWidth={2} />
            <span>{t.actions.scanLocal}</span>
          </Button>

          {/* New Project Button */}
          <Button
            size="sm"
            onClick={onNewProject}
            className="items-center gap-1.5 text-xs h-9 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] font-bold transition-all"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">{t.actions.newProject}</span>
            <span className="sm:hidden">{isHe ? "חדש" : "New"}</span>
          </Button>

          {/* Subtle separator */}
          <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-1" />

          {/* Language Toggle Pill */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleLang}
            className="h-9 px-3 rounded-2xl text-xs font-bold gap-1.5 hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200"
            title={lang === "he" ? "Switch to English" : "החלף לעברית"}
          >
            <Globe className="h-4 w-4 text-slate-400" strokeWidth={2} />
            <span>{lang === "he" ? "EN" : "עב"}</span>
          </Button>

          {/* Theme Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleDarkMode}
            className="h-9 w-9 rounded-2xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5"
            title={darkMode ? "מצב יום" : "מצב לילה"}
          >
            {darkMode ? (
              <Sun className="h-4 w-4 text-amber-400" strokeWidth={2} />
            ) : (
              <Moon className="h-4 w-4 text-slate-600" strokeWidth={2} />
            )}
          </Button>

          {/* Backup Export Button */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept=".json"
            className="hidden"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={onExportAll}
            className="h-9 w-9 rounded-2xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 hidden lg:flex"
            title="גיבוי וייצוא כל הנתונים (JSON)"
          >
            <Download className="h-4 w-4" strokeWidth={2} />
          </Button>

          {/* User Profile Chip & Logout */}
          <div className="flex items-center gap-2 ps-2 border-s border-slate-200 dark:border-white/10">
            <div className="relative">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold text-xs shadow-sm">
                ג
              </div>
              <span className="absolute bottom-0 end-0 h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#1a1d2e]" />
            </div>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200 hidden sm:inline">
              גרשי
            </span>

            {onLogout && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="h-8 w-8 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 ms-1 transition-colors"
                title={isHe ? "התנתק מהמערכת" : "Sign Out"}
              >
                <LogOut className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
