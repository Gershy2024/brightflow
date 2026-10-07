"use client";

import * as React from "react";
import {
  FolderSearch,
  Plus,
  Moon,
  Sun,
  Globe,
  Download,
  Search,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { Button } from "./ui/button";
import { Language } from "@/lib/types";
import { translations } from "@/lib/i18n";

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

  // Keyboard shortcut: Cmd/Ctrl + K to focus search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        const searchInput = document.getElementById("projects-search-input");
        if (searchInput) {
          searchInput.focus();
          searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportBackup(file);
      e.target.value = "";
    }
  };

  const handleFocusSearch = () => {
    const searchInput = document.getElementById("projects-search-input");
    if (searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#13151f]/95 backdrop-blur-xl transition-all shadow-[0_2px_15px_rgba(0,0,0,0.02)] dark:shadow-none">
      <div className="w-full max-w-[1750px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3 sm:gap-6">
        
        {/* 1. Start / Brand Identity */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative flex items-center justify-center p-1 rounded-xl transition-all dark:bg-white/95 dark:px-2.5 dark:py-1 dark:shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brightflow-logo.png"
              alt="BrightFlow"
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </div>

          <div className="hidden lg:flex items-center gap-2.5 ps-2 border-s border-slate-200/80 dark:border-white/10">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
              {isHe ? "מרכז שליטה" : "Control Hub"}
            </span>
            <span
              className="text-[11px] text-slate-400 dark:text-slate-400 font-medium truncate max-w-[260px]"
              dir={isHe ? "rtl" : "ltr"}
            >
              {t.appSubtitle}
            </span>
          </div>
        </div>

        {/* 2. Center: Sleek Quick-Search Pill */}
        <div className="hidden md:flex items-center flex-1 max-w-sm lg:max-w-md mx-2">
          <button
            type="button"
            onClick={handleFocusSearch}
            className="w-full flex items-center justify-between gap-2 px-3.5 py-1.5 rounded-2xl bg-slate-100/80 dark:bg-[#1a1d2e] hover:bg-slate-200/60 dark:hover:bg-slate-800/90 border border-slate-200/70 dark:border-white/10 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-all shadow-xs cursor-pointer group"
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="h-3.5 w-3.5 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors shrink-0" />
              <span className="truncate">
                {isHe ? "חיפוש מהיר בכל הפרויקטים..." : "Quick search projects..."}
              </span>
            </div>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono font-bold text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md shadow-2xs shrink-0">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* 3. End / Actions & User Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* Primary Action: New Project */}
          <Button
            size="sm"
            onClick={onNewProject}
            className="items-center gap-1.5 text-xs h-9 px-3.5 sm:px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-[0_4px_14px_rgba(37,99,235,0.25)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.35)] font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            <span className="hidden sm:inline">{t.actions.newProject}</span>
            <span className="sm:hidden">{isHe ? "חדש" : "New"}</span>
          </Button>

          {/* Client Inquiries Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenInquiries}
            className="inline-flex items-center gap-1.5 text-xs h-9 px-3 rounded-2xl border-slate-200/80 dark:border-slate-700 bg-white dark:bg-[#1a1d2e] hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-slate-700 dark:text-slate-200 shadow-xs relative hover:border-indigo-300 dark:hover:border-indigo-700 transition-all"
            title={isHe ? "פניות ושאלות לקוחות" : "Client Inquiries"}
          >
            <MessageSquare className="h-4 w-4 text-indigo-600 dark:text-indigo-400" strokeWidth={2} />
            <span className="hidden xl:inline">{isHe ? "פניות לקוחות" : "Inquiries"}</span>
            {inquiriesCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-bold px-1.5 font-mono shadow-xs animate-pulse">
                {inquiriesCount}
              </span>
            )}
          </Button>

          {/* Scan Local Folders Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenScanner}
            className="hidden lg:inline-flex items-center gap-1.5 text-xs h-9 px-3 rounded-2xl border-slate-200/80 dark:border-slate-700 bg-white dark:bg-[#1a1d2e] hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-slate-700 dark:text-slate-200 shadow-xs hover:border-blue-300 dark:hover:border-blue-700 transition-all"
            title={t.actions.scanLocal}
          >
            <FolderSearch className="h-4 w-4 text-blue-600 dark:text-blue-400" strokeWidth={2} />
            <span className="hidden xl:inline">{t.actions.scanLocal}</span>
          </Button>

          {/* Subtle Separator */}
          <div className="h-6 w-px bg-slate-200 dark:bg-white/10 mx-0.5 sm:mx-1" />

          {/* System Utilities Dock */}
          <div className="flex items-center gap-0.5 p-1 rounded-2xl bg-slate-100/80 dark:bg-[#1a1d2e] border border-slate-200/70 dark:border-white/10 shadow-xs">
            {/* Language Toggle */}
            <button
              type="button"
              onClick={onToggleLang}
              className="h-7 px-2 rounded-xl text-xs font-bold flex items-center gap-1 text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xs transition-all cursor-pointer"
              title={lang === "he" ? "Switch to English" : "החלף לעברית"}
            >
              <Globe className="h-3.5 w-3.5 text-slate-400" strokeWidth={2} />
              <span>{lang === "he" ? "EN" : "עב"}</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              type="button"
              onClick={onToggleDarkMode}
              className="h-7 w-7 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xs transition-all cursor-pointer"
              title={darkMode ? "מצב יום" : "מצב לילה"}
            >
              {darkMode ? (
                <Sun className="h-3.5 w-3.5 text-amber-400" strokeWidth={2} />
              ) : (
                <Moon className="h-3.5 w-3.5 text-slate-600" strokeWidth={2} />
              )}
            </button>

            {/* Backup Export Button */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            <button
              type="button"
              onClick={onExportAll}
              className="h-7 w-7 rounded-xl hidden sm:flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xs transition-all cursor-pointer"
              title="גיבוי וייצוא כל הנתונים (JSON)"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </div>

          {/* User Profile Card & Sign Out */}
          <div className="flex items-center gap-2 p-1 pe-2 rounded-2xl bg-slate-100/80 dark:bg-[#1a1d2e] border border-slate-200/70 dark:border-white/10 shadow-xs">
            <div className="relative">
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 text-white font-black text-xs shadow-xs">
                ג
              </div>
              <span className="absolute -bottom-0.5 -end-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#1a1d2e]" />
            </div>

            <div className="hidden sm:flex flex-col text-start leading-tight">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                גרשי
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                {isHe ? "מחובר" : "Online"}
              </span>
            </div>

            {onLogout && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onLogout}
                className="h-7 w-7 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 ms-0.5 transition-colors cursor-pointer"
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
