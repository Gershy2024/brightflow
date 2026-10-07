"use client";

import * as React from "react";
import {
  Search,
  Plus,
  FolderSearch,
  MessageSquare,
  Download,
  Menu,
  ChevronDown,
  Building,
  FolderKanban,
  ShoppingBag,
  Receipt,
  FileSpreadsheet,
} from "lucide-react";
import { Button } from "./ui/button";
import { PortalTab, Language } from "@/lib/types";
import { translations } from "@/lib/i18n";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface PortalHeaderProps {
  activeTab: PortalTab;
  lang: Language;
  onOpenMobileMenu?: () => void;
  onQuickAction: (action: "project" | "client" | "order" | "invoice") => void;
  onOpenScanner: () => void;
  onOpenInquiries: () => void;
  inquiriesCount?: number;
  onExportAll: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export function PortalHeader({
  activeTab,
  lang,
  onOpenMobileMenu,
  onQuickAction,
  onOpenScanner,
  onOpenInquiries,
  inquiriesCount = 0,
  onExportAll,
  searchQuery,
  onSearchChange,
}: PortalHeaderProps) {
  const t = translations[lang];
  const isHe = lang === "he";

  const tabTitles: Record<PortalTab, { title: string; subtitle: string }> = {
    dashboard: {
      title: isHe ? "לוח בקרה ראשי" : "Dashboard Overview",
      subtitle: isHe ? "מבט מנהלים על כל הלקוחות, הפרויקטים והתזרים" : "Executive overview of clients, projects & cash flow",
    },
    clients: {
      title: isHe ? "מאגר לקוחות וארגונים (CRM)" : "Clients & Organizations CRM",
      subtitle: isHe ? "ניהול לקוחות, אנשי קשר, עסקאות וחשבונות" : "Manage clients, contacts, deals & accounts",
    },
    projects: {
      title: isHe ? "פרויקטים ומערכות קוד" : "Projects & Codebases",
      subtitle: isHe ? "מעקב אפליקציות, אחסון, מסדי נתונים וסריקות" : "App deployments, databases, repositories & scanner",
    },
    orders: {
      title: isHe ? "הזמנות, עסקאות והצעות מחיר" : "Orders, Deals & Quotes",
      subtitle: isHe ? "צינור מכירות וביצוע עבודות מקצה לקצה" : "Sales pipeline and work fulfillment",
    },
    finances: {
      title: isHe ? "מרכז פיננסי: חשבוניות ותקבולים" : "Financial Center: Invoices & Payments",
      subtitle: isHe ? "ניהול תקבולים, מעקב חשבוניות ויתרות לגבייה" : "Cash collection ledger and invoice dispatch",
    },
    inquiries: {
      title: isHe ? "פניות ושירות לקוחות" : "Client Support & Inquiries",
      subtitle: isHe ? "מרכז הודעות, בקשות פיצ'רים ומשובי משתמשים" : "Central inquiries, feature requests & support",
    },
    settings: {
      title: isHe ? "הגדרות פורטל וגיבויים" : "Portal Settings & Backups",
      subtitle: isHe ? "פרופיל עסקי, סנכרון ענן וייצוא נתונים" : "Business profile, cloud sync & data export",
    },
  };

  const currentMeta = tabTitles[activeTab] || tabTitles.dashboard;

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200/80 dark:border-white/10 bg-white/95 dark:bg-[#13151f]/95 backdrop-blur-xl shadow-[0_2px_15px_rgba(0,0,0,0.02)] dark:shadow-none">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-3">
        {/* Left: Mobile Toggle + Breadcrumb Title */}
        <div className="flex items-center gap-3 min-w-0">
          {onOpenMobileMenu && (
            <button
              type="button"
              onClick={onOpenMobileMenu}
              className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </button>
          )}

          <div className="flex flex-col min-w-0 leading-tight">
            <h1 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white truncate">
              {currentMeta.title}
            </h1>
            <p className="text-[11px] text-slate-400 dark:text-slate-400 truncate hidden sm:block">
              {currentMeta.subtitle}
            </p>
          </div>
        </div>

        {/* Center: Global Search Pill */}
        <div className="hidden lg:flex items-center flex-1 max-w-xs xl:max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={isHe ? "חיפוש מהיר בכל המערכת..." : "Search anything..."}
              className="w-full ps-9 pe-4 py-1.5 rounded-2xl bg-slate-100/80 dark:bg-[#1a1d2e] border border-slate-200/70 dark:border-white/10 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Right: Actions Dock */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Quick Create Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="h-9 px-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white shadow-md shadow-indigo-600/25 font-bold text-xs gap-1.5 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
                <span className="hidden sm:inline">{isHe ? "חדש" : "New"}</span>
                <ChevronDown className="h-3 w-3 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 rounded-2xl p-1.5 shadow-xl">
              <DropdownMenuItem
                onClick={() => onQuickAction("client")}
                className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl cursor-pointer"
              >
                <Building className="h-4 w-4 text-sky-600" />
                <span>{isHe ? "לקוח חדש" : "New Client"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onQuickAction("project")}
                className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl cursor-pointer"
              >
                <FolderKanban className="h-4 w-4 text-indigo-600" />
                <span>{isHe ? "פרויקט חדש" : "New Project"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onQuickAction("order")}
                className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4 text-amber-600" />
                <span>{isHe ? "הזמנה / עסקה" : "New Order"}</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => onQuickAction("invoice")}
                className="flex items-center gap-2.5 px-3 py-2 text-xs rounded-xl cursor-pointer"
              >
                <Receipt className="h-4 w-4 text-emerald-600" />
                <span>{isHe ? "חשבונית מס" : "New Invoice"}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Local Scanner shortcut */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenScanner}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs h-9 px-3 rounded-2xl border-slate-200/80 dark:border-slate-700 bg-white dark:bg-[#1a1d2e] hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-slate-700 dark:text-slate-200 shadow-xs"
            title={isHe ? "סרוק תיקיות מקומיות במחשב" : "Scan Local Directories"}
          >
            <FolderSearch className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span className="hidden xl:inline">{isHe ? "סורק תיקיות" : "Scanner"}</span>
          </Button>

          {/* Inquiries */}
          <Button
            variant="outline"
            size="sm"
            onClick={onOpenInquiries}
            className="inline-flex items-center gap-1.5 text-xs h-9 px-3 rounded-2xl border-slate-200/80 dark:border-slate-700 bg-white dark:bg-[#1a1d2e] hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-slate-700 dark:text-slate-200 shadow-xs relative"
            title={isHe ? "פניות לקוחות" : "Inquiries"}
          >
            <MessageSquare className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <span className="hidden xl:inline">{isHe ? "פניות" : "Inquiries"}</span>
            {inquiriesCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[10px] font-bold px-1.5 font-mono shadow-xs animate-pulse">
                {inquiriesCount}
              </span>
            )}
          </Button>

          {/* Backup Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={onExportAll}
            className="h-9 w-9 rounded-2xl border-slate-200/80 dark:border-slate-700 bg-white dark:bg-[#1a1d2e] text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 shadow-xs"
            title={isHe ? "גיבוי כל המערכת (JSON)" : "Export All (JSON)"}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
