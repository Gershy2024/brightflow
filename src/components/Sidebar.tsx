"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Users,
  FolderKanban,
  ShoppingBag,
  Receipt,
  MessageSquareText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Plus,
  ShieldCheck,
  ExternalLink,
  Sun,
  Moon,
  Globe,
  LogOut,
} from "lucide-react";
import { PortalTab, Language } from "@/lib/types";
import { translations } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeTab: PortalTab;
  onSelectTab: (tab: PortalTab) => void;
  lang: Language;
  onToggleLang: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  counts: {
    clients: number;
    projects: number;
    orders: number;
    unpaidInvoices: number;
    inquiries: number;
  };
  onQuickAction: (action: "project" | "client" | "order" | "invoice") => void;
  onLogout?: () => void;
}

export function Sidebar({
  activeTab,
  onSelectTab,
  lang,
  onToggleLang,
  darkMode,
  onToggleDarkMode,
  counts,
  onQuickAction,
  onLogout,
}: SidebarProps) {
  const [collapsed, setCollapsed] = React.useState(false);
  const t = translations[lang];
  const isHe = lang === "he";

  const navItems: Array<{
    id: PortalTab;
    label: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    badge?: number;
    badgeColor?: string;
  }> = [
    {
      id: "dashboard",
      label: t.portal?.tabDashboard || "לוח בקרה",
      icon: LayoutDashboard,
    },
    {
      id: "clients",
      label: t.portal?.tabClients || "לקוחות (CRM)",
      icon: Users,
      badge: counts.clients,
      badgeColor: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      id: "projects",
      label: t.portal?.tabProjects || "פרויקטים ומערכות",
      icon: FolderKanban,
      badge: counts.projects,
      badgeColor: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    },
    {
      id: "orders",
      label: t.portal?.tabOrders || "הזמנות ועסקאות",
      icon: ShoppingBag,
      badge: counts.orders,
      badgeColor: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
    },
    {
      id: "finances",
      label: t.portal?.tabFinances || "כספים וחשבוניות",
      icon: Receipt,
      badge: counts.unpaidInvoices > 0 ? counts.unpaidInvoices : undefined,
      badgeColor: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      id: "inquiries",
      label: t.portal?.tabInquiries || "פניות שירות",
      icon: MessageSquareText,
      badge: counts.inquiries > 0 ? counts.inquiries : undefined,
      badgeColor: "bg-rose-500 text-white animate-pulse",
    },
    {
      id: "settings",
      label: t.portal?.tabSettings || "הגדרות וגיבויים",
      icon: Settings,
    },
  ];

  return (
    <aside
      className={cn(
        "h-screen sticky top-0 z-40 flex flex-col justify-between transition-all duration-300 ease-in-out border-e shrink-0 select-none",
        "bg-white dark:bg-[#13151f] border-slate-200/80 dark:border-white/10 shadow-[4px_0_24px_rgba(0,0,0,0.02)]",
        collapsed ? "w-20" : "w-64 xl:w-72"
      )}
    >
      {/* Top Header & Branding */}
      <div className="flex flex-col">
        <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-white/5 min-h-[72px]">
          <div
            className={cn(
              "flex items-center gap-3 overflow-hidden cursor-pointer transition-opacity hover:opacity-90",
              collapsed && "justify-center w-full"
            )}
            onClick={() => onSelectTab("dashboard")}
          >
            <div className="relative flex items-center justify-center h-10 w-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black shadow-md shadow-blue-500/20 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/brightflow-logo.png"
                alt="BrightFlow"
                className="h-6 w-auto object-contain brightness-0 invert"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
              <span className="text-base font-extrabold tracking-tight">BF</span>
            </div>

            {!collapsed && (
              <div className="flex flex-col leading-tight min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white truncate">
                    BrightFlow
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shrink-0">
                    CRM
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 dark:text-slate-400 font-medium truncate">
                  {isHe ? "פורטל עסקי וניהול לקוחות" : "Business & Client Hub"}
                </span>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isHe ? "כווץ תפריט" : "Collapse"}
            >
              {isHe ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        {/* Quick Add Button / Dock */}
        <div className="p-3">
          {!collapsed ? (
            <div className="relative group">
              <button
                type="button"
                onClick={() => onQuickAction("client")}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all hover:scale-[1.01] active:scale-[0.98]"
              >
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" strokeWidth={2.5} />
                  <span>{isHe ? "+ לקוח / פעולה חדשה" : "+ New Client / Action"}</span>
                </div>
                <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded-md font-mono">
                  Quick
                </span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onQuickAction("client")}
              className="w-12 h-12 mx-auto flex items-center justify-center rounded-2xl bg-blue-600 text-white shadow-md shadow-blue-500/25 hover:bg-blue-700 transition-all"
              title={isHe ? "פעולה חדשה" : "New Action"}
            >
              <Plus className="h-5 w-5" strokeWidth={2.5} />
            </button>
          )}
        </div>

        {/* Navigation Items List */}
        <nav className="px-3 py-1 space-y-1.5 overflow-y-auto max-h-[calc(100vh-270px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all relative group",
                  isActive
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                    : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white",
                  collapsed && "justify-center px-0 h-11 w-11 mx-auto"
                )}
                title={collapsed ? item.label : undefined}
              >
                <Icon
                  className={cn(
                    "h-4 w-4 shrink-0 transition-transform group-hover:scale-110",
                    isActive ? "text-white" : "text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                  )}
                  strokeWidth={2}
                />

                {!collapsed && (
                  <span className="truncate flex-1 text-start">{item.label}</span>
                )}

                {!collapsed && item.badge !== undefined && item.badge > 0 && (
                  <span
                    className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full font-mono shrink-0",
                      isActive
                        ? "bg-white/25 text-white"
                        : item.badgeColor || "bg-slate-200 text-slate-700"
                    )}
                  >
                    {item.badge}
                  </span>
                )}

                {collapsed && item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute top-1 end-1 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-[#13151f]" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer & Account Controls */}
      <div className="p-3 border-t border-slate-100 dark:border-white/5 space-y-2">
        {/* Uncollapse button if collapsed */}
        {collapsed && (
          <button
            type="button"
            onClick={() => setCollapsed(false)}
            className="w-11 h-11 mx-auto flex items-center justify-center rounded-2xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title={isHe ? "הרחב תפריט" : "Expand"}
          >
            {isHe ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        )}

        {/* User Card */}
        <div
          className={cn(
            "flex items-center gap-2.5 p-2 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-white/5",
            collapsed && "justify-center p-1.5"
          )}
        >
          <div className="relative shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-amber-600 text-white font-extrabold text-xs shadow-xs">
              ג
            </div>
            <span className="absolute -bottom-0.5 -end-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#13151f]" />
          </div>

          {!collapsed && (
            <div className="flex flex-col min-w-0 flex-1 leading-tight text-start">
              <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                גרשי
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-400 truncate">
                מנהל פורטל • Online
              </span>
            </div>
          )}

          {!collapsed && onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="p-1 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
              title={isHe ? "התנתק" : "Sign Out"}
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* System toggles */}
        {!collapsed && (
          <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-slate-400">
            <button
              type="button"
              onClick={onToggleLang}
              className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              <Globe className="h-3.5 w-3.5" />
              <span>{lang === "he" ? "English" : "עברית"}</span>
            </button>

            <button
              type="button"
              onClick={onToggleDarkMode}
              className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
            >
              {darkMode ? <Sun className="h-3.5 w-3.5 text-amber-400" /> : <Moon className="h-3.5 w-3.5" />}
              <span>{darkMode ? "Light" : "Dark"}</span>
            </button>
          </div>
        )}

        {/* Rule #12: Subtle Brand Signature & Footer */}
        <div className="pt-1 text-center">
          <a
            href="https://brightflow-pi.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[10px] text-slate-400/60 hover:text-slate-500 dark:text-slate-500/60 dark:hover:text-slate-400 transition-colors group"
          >
            <ShieldCheck className="h-3 w-3 text-blue-500/60 group-hover:text-blue-500 transition-colors" />
            {!collapsed && <span>Powered by BrightFlow</span>}
          </a>
        </div>
      </div>
    </aside>
  );
}
